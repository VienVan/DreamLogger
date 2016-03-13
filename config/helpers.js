// var helper = {
//         req.login = function (dreamer) {
//           req.session.userId = dreamer._id;
//         },
//         // find the current dreamer
//         req.currentUser = function (cb) {
//           Dreamer.
//             findOne({ _id: req.session.userId },
//             function (err, dreamer) {
//               req.dreamer = dreamer;
//               cb(null, dreamer);
//             })
//         },
//         // logout the current dreamer
//         req.logout = function () {
//           req.session.userId = null;
//           req.dreamer = null;
//         }
// }
//
// module.exports = helper;
