import Joi from 'joi';
import { FatherSchema } from './base.schema';

export class VeterinarianSchema extends FatherSchema{
    private readonly name = Joi.string().required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be an empty field',
        'any.required': 'Name is a required field'
    });
    private readonly email = Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is a required field'
    });
    private readonly password = Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is a required field'
    });
    private readonly phone = Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.base': 'Phone should be a type of text',
        'string.empty': 'Phone cannot be an empty field',
        'string.pattern.base': 'Phone must be a valid phone number'
    });

    public createVeterinarian = Joi.object({
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
    });

    public getVeterinarian = Joi.object({
        id: Joi.number().integer().min(1).required().messages({
            'number.base': 'Id must be a number',
            'number.integer': 'Id must be an integer',
            'number.min': 'Id must be greater than or equal to 1',
            'any.required': 'Id is a required field'
        })
    });
}