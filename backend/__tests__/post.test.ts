import request from 'supertest';

import App from '../src/app';
import UserRoutes from '../src/routes/user.route';
import PostRoutes from '../src/routes/post.route';
import { IncomingMessage, Server, ServerResponse } from 'http';

describe('E2E Tests for User Routes', () => {
  let app: App;
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;
  let testUserToken: string;
  let testUserID: number;
  let adminToken: string;
  let postID: number;

  beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    app = new App([new UserRoutes(), new PostRoutes()]);
    server = app.listen();

    // Save Admin user Details
    const res = await request(app.app).post('/api/v1/user/login').send({
      email: 'admin@gmail.com',
      password: 'pass',
    });
    adminToken = res.body.token;

    // Create a new user
    const res2 = await request(app.app).post('/api/v1/user/register').send({
      name: 'Test User',
      email: 'test123ase123asd@gmail.com',
      password: '12345678',
    });
    testUserToken = res2.body?.token;
    testUserID = res2.body?.user?.id;
  });

  afterAll(async () => {
    // Delete the user created during the test
    await request(app.app)
      .delete(`/api/v1/user/${testUserID}`)
      .set('Authorization', `Bearer ${adminToken}`);

    server.close();
  });

  describe('Post Actions', () => {
    it('GET /post/allPublishedPosts should get all published posts', async () => {
      const res = await request(app.app)
        .get('/api/v1/post/allPublishedPosts')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toEqual(200);
    });

    it('GET /post/all admin should get all posts', async () => {
      const res = await request(app.app)
        .get('/api/v1/post/all')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toEqual(200);
    });

    it('GET /post/all a user should not get all posts', async () => {
      const res = await request(app.app)
        .get('/api/v1/post/all')
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(403);
    });

    it('GET /post/ should get all posts by the logged-in user', async () => {
      const res = await request(app.app)
        .get('/api/v1/post/')
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(200);
    });

    it('POST /post/ should create a new post', async () => {
      const res = await request(app.app)
        .post(`/api/v1/post/`)
        .set('Authorization', `Bearer ${testUserToken}`)
        .send({
          title: 'Test Post',
          content: 'Test Post Content',
          published: true,
          userId: testUserID,
        });

      postID = res.body?.post?.id;

      expect(res.status).toEqual(201);
    });

    it('PUT /post/:id should update a post by ID', async () => {
      const res = await request(app.app)
        .put(`/api/v1/post/${postID}`)
        .set('Authorization', `Bearer ${testUserToken}`)
        .send({
          title: 'Test Post Updated',
          content: 'Test Post Content Updated',
          published: true,
          userId: testUserID,
        });
      expect(res.status).toEqual(200);
      expect(res.body?.post).toHaveProperty('title', 'Test Post Updated');
      expect(res.body?.post).toHaveProperty(
        'content',
        'Test Post Content Updated'
      );
    });

    it('GET /post/:id should get a specific post by ID', async () => {
      const res = await request(app.app)
        .get(`/api/v1/post/${postID}`)
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(200);
    });

    it('GET /post/user/:id should get all posts by a specific user', async () => {
      const res = await request(app.app)
        .get(`/api/v1/post/user/${testUserID}`)
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(200);
    });

    it('DELETE /post/:id should delete a post by ID', async () => {
      const res = await request(app.app)
        .delete(`/api/v1/post/${postID}`)
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.status).toEqual(200);
    });
  });
});
