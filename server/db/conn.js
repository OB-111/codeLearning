const mongoose = require("mongoose");
const db = mongoose.connection;
const CODE_BLOCKS_DATA = [
  {
    title: "Async",
    code: "function myFunction(){return 'Hello';}",
    sol: "async function myFunction(){return 'Hello';}",
  },
  {
    title: "Promise",
    code: "function myFunction(){return .resolve('Hello')}",
    sol: "function myFunction(){return Promise.resolve('Hello')}",
  },
  ,
  {
    title: "Class",
    code: "class Rectangle{(height, width) {this.height = height;this.width = width;}}",
    sol: "class Rectangle{constructor(height, width) {this.height = height;this.width = width;}}",
  },
  {
    title: "Arrow Function",
    code: "const materials = ['Hydrogen','Helium','Lithium','Beryllium']; console.log(materials.map(material  material.length));// Expected output: Array [8, 6, 7, 9]",
    sol: "const materials = ['Hydrogen','Helium','Lithium','Beryllium']; console.log(materials.map(material => material.length));// Expected output: Array [8, 6, 7, 9]",
  },
];
const codeBlocks = CODE_BLOCKS_DATA.filter((object) => object);
let dbConnection;

const client = mongoose.connect(
  "mongodb+srv://omri:omri@cluster0.sttqd2d.mongodb.net/testdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = {
  connectToServer: function (callback) {
    console.log("Successfully connected to MongoDB.");
    return callback();
  },

  getDb: function () {
    return dbConnection;
  },
};

// in case we want to insert somthing to the DB
try {
  db.on("open", async () => {
    const dataExist = await db.collection("CodeBlocks").countDocuments();
    if (!dataExist) {
      db.collection("CodeBlocks").insertMany(codeBlocks, (error, result) => {
        if (result) {
          console.log("Code Blocks inserted to DB");
        } else if (error) {
          console.error(error);
        }
      });
    }
  });
} catch (error) {
  console.error(error);
}
