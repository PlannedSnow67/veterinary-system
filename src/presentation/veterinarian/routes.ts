import {Router} from 'express'
import { VeterinarianController, VeterinarianService, handleError, validateSchema, VeterinarianSchema } from '../';

export class VeterinarianRoutes {
    constructor(){}  

    static get routes(): Router {

        const veterinarianService = new VeterinarianService();
        const veterinarianController = new VeterinarianController(veterinarianService, handleError);
        const veterinarianSchema = new VeterinarianSchema();
        const router = Router();

        router.get('/', [validateSchema(veterinarianSchema.paginationSchema, 'query')], veterinarianController.get);
        router.post('/', [validateSchema(veterinarianSchema.createVeterinarian, 'body')], veterinarianController.create);
        router.get('/:id', [validateSchema(veterinarianSchema.getVeterinarian, 'params')], veterinarianController.getVeterinarian);
        router.put('/:id', [validateSchema(veterinarianSchema.getVeterinarian, 'params')], veterinarianController.update);
        router.delete('/:id', [validateSchema(veterinarianSchema.getVeterinarian, 'params')], veterinarianController.delete);
        
        return router;
    }
}

