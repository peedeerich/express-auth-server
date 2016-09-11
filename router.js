module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.send([
      'cactus',
      'cold drink',
      'book',
      'phone'
    ]);
  });
}
