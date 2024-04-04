import { PetInput, Prisma } from "../../data"
import { CustomError } from '../'
import { PetEntity } from "../../domain";

export class PetService {
    constructor(){}

    getPets = async (page: number, limit: number) => {
        try {
            const [total, pets] = await Promise.all([
                await Prisma.pet.count({where:{ status: {equals: 'ACTIVE'} }}),
                await Prisma.pet.findMany({
                    where: { status: {equals: 'ACTIVE'} },
                    include: {
                        user:{include:{role:true}}
                    },
                    skip: (page - 1) * limit,
                    take: limit
                })
            ]);
            // const usersData = users.map(user =>  UserEntity.fromPrisma(user) );
            const petsData = pets.map(pet => PetEntity.fromPrisma(pet));
            return {
                page,
                limit,
                total,
                next: Math.ceil(total / limit) > page ? `/api/pets?page=${page + 1}&limit=${limit}`: null,
                previous: (page - 1 > 0 && pets.length > 0 ) ? `/api/pets?page=${page - 1}&limit=${limit}` : null,
                data: petsData
            }
        } catch (error) {
            throw CustomError.internalServer('Error getting pets');
        }
    }

    getPet = async (id: number) => {
        const pet = await Prisma.pet.findUnique({
            where: { id, status: {equals: 'ACTIVE'} },
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        });
        if (!pet) throw CustomError.notFound('Pet not found');
        try {
            // return { data: UserEntity.fromPrisma(user) };
            return PetEntity.fromPrisma(pet);
        } catch (error) {
            throw CustomError.internalServer('Error getting user');
        }
    }

    createPet = async (petInput: PetInput) => {
        const user = await Prisma.user.findUnique({where: {id: petInput.id_user}});
        if (!user) throw CustomError.notFound('User not found');
        try {
            const {name, age, breed} = petInput;
            const newPet = await Prisma.pet.create({
                data: {
                    name, age, breed,
                    user: {
                        connect: {
                            id: petInput.id_user
                        }
                    },
                },
                include: {
                    user: {
                        include: {role: true}
                    }
                }
            });
            return PetEntity.fromPrisma(newPet);
        } catch (error) {
            throw CustomError.internalServer('Error creating pet');
        }
        
    }

    updatePet = async (id: number, newData: PetInput) => {
        const pet = await this.getPet(id);
        if (!pet) throw CustomError.notFound('Pet not found');
        const user = await Prisma.user.findUnique({where: {id: newData.id_user}});
        if (!user) throw CustomError.notFound('User not found');
        try {
            const updatedPet = await Prisma.pet.update({
                where: {id},
                data: newData,
                include: {
                    user: { include: {role: true}}
                }
            });
            return PetEntity.fromPrisma(updatedPet);
        } catch (error) {
            throw CustomError.internalServer('Error updating pet');
        }
    }

    deletePet = async (id: number) => {
        const pet = await this.getPet(id);
        if (!pet) throw CustomError.notFound('Pet not found');
        try {
            const softDelete = await Prisma.pet.update({
                where: { id },
                data: { status: 'DELETED' },
                include: {
                    user: { include: {role: true}}
                }
            });
            const {user, ...rest} = PetEntity.fromPrisma(softDelete);
            return {...rest};
        } catch (error) {
            throw CustomError.internalServer('Error deleting pet');
        }
    }
}