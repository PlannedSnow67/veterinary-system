import { Router } from 'express';
import {UserRoutes} from './'

export class Routes {
    
    static get routes(): Router {
        const router = Router();

        router.get('/health', (req, res) => {
            res.send('Everything is working!');
        });

        router.use('/api/users', UserRoutes.routes);

        return router;
    }
}