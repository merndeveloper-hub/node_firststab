import mongoose from "mongoose";



//const { DB_USER, DB_PASS, DB_NAME } = require("../index");
//console.log( DB_USER, DB_PASS, DB_NAME,"checking");

//MONGODB_URI="mongodb+srv://username:password@clustername.mongodb.net/databaseName?retryWrites=true&w=majority"

//mongodb+srv://owais:<db_password>@cluster0.1wehduf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// if(!DB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
// }

mongoose.connect(
  "mongodb+srv://owais:WangChao786123@cluster0.1wehduf.mongodb.net/firststab?retryWrites=true&w=majority&appName=Cluster0"
//  `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.1wehduf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
);

export default mongoose;
