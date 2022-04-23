import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import databaseSync from '../database/connections.js';
import { databaseConnect } from '../database/sequelize.js';
import { sessionHandler } from '../database/session.js';
import router from './router.js';

export default () => {
    const app = express();

    databaseConnect();
    databaseSync();
    
    // Enable react to communicate with the server
    const corsOptions = {
        origin: "**",
        optionsSuccessStatus: 200
    };

    // ----- Use -----
    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(sessionHandler);
    app.use((req, res, next) => {
        req.user = req.session?.user;
        next();
    });

    router(app);

    return app;
}