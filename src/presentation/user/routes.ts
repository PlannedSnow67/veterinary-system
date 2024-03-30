import { Router } from 'express';
import { UserController } from './controller';
import { UserService, UserSchema, validateSchema, handleError } from '../';

export class UserRoutes {

    static get routes(): Router {

        const userService = new UserService();
        const userController = new UserController(userService, handleError);
        
        const router = Router();

        const userSchema = new UserSchema();
        router.get('/', [validateSchema(userSchema.paginationSchema, 'query')], userController.get);
        router.post('/', [validateSchema(userSchema.createUser, 'body')], userController.create);
        router.get('/:id', [validateSchema(userSchema.getUser, 'params')], userController.getUser);
        router.put('/:id', [validateSchema(userSchema.getUser, 'params'), validateSchema(userSchema.createUser, 'body')], userController.update);
        router.delete('/:id', [validateSchema(userSchema.getUser, 'params')], userController.delete);

        return router;
    }
}