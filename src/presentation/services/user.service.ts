import { CustomError } from '../'
import { Prisma, UserInput } from "../../data";


export class UserService {
    constructor() {}

    getUsers = async () => {
        const users = await Prisma.user.findMany({
            include: {
                role: true
            }
        });
        return { users };
    }
    
    getUser = async (id: number) => {
        return {message: 'get user'};
    }

    createUser = async (newUser: UserInput) => { 
        const {name, email, password, phone, address} = newUser;
        const user = await this.findUser(email);
        if (user) throw CustomError.badRequest('User already exists');
        try {
            const user = await Prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    phone,
                    address,
                    role: {
                        connect: {
                            id: newUser.id_role
                        }
                    }
                }
            });
            return { user };
        } catch (error) {
            throw CustomError.badRequest('Error creating user');
        }
    }
    
    updateUser = async (id: number) => {
        return {message: 'update user'};
    }

    deleteUser = async (id: number) => {
        return {message: 'delete user'};
    }

    getUserById = async (id: number) => {

        return {message: 'get user by id'};
    }

    findUser = async (email: string) => {
        return await Prisma.user.findFirst({where:{email: email}})
    }

}