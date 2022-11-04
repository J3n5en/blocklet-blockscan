const cache = new Map();

// TODO should use redis instend of memory-cache
const cacheMiddleware =
  ({ timeout }) =>
  async (req, res, next) => {
    const id = req.originalUrl;

    const _end = res.end;
    if (cache.has(id)) {
      const { body, createdAt, encoding } = cache.get(id);
      if (+new Date() - createdAt <= timeout) {
        return res.end(body, encoding);
      }
      cache.delete(id);
    }

    res.end = function (chunk, encoding) {
      if (res.statusCode === 200) {
        cache.set(id, { body: chunk, createdAt: +new Date(), encoding });
      }

      res.end = _end;
      return res.end(chunk, encoding);
    };
    return next();
  };

module.exports = cacheMiddleware;
