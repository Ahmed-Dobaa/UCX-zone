let mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ucx:ucx123456@cluster0.x2wpx.mongodb.net/test?retryWrites=true&w=majority').then(
    () => {
      console.log("Connected successfully to mongodb ");
      connectionCallback();
    },(err) => {
      console.log(err);
    }
);

let connectionCallback = () => {};
module.exports.onConnect = (callback) => {
  console.log("connnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
 connectionCallback = callback;
}
