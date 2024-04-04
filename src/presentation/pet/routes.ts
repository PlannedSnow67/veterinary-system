import { Router } from 'express'
import { PetController, PetService, handleError,  validateSchema, PetSchema  } from '../'

export class PetRoutes{
    static get routes(): Router {
        const router = Router();

        const petService = new PetService();
        const petController = new PetController(petService, handleError);
        const petSchema = new PetSchema();
        router.get('/', [ validateSchema(petSchema.paginationSchema, 'query') ], petController.get);
        router.get('/:id', [ validateSchema(petSchema.getPet, 'params') ], petController.getById);
        router.post('/', [ validateSchema( petSchema.createPet, 'body') ], petController.post);
        router.put('/:id', [validateSchema(petSchema.createPet, 'body'), 
                                validateSchema(petSchema.getPet, 'params')], petController.update);
        router.delete('/:id', [ validateSchema(petSchema.getPet, 'params')], petController.delete);

        return router;
    }
}