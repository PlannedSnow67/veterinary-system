import Joi from 'joi';
import { FatherSchema } from './base.schema';

export class PetSchema extends FatherSchema{
    private readonly name = Joi.string().required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be an empty field',
        'any.required': 'Name is a required field'
    });
    private readonly age = Joi.number().integer().min(0).required().messages({
        'number.base': 'Age should be a type of number',
        'number.empty': 'Age cannot be an empty field',
        'number.integer': 'Age must be an integer',
        'number.min': 'Age must be greater than or equal to 0',
        'any.required': 'Age is a required field'
    });
    private readonly breed = Joi.string().required().messages({
        'string.base': 'Breed should be a type of text',
        'string.empty': 'Breed cannot be an empty field',
        'any.required': 'Breed is a required field'
    });
    
    private readonly userId = Joi.number().integer().min(1).required().messages({
        'number.base': 'id_user must be a number',
        'number.integer': 'id_user must be an integer',
        'number.min': 'id_user must be greater than or equal to 1',
        'any.required': 'id_user a required field'
    });

    public createPet = Joi.object({
        name: this.name,
        age: this.age,
        breed: this.breed,
        id_user: this.userId
    });

    public getPet = Joi.object({
        id: Joi.number().integer().min(1).required().messages({
            'number.base': 'Id must be a number',
            'number.integer': 'Id must be an integer',
            'number.min': 'Id must be greater than or equal to 1',
            'any.required': 'Id is a required field'
        })
    });
}
