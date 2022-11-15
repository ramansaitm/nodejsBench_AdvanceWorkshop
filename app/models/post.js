const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  resharedBy: [
    {
      userId: { type: mongoose.Types.ObjectId ,ref:"post"},
      addedOn: {
        type: Number,
        default: Date.now(),
      },
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    
  },

  creator: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
  tag: {
    type: Array,
    default: [],
  },
  image: {
    type: String,
    default: "",
  },

  likes: {
    type: Array,
    default: [],
  },
  likeCount: {
    type: Number,
    default: 0,
  },

  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "post",
      },

      content: {
        type: String,
        default: "",
      },

      created: {
        type: Number,
        default: Date.now(),
      },
    },
  ],

  addedOn: {
    type: Number,
    default: Date.now(),
  },

  updateOn: {
    type: Number,
    default: Date.now(),
  },
});

Post.method({
  saveData: async function () {
    return this.save();
  },
});
Post.static({
  findData: function (findObj) {
    return this.find(findObj);
  },
  findOneData: function (findObj) {
    return this.findOne(findObj);
  },findByIdAndRemoveData(findObj){
    return this.findByIdAndDelete(findObj);
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
export default mongoose.model("User", Post);
