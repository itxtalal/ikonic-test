import request from 'supertest';

import App from '../src/app';
import UserRoutes from '../src/routes/user.route';
import { IncomingMessage, Server, ServerResponse } from 'http';

describe('E2E Tests for User Routes', () => {
  let app: App;
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;
  let testUserToken: string;
  let testUserID: number;
  //   let testAdminToken: string;
  let testAdminID: number;
  let adminToken: string;

  beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    app = new App([new UserRoutes()]);
    server = app.listen();

    // Save Admin user Details
    const res = await request(app.app).post('/api/v1/user/login').send({
      email: 'admin@gmail.com',
      password: 'pass',
    });
    adminToken = res.body.token;
  });

  afterAll(async () => {
    // Delete the user created during the test
    await request(app.app)
      .delete(`/api/v1/user/${testUserID}`)
      .set('Authorization', `Bearer ${adminToken}`);

    // Delete the admin user created during the test
    const res = await request(app.app)
      .delete(`/api/v1/user/${testAdminID}`)
      .set('Authorization', `Bearer ${adminToken}`);

    server.close();
  });

  describe('User Actions', () => {
    it('POST /api/v1/user/register should register a new user', async () => {
      const res = await request(app.app).post('/api/v1/user/register').send({
        name: 'Test User',
        email: 'e2etest@gmail.com',
        password: '12345678',
      });
      testUserToken = res.body?.token;
      testUserID = res.body?.user?.id;
      expect(res.status).toEqual(201);
    });

    it('POST /api/v1/user/login should login an existing user', async () => {
      const res = await request(app.app).post('/api/v1/user/login').send({
        email: 'e2etest@gmail.com',
        password: '12345678',
      });
      expect(res.status).toEqual(200);
    });

    it('POST /api/v1/user/me should check if a user is logged in', async () => {
      const res = await request(app.app)
        .post('/api/v1/user/me')
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(200);
    });

    it('GET /api/v1/user Admin should get all users', async () => {
      const res = await request(app.app)
        .get('/api/v1/user')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toEqual(200);
    });

    it('GET /api/v1/user user should not get all users', async () => {
      const res = await request(app.app)
        .get('/api/v1/user')
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(403);
    });

    it('GET /api/v1/user/user get all users with the role "user"', async () => {
      const res = await request(app.app)
        .get('/api/v1/user/user')
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(200);
    });

    it('POST /api/v1/user/admin should create a new admin', async () => {
      const res = await request(app.app)
        .post('/api/v1/user/admin')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Admin',
          email: 'testadmin@gmail.com',
          password: '12345678',
        });
      //   testAdminToken = res.body?.token;
      testAdminID = res.body?.id;
      expect(res.status).toEqual(201);
    });

    it('POST /api/v1/user Admin should create a new user', async () => {
      const res = await request(app.app)
        .post('/api/v1/user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test User',
          email: 'testuser2@gmail.com',
          password: '12345678',
        });
      const testUser2ID = res.body?.user?.id;

      await request(app.app)
        .delete(`/api/v1/user/${testUser2ID}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toEqual(201);
    });

    it('GET /api/v1/user/:id should get a user by id', async () => {
      const res = await request(app.app)
        .get(`/api/v1/user/${testUserID}`)
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(200);
    });

    it('PUT /api/v1/user/:id should update a user by id', async () => {
      const res = await request(app.app)
        .put(`/api/v1/user/${testUserID}`)
        .set('Authorization', `Bearer ${testUserToken}`)
        .send({
          name: 'Test User Updated',
        });
      expect(res.status).toEqual(200);
    });

    it('PUT /api/v1/user/:id should not update another user by id', async () => {
      const res = await request(app.app)
        .put(`/api/v1/user/27`)
        .set('Authorization', `Bearer ${testUserToken}`)
        .send({
          name: 'Test User should not Update',
        });
      expect(res.status).toEqual(401);
    });

    it('DELETE /api/v1/user/:id should delete a user by id', async () => {
      const res = await request(app.app)
        .delete(`/api/v1/user/${testUserID}`)
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(200);
    });

    it('DELETE /api/v1/user/:id should not delete another user by id', async () => {
      const res = await request(app.app)
        .delete(`/api/v1/user/27`)
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(401);
    });

    it('POST /api/v1/user/logout should logout a user', async () => {
      const res = await request(app.app)
        .post('/api/v1/user/logout')
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(200);
    });
  });
});
