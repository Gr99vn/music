import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String
});

userSchema
  .virtual("fullName")
  .get(function() {
    if (!this.firstName || !this.lastName) {
      return "";
    }
    return this.firstName
      .concat(" ")
      .concat(this.lastName);
  });

const User = new mongoose.model("User", userSchema);

export default User;
