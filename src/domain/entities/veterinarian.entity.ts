
interface VeterinarianEntityProps {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    status: string;

}


export class VeterinarianEntity {
    private id: number;
    private name: string;
    private email: string;
    private password: string;
    private status: string;
    
    constructor(props: VeterinarianEntityProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.status = props.status;
    }

    static fromPrisma(user: any): VeterinarianEntity {
        return new VeterinarianEntity({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            status: user.status
        })
    }

}