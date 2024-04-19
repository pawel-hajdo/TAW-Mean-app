import Controller from "../interfaces/controller.interface";
import {Request, Response, NextFunction, Router} from "express";
import {parse} from "graphql/language";

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/posts`, this.getAllPosts);
        this.router.get(`${this.path}/post/:id`, this.getOnePost);
        this.router.post(`${this.path}/post`, this.addPost);
    }

    private getAllPosts = async (request: Request, response: Response, next: NextFunction)=> {
        response.status(200).json(testArr);
    }

    private getOnePost = async (request: Request, response: Response, next: NextFunction)=> {
        const { id } = request.params;
        const postId: number = parseInt(id);
        response.status(200).json(testArr[postId]);
    }

    private addPost = async (request: Request, response: Response, next: NextFunction)=> {
        const newPost = request.body;
        testArr.push(newPost);

        response.status(200);
    }
}

export default PostController;