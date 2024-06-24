import Controller from "../interfaces/controller.interface";
import {Request, Response, NextFunction, Router} from "express";
import {checkPostCount} from "../middlewares/checkPostCount.middleware";
import DataService from "../modules/services/data.service";
import Joi from "joi";

class PostController implements Controller {
    public path = '/api';
    public router = Router();
    private dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/posts`, this.getAllPosts);
        this.router.get(`${this.path}/post/:id`, this.getPostById);

        this.router.post(`${this.path}/post`, this.addPost);
        this.router.post(`${this.path}/post/:num`, checkPostCount, this.getXPosts);

        this.router.delete(`${this.path}/posts`, this.deleteAllPosts);
        this.router.delete(`${this.path}/post/:id`, this.deletePostById);
    }

    private getAllPosts = async (request: Request, response: Response, next: NextFunction)=> {
        try {
            const allData = await this.dataService.getAllPosts();
            response.status(200).json(allData);
        } catch (error) {
            console.error('Error occurred while retrieving all posts:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }

    private getPostById = async (request: Request, response: Response, next: NextFunction)=> {
        const { id } = request.params;

        console.log(id)

        try {
            const post = await this.dataService.getPostById(id);
            response.status(200).json(post);
        } catch (error) {
            console.error('Failed pulling posts:', error);
            response.status(500).send('Internal server error');
        }
    }


    private addPost = async (request: Request, response: Response, next: NextFunction)=> {
        const {title, text, image} = request.body;

        const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required()
        });


        try {
            const validatedData = await schema.validateAsync({title, text, image})
            const newPost = await this.dataService.createPost(validatedData);
            response.status(200).json(newPost);
        } catch (error) {
            console.log('eeee', error)

            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private deleteAllPosts = async (request: Request, response: Response, next: NextFunction)=> {
        await this.dataService.deleteData({});
        response.status(200);
    }

    private deletePostById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        try {
            await this.dataService.deleteData({ _id: id });
            response.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error('Error deleting post:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    };

    private getXPosts = async (request: Request, response: Response, next: NextFunction) => {
        const { num } = request.params;
        const numberOfPosts: number = parseInt(num);

        try {
            const allPosts = await this.dataService.query({});
            const limitedPosts = allPosts.slice(0, numberOfPosts);
            response.status(200).json(limitedPosts);
        } catch (error) {
            console.error('Wystąpił błąd podczas pobierania postów:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

export default PostController;
