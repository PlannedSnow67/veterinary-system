import { Request, Response } from 'express';
import { PetService } from '../';

export class PetController {
    constructor(
        private readonly petService: PetService,
        private readonly handleError: Function
    ){}

    get = (req: Request, res: Response) => {
        const {page, limit} = req.query;
        this.petService.getPets(+page!, +limit!)
            .then(pets => res.status(200).json(pets))
            .catch(err => this.handleError(err, res));
    }

    getById = (req: Request, res: Response) => {
        this.petService.getPet(+req.params.id)
            .then(pet => res.status(200).json(pet))
            .catch(err => this.handleError(err, res));
    }

    post = (req: Request, res: Response) => {
        this.petService.createPet(req.body)
            .then(pet => res.status(201).json(pet))
            .catch(err => this.handleError(err, res));
    }

    update = (req: Request, res: Response) => {
        this.petService.updatePet(+req.params.id, req.body)
            .then(pet => res.status(200).json(pet))
            .catch(err => this.handleError(err, res));
    }

    delete = (req: Request, res: Response) => {
        this.petService.deletePet(+req.params.id)
            .then((pet) => res.status(200).json(pet))
            .catch(err => this.handleError(err, res));
    }
}