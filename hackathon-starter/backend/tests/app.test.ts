import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app';
import { InMemoryHelloRepository } from '../src/modules/hello/hello.repository';

const app = createApp({ hello: new InMemoryHelloRepository() });

describe('API', () => {
  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /api/hello greets and counts visits', async () => {
    const res = await request(app).get('/api/hello').query({ name: 'Rohith' });
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ message: 'Hello, Rohith!', totalVisits: 1 });
  });

  it('rejects invalid input with 400', async () => {
    const res = await request(app).get('/api/hello').query({ name: 'x'.repeat(51) });
    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe('Validation failed');
  });

  it('returns 404 JSON for unknown routes', async () => {
    const res = await request(app).get('/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.message).toContain('not found');
  });
});
