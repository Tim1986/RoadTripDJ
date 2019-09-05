const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: "",
    required: "First name is required"
  },
  lastName: {
    type: String,
    trim: true,
    default: "",
    required: "Last name is required"
  },
  email: {
    type: String,
    trim: true,
    default: "",
    required: "Email is required"
  },
  password: {
    type: String,
    default: "",
    required: "Password is required",
    validate: [
      function (input) {
        return input.length >= 5
      },
      "Password must be at least five characters or longer."
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});


class newUser {
  constructor({ id, firstName, lastName, email, password }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  comparePassword(challenge) {
    return this.password === challenge;
  }
}

UserSchema.loadClass(newUser);
let User = mongoose.model('User', UserSchema);


module.exports = User;
