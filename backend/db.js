var mongoose = require('mongoose');
makeConnection = () => {
    mongoose.connect("mongodb://localhost:27017/Test");
    mongoose.connection.once("open", () => {
        console.log("Connection With Db Made");
    }).on("error", (error) => {
        console.log("Error: ", error);
    })
}
module.exports = makeConnection
