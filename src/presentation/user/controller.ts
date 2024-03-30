import { Request, Response } from "express";
import { UserService } from "../";

export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly handleError: Function
    ){}

    get = (req: Request, res: Response) => {
        const { page, limit } = req.query;
        this.userService.getUsers(+page!, +limit!)
            .then(users => res.json(users))
            .catch(error => this.handleError(error, res));
    }

    create = (req: Request, res: Response) => {
        this.userService.createUser(req.body)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    getUser = (req: Request, res: Response) => {
        this.userService.getUser(+req.params.id)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    update = (req: Request, res: Response) => {
        this.userService.updateUser(+req.params.id, req.body)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    delete = (req: Request, res: Response) => {
        this.userService.deleteUser(+req.params.id)
            .then((user) => res.json({ message: 'User deleted', user }))
            .catch(error => this.handleError(error, res));
    }


}