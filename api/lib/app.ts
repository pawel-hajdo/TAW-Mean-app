import express from 'express';
import { config } from './config'
import Controller from "./interfaces/controller.interface";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from 'mongoose'
class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToDatabase();
    }

    private initializeControllers(controllers: Controller[]):void{
        controllers.forEach((controller)=>{
            this.app.use('/', controller.router);
        })
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
    }

    private async connectToDatabase(): Promise<void>{
        try{
            await  mongoose.connect(config.databaseUrl);
            console.log(`connected to database at url ${config.databaseUrl}`);
        }catch (e) {
            console.error(`error connecting to DB`,e)
        }
        mongoose.connection.on('error',(e)=>{
            console.error(`error connecting to DB`,e);
        });

        mongoose.connection.on('disconnected',()=>{
            console.log(`Disconnected from DB`);
        })

        process.on('SIGINT',async ()=>{
            await mongoose.connection.close();
            console.log(`MongoDB connection closed by app termination`)
            process.exit(0);
        })

        process.on('SIGTERM',async ()=>{
            await mongoose.connection.close();
            console.log(`MongoDB connection closed by app termination`)
            process.exit(0);
        })

    }

    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App listening on the port ${config.port}`);
        });
    }
}
export default App;