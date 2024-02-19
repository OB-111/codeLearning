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
  {
    title: "Destructuring",
    code: "const person = { name: 'John', age: 30 }; console.log(name, age);",
    sol: "const person = { name: 'John', age: 30 }; console.log(person.name, person.age);",
  },
  {
    title: "Spread Operator",
    code: "const arr1 = [1, 2, 3]; const arr2 = [4, 5, 6]; console.log(arr1.concat(arr2));",
    sol: "const arr1 = [1, 2, 3]; const arr2 = [4, 5, 6]; console.log([...arr1, ...arr2]);",
  },
  {
    title: "Template Literals",
    code: "const name = 'World'; console.log('Hello, ' + name + '!');",
    sol: "const name = 'World'; console.log(`Hello, ${name}!`);",
  },
  {
    title: "Map Function",
    code: "const numbers = [1, 2, 3]; const doubled = numbers.map(function (num) { return num * 2; });",
    sol: "const numbers = [1, 2, 3]; const doubled = numbers.map((num) => num * 2);",
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
