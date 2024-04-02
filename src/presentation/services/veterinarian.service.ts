import { CustomError } from '../'
import { Prisma, VetInput } from "../../data";
import { VeterinarianEntity } from '../../domain';
export class VeterinarianService {
    constructor(){}  

    getVeterinarians = async (page: number, limit: number) => {
        try {
            const [total, vets] = await Promise.all([
                await Prisma.veterinarian.count({where:{ status: {equals: 'ACTIVE'} }}),
                await Prisma.veterinarian.findMany({
                    where: { status: {equals: 'ACTIVE'} },
                    include: {
                        appointments: true
                    },
                    skip: (page - 1) * limit,
                    take: limit
                })
            ]);
            const vetsData = vets.map(vet =>  VeterinarianEntity.fromPrisma(vet) );
            return {
                page,
                limit,
                total,
                next: Math.ceil(total / limit) > page ? `/api/veterinarians?page=${page + 1}&limit=${limit}`: null,
                previous: (page - 1 > 0 && vets.length > 0 ) ? `/api/veterinarians?page=${page - 1}&limit=${limit}` : null,
                data: vetsData
            }
        } catch (error) {
            throw CustomError.internalServer('Error getting vets');
        }

    }

    getVeterinarian = async (id: number) => {
        const vet = await Prisma.veterinarian.findUnique({
            where: { id, status: {equals: 'ACTIVE'} },
        });
        if (!vet) throw CustomError.notFound('Veterinarian not found');
        try {
            return  VeterinarianEntity.fromPrisma(vet);
        } catch (error) {
            throw CustomError.internalServer('Error getting veterinarian');
        }
    }

    createVet = async (data: VetInput) => {
        const {name, email, password, phone} = data;
        const vet = await this.findVeterinarian(email);
        if (vet) throw CustomError.badRequest('Veterinarian already exists');
        try {
            const newVet = await Prisma.veterinarian.create({
                data: {
                    name,
                    email,
                    password,
                    phone,
                }
            });
            return VeterinarianEntity.fromPrisma(newVet);
        } catch (error) {
            throw CustomError.internalServer('Error creating veterinarian');
        }
    }

    updateVeterinarian = async (id: number, newData: VetInput) => {
        const vet = await this.getVeterinarian(id);
        if (!vet) throw CustomError.notFound('Veterinarian not found');
        const existingVet = await this.findVeterinarian(newData.email);
        if (existingVet && existingVet.id !== id) throw CustomError.badRequest('Email already in use');
        try {
            const updatedVet = await Prisma.veterinarian.update({
                where: {id},
                data: newData,
            });
            return VeterinarianEntity.fromPrisma(updatedVet);
        } catch (error) {
            throw CustomError.internalServer('Error updating veterinarian');
        }
    }

    deleteVeterinarian = async (id: number) => {
        const vet = await this.getVeterinarian(id);
        if (!vet) throw CustomError.notFound('Veterinarian not found');
        try {
            const softDelete = await Prisma.veterinarian.update({
                where: { id },
                data: { status: 'DELETED' },
            });
            return VeterinarianEntity.fromPrisma(softDelete);
        } catch (error) {
            throw CustomError.internalServer('Error deleting Veterinarian');
        }
    }

    findVeterinarian = async (email: string) => {
        return await Prisma.veterinarian.findFirst({where: {email, status: {equals: 'ACTIVE'}}});
    }
}