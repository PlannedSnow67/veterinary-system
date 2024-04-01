
interface UserEntityProps {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    address: string;
    status: string;

}


export class UserEntity {
    private id: number;
    private name: string;
    private email: string;
    private password: string;
    private role: string;
    private phone?: string;
    private address?: string;
    private status: string;
    
    constructor(props: UserEntityProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.role = props.role;
        this.phone = props.phone;
        this.address = props.address;
        this.status = props.status;
    }

    static fromPrisma(user: any): UserEntity {
        return new UserEntity({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role.name,
            phone: user.phone,
            address: user.address,
            status: user.status
        })
    }

}