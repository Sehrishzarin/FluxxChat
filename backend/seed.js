require("dotenv").config();
const mongoose = require("mongoose");
const Post = require("./models/Post");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");

    const users = await User.find();
    if (users.length < 3) {
      console.log("Please create at least 3 users first!");
      process.exit();
    }

    const samplePosts = [
      { text: "Hello FluxxTalk! 🚀", user: users[0]._id },
      { text: "Just testing my first post.", user: users[1]._id },
      { text: "Good morning everyone 🌞", user: users[2]._id }
    ];

    await Post.deleteMany();
    await Post.insertMany(samplePosts);
    console.log("Dummy posts added!");
    process.exit();
  })
  .catch(err => console.error(err));
