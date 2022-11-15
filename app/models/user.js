const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  googleId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  password: {
    type: String,
  },
  token: {
    type: String,
    default: "",
  },

  isLogin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.method({
  saveData: async function () {
    return this.save();
  },
});


UserSchema.static({
  findData: function (findObj) {
    return this.find(findObj);
  },
  findOneData: function (findObj) {
    return this.findOne(findObj);
  },
  findOneAndUpdateData: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  },
  findDataWithAggregate: function (findObj) {
    return this.aggregate(findObj);
  },
});
export default mongoose.model("post", UserSchema);
