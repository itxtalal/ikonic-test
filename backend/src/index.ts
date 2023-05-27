import App from './app';
import TestRoute from './routes/test.route';
import UserRoute from './routes/user.route';
import PostRoute from './routes/post.route';

const app = new App([new TestRoute(), new UserRoute(), new PostRoute()]);

app.listen();
