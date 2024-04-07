const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user_schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    // required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // headline: {
  //   type: String,
  //   required: false,
  // },
  // summary: {
  //   type: String,
  //   required: false,
  // },
  // experience: {
  //   type: [
  //     {
  //       title: {
  //         type: String,
  //         required: true,
  //       },
  //       company: {
  //         type: String,
  //         required: true,
  //       },
  //       start_date: {
  //         type: Date,
  //         required: true,
  //       },
  //       end_date: {
  //         type: Date,
  //       },
  //       description: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
  //   required: false,
  //   default: [],
  // },
  // education: {
  //   type: [
  //     {
  //       school: {
  //         type: String,
  //         required: true,
  //       },
  //       degree: {
  //         type: String,
  //         required: true,
  //       },
  //       field_of_study: {
  //         type: String,
  //         required: true,
  //       },
  //       start_date: {
  //         type: Date,
  //         required: true,
  //       },
  //       end_date: {
  //         type: Date,
  //       },
  //       description: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
  //   required: false,
  //   default: [],
  // },
  // skills: {
  //   type: [
  //     {
  //       skill: {
  //         type: String,
  //         required: true,
  //       },
  //       time_stamp: {
  //         type: Date,
  //         default: null,
  //       },
  //     },
  //   ],
  //   required: false,
  //   default: [],
  // },
},{timestamps:true,paranoid:true});

user_schema.pre("save", async function (next) {
  try {
    // if (!this.isModified("password")) {
    //   return next();
    // }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log("hashedPassword: ", hashedPassword);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

user_schema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("user", user_schema);
