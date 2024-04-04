import { UserEntity } from "./user.entity";

interface PetEntityProps {
    id: number;
    name: string;
    age: number;
    breed: string;
    user: object;
}

export class PetEntity {
    constructor(
        public id: number,
        public name: string,
        public age: number,
        public breed: string,
        public user: object
    ){}

    static fromPrisma(pet: PetEntityProps): PetEntity {
        const userEntity = UserEntity.fromPrisma(pet.user);
        return new PetEntity(
            pet.id,
            pet.name,
            pet.age,
            pet.breed,
            userEntity
        );
    }
}