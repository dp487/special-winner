import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Task from "./models/Task.js";
import dotenv from "dotenv";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create test users
    const users = [
      {
        email: "user1@example.com",
        password: await bcrypt.hash("password1", 10),
      },
      {
        email: "user2@example.com",
        password: await bcrypt.hash("password2", 10),
      },
    ];

    const savedUsers = await User.insertMany(users);

    // Create test tasks
    const tasks = [
      {
        title: "Task 1",
        description: "Complete project proposal",
        status: "incomplete",
        priority: "High",
        userId: savedUsers[0]._id,
      },
      {
        title: "Task 2",
        description: "Review documentation",
        status: "complete",
        priority: "Medium",
        userId: savedUsers[0]._id,
      },
      {
        title: "Task 3",
        description: "Team meeting",
        status: "incomplete",
        priority: "Low",
        userId: savedUsers[1]._id,
      },
    ];

    await Task.insertMany(tasks);
    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

seed();
