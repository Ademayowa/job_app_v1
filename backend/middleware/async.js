const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;

// module.exports = function(handler) {
//   return async (req, res, next) => {
//     try {
//       await handler(req, res);
//     } catch (err) {
//       next(err);
//     }
//   };
// };
