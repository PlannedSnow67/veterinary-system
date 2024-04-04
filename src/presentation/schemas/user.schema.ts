import Joi from 'joi';
import { FatherSchema } from './base.schema';

export class UserSchema extends FatherSchema{
    private readonly name = Joi.string().required().messages({
        'string.base': 'name should be a type of text',
        'string.empty': 'name cannot be an empty field',
        'any.required': 'name is a required field'
    });
    private readonly email = Joi.string().email().required().messages({
        'string.base': 'email should be a type of text',
        'string.empty': 'email cannot be an empty field',
        'string.email': 'email must be a valid email',
        'any.required': 'email is a required field'
    });
    private readonly password = Joi.string().min(6).required().messages({
        'string.base': 'password should be a type of text',
        'string.empty': 'password cannot be an empty field',
        'string.min': 'password must be at least 6 characters long',
        'any.required': 'password is a required field'
    });
    private readonly phone = Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.base': 'phone should be a type of text',
        'string.empty': 'phone cannot be an empty field',
        'string.pattern.base': 'phone must be a valid phone number'
    });
    private readonly address = Joi.string().messages({
        'string.base': 'address should be a type of text',
        'string.empty': 'address cannot be an empty field',
    });
    private readonly id_role = Joi.number().integer().min(1).max(2).default(2);

    public createUser = Joi.object({
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
        id_role: this.id_role
    });

    public getUser = Joi.object({
        id: Joi.number().integer().min(1).required().messages({
            'number.base': 'Id must be a number',
            'number.integer': 'Id must be an integer',
            'number.min': 'Id must be greater than or equal to 1',
            'any.required': 'Id is a required field'
        })
    });

}