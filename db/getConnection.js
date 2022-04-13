import mongoose from "mongoose";

const getConnection = uri => {
  mongoose.connect(uri, err => {
    if (err) {
      console.log(`Connect db failure! err: ${err}`);
      mongoose.connection.close();
      return false;
    } else {
      console.log("Connected successfully to the db!");
      return true;
    }
  });
}

export default getConnection;