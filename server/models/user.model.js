const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user_schema = new mongoose.Schema({
  role:{
    type: String,
    required:true
  },
  role_id: {
    type: String,
    required: true,
    ref: "acl"
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique:true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended']
  },
  image: {
    type: String,
  },
  phone_no: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  pincode: Number,
  address: String,
  city: String,
  country: String,
  state: String,
  fax: Number,
}, { timestamps: true });

user_schema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
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
