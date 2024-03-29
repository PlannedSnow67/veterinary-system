import { Request, Response } from "express";
import { UserService, handleError } from "../";

export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    get = (req: Request, res: Response) => {
        this.userService.getUsers()
        .then(users => res.json(users))
        .catch();
    }

    create = (req: Request, res: Response) => {
        this.userService.createUser(req.body)
        .then(user => res.json(user))
        .catch(error => handleError(error, res));
    }


}