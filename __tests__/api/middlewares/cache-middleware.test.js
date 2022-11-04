const cacheMiddleware = require('../../../api/middlewares/cache-middleware.js');

describe('cacheMiddleware tests', () => {
  test('should overwrite res.json when do not have cache', async () => {
    const cache = cacheMiddleware({ timeout: 50 });
    const req = { originalUrl: '/path/1111' };
    const json = jest.fn();
    const res = {
      json,
    };
    cache(req, res, jest.fn());
    expect(res.json).not.toEqual(json);
  });

  test('should response the cache when have cache', async () => {
    const cache = cacheMiddleware({ timeout: 50 });
    const req = { originalUrl: '/path/2222' };
    const res = {
      json: jest.fn(),
    };
    cache(req, res, jest.fn());
    res.json({});

    const next = jest.fn();
    cache(req, res, next);
    cache(req, res, next);
    cache(req, res, next);
    cache(req, res, next);
    expect(next).toHaveBeenCalledTimes(0);
  });

  test('should delete cache when cache is expried', async () => {
    const cache = cacheMiddleware({ timeout: 50 });
    const req = { originalUrl: '/path/333' };
    const res = {
      json: jest.fn(),
    };
    cache(req, res, jest.fn());
    res.json({});
    const next = jest.fn();

    cache(req, res, next);
    expect(next).toHaveBeenCalledTimes(0);

    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    cache(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
