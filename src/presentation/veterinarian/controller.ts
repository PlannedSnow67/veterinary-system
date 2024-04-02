import { Response, Request } from 'express';
import { VeterinarianService } from '../';

export class VeterinarianController {
    constructor(
        private readonly veterinarianService: VeterinarianService,
        private readonly handleError: Function
    ){}  

    get = (req: Request, res: Response) => {
        const { page, limit } = req.query;
        this.veterinarianService.getVeterinarians(+page!, +limit!)
            .then(vets => res.json(vets))
            .catch(error => this.handleError(error, res));
    }

    create = (req: Request, res: Response) => {
        this.veterinarianService.createVet(req.body)
            .then(vet => res.json(vet))
            .catch(error => this.handleError(error, res));
    }

    getVeterinarian = (req: Request, res: Response) => {
        const { id } = req.params;
        this.veterinarianService.getVeterinarian(+id)
            .then(vet => res.json(vet))
            .catch(error => this.handleError(error, res));
    }

    update = (req: Request, res: Response) => {
        const { id } = req.params;
        this.veterinarianService.updateVeterinarian(+id, req.body)
            .then(vet => res.json(vet))
            .catch(error => this.handleError(error, res));
    }

    delete = (req: Request, res: Response) => {
        const { id } = req.params;
        this.veterinarianService.deleteVeterinarian(+id)
            .then(vet => res.json(vet))
            .catch(error => this.handleError(error, res));
    }
}