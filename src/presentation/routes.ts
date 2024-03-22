import { Router } from 'express';

export class Routes {
    
    static get routes(): Router {
        const router = Router();

        router.get('/health', (req, res) => {
            res.send('Everything is working!');
        });

        return router;
    }
}