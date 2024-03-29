import { Router } from 'express';
import { UserController } from './controller';
import { UserService, UserSchema, validateSchema } from '../';

export class UserRoutes {

    static get routes(): Router {

        const userService = new UserService();
        const userController = new UserController(userService);
        
        const router = Router();

        const userSchema = new UserSchema();
        router.get('/', userController.get);
        router.post('/', [validateSchema(userSchema.createUser, 'body')], userController.create);

        return router;
    }
}