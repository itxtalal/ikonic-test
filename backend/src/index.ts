import App from './app';
import TestRoute from './routes/test.route';
import UserRoute from './routes/user.route';

const app = new App([new TestRoute(), new UserRoute()]);

app.listen();
