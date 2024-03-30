import { CustomError } from '../'
import { Prisma, UserInput } from "../../data";


export class UserService {
    constructor() {}

    getUsers = async (page: number, limit: number) => {
        try {
            const [total, users] = await Promise.all([
                await Prisma.user.count({where:{ status: {equals: 'ACTIVE'} }}),
                await Prisma.user.findMany({
                    where: { status: {equals: 'ACTIVE'} },
                    include: {
                        role: true
                    },
                    skip: (page - 1) * limit,
                    take: limit
                })
            ]);
            // TODO: return a entity instead of the user data from the database
            return {
                page,
                limit,
                total,
                next: Math.ceil(total / limit) > page ? `/api/users?page=${page + 1}&limit=${limit}`: null,
                previous: (page - 1 > 0 && users.length > 0 ) ? `/api/users?page=${page - 1}&limit=${limit}` : null,
                users
            }
        } catch (error) {
            throw CustomError.internalServer('Error getting users');
        }
        
    }
    
    getUser = async (id: number) => {
        const user = await Prisma.user.findUnique({
            where: { id, status: {equals: 'ACTIVE'} },
            include: {
                role: true
            }
        });
        if (!user) throw CustomError.notFound('User not found');
        try {
            // TODO: return a entity instead of the user data from the database
            return { user };
        } catch (error) {
            throw CustomError.internalServer('Error getting user');
        }
    }

    createUser = async (data: UserInput) => { 
        const {name, email, password, phone, address} = data;
        const user = await this.findUser(email);
        if (user) throw CustomError.badRequest('User already exists');
        try {
            const newUser = await Prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    phone,
                    address,
                    role: {
                        connect: {
                            id: data.id_role
                        }
                    }
                }
            });
            // TODO: return a entity instead of the user data from the database
            return { newUser };
        } catch (error) {
            throw CustomError.internalServer('Error creating user');
        }
    }
    
    updateUser = async (id: number, newData: UserInput) => {
        const user = await this.getUser(id);
        if (!user) throw CustomError.notFound('User not found');
        const existingUser = await this.findUser(newData.email);
        if (existingUser && existingUser.id !== id) throw CustomError.badRequest('Email already in use');
        try {
            const updatedUser = await Prisma.user.update({
                where: {id},
                data: newData
            });
            // TODO: return a entity instead of the user data from the database
            return {updatedUser};
        } catch (error) {
            throw CustomError.internalServer('Error updating user');
        }
    }

    deleteUser = async (id: number) => {
        const user = await this.getUser(id);
        if (!user) throw CustomError.notFound('User not found');
        try {
            const softDelete = await Prisma.user.update({
                where: { id },
                data: { status: 'DELETED' }
            });
            return softDelete;
        } catch (error) {
            throw CustomError.internalServer('Error deleting user');
        }
    }

    findUser = async (email: string) => {
        return await Prisma.user.findFirst({where:{email: email, status: {not: 'DELETED'}}})
    }

}