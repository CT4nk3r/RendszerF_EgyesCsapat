import generalRouter from '../routes/general.js';
import adminRouter from '../routes/admin.js';
import authenticateRouter from '../routes/authenticate.js';
import objectRouter from '../routes/object.js';

export default (app) => {
    app.use(generalRouter);
    app.use(adminRouter);
    app.use(authenticateRouter);
    app.use(objectRouter);
}