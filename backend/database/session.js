import { sequelize } from './sequelize.js';

import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';

const sequelizeStore = SequelizeStore(session.Store);

const sessionStore = new sequelizeStore({
    db: sequelize
});

const sessionHandler = session({
    cookie: { 
        maxAge: 60 * 60 * 1000 * 24 * 7,
    }, 
    secret: 'my secret',
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
});

export { sessionHandler, sessionStore };