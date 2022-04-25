import { sequelize } from './sequelize.js';

import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';

// creating one week from milliseconds
const oneWeek = 60 * 60 * 1000 * 24 * 7;

const sequelizeStore = SequelizeStore(session.Store);

const sessionStore = new sequelizeStore({
    db: sequelize
});

const sessionHandler = session({
    cookie: { 
        maxAge: oneWeek,
    }, 
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
});

export { sessionHandler, sessionStore };