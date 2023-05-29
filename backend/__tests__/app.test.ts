import request from 'supertest';

import App from '../src/app';
import TestRoutes from '../src/routes/test.route';
import { IncomingMessage, Server, ServerResponse } from 'http';

describe('Server Running Test', () => {
  let app: App;
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    app = new App([new TestRoutes()]);
    server = app.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('Is API Live', async () => {
    const res = await request(app.app).get('/');
    expect(res.text).toEqual('API running ✔️');
  });
});
