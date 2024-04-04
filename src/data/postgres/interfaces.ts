export interface UserInput {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    id_role: number;
}

export interface VetInput {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface PetInput {
    name: string;
    age: number;
    breed: string;
    id_user: number;
}