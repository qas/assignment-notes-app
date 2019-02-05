const KoaRouter = require('./KoaRouter');

class RouterFactory {
  static getRouterInstance(type) {
    if (type == 'koa') 
    	return new KoaRouter();
  }
}

module.exports = RouterFactory;