import Joi from 'joi';
export class FatherSchema {
    public paginationSchema = Joi.object({
        page: Joi.number().integer().min(1).default(1).messages({
            'number.base': 'Page must be a number',
            'number.integer': 'Page must be an integer',
            'number.min': 'Page must be greater than or equal to 1'
        }),
        limit: Joi.number().integer().min(1).default(10).messages({
            'number.base': 'Limit must be a number',
            'number.integer': 'Limit must be an integer',
            'number.min': 'Limit must be greater than or equal to 1'
        })
    });
}