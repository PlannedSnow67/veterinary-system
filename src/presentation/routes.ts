import { Router } from 'express';
import { UserRoutes, VeterinarianRoutes, PetRoutes } from './'

export class Routes {
    
    static get routes(): Router {
        const router = Router();

        router.get('/health', (req, res) => {
            res.send('Everything is working!');
        });

        router.use('/api/users', UserRoutes.routes);
        router.use('/api/veterinarians', VeterinarianRoutes.routes);
        router.use('/api/pets', PetRoutes.routes);

        return router;
    }
}