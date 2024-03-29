import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";


type RequestPart = 'body' | 'params' | 'query';

export const validateSchema = (schema : ObjectSchema, property: RequestPart) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const { error, value } = schema.validate(req[property], { abortEarly: true });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }
        req[property] = value;

        next();
    };
};