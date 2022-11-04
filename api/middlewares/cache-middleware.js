const cache = new Map();

// TODO should use redis instend of memory-cache
const cacheMiddleware =
  ({ timeout }) =>
  async (req, res, next) => {
    const id = req.originalUrl;

    const _json = res.json;
    if (cache.has(id)) {
      const { body, createdAt } = cache.get(id);
      if (+new Date() - createdAt <= timeout) {
        return res.json(body);
      }
      cache.delete(id);
    }

    res.json = (body) => {
      cache.set(id, { body, createdAt: +new Date() });
      return _json.call(res, body);
    };
    return next();
  };

module.exports = cacheMiddleware;
