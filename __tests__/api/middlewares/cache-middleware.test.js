const cacheMiddleware = require('../../../api/middlewares/cache-middleware.js');

describe('cacheMiddleware tests', () => {
  test('should overwrite res.end when do not have cache', async () => {
    const cache = cacheMiddleware({ timeout: 50 });
    const req = { originalUrl: '/path/1111' };
    const end = jest.fn();
    const res = {
      statusCode: 200,
      end,
    };
    cache(req, res, jest.fn());
    expect(res.end).not.toEqual(end);
  });

  test('should response the cache when have cache', async () => {
    const cache = cacheMiddleware({ timeout: 50 });
    const req = { originalUrl: '/path/2222' };
    const res = {
      statusCode: 200,
      end: jest.fn(),
    };
    cache(req, res, jest.fn());
    res.end({});

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
      statusCode: 200,
      end: jest.fn(),
    };
    cache(req, res, jest.fn());
    res.end({});
    const next = jest.fn();

    cache(req, res, next);
    expect(next).toHaveBeenCalledTimes(0);

    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    cache(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should cache 200 response only', () => {
    const cache = cacheMiddleware({ timeout: 50 });
    const req = { originalUrl: '/path/2222' };
    const res = {
      statusCode: 500,
      end: jest.fn(),
    };
    cache(req, res, jest.fn());
    res.end({});

    const next = jest.fn();
    cache(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
