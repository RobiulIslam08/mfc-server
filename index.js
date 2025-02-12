// // const express = require('express');
// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const app = express();
// // require('dotenv').config();
// // const port = process.env.PORT || 5000;
// // const cors = require('cors');

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqcbidk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });

// // async function run() {
// //   try {
// //     const usersCollection = client.db('mfs').collection('users');

// //     app.put('/users', async (req, res) => {
// //       const user = req.body;
// //       console.log('user', user);
// //       const query = { email: user?.email };

// //       const isExists = await usersCollection.findOne(query);
// //       if (isExists) {
// //         if (user.status === 'Requested') {
// //           const result = await usersCollection.updateOne(query, {
// //             $set: { status: user?.status },
// //           });
// //           return res.send({ message: 'User status updated', result });
// //         } else {
// //           return res.send({ message: 'User already exists', user: isExists });
// //         }
// //       }

// //       const options = { upsert: true };
// //       const updateDoc = {
// //         $set: {
// //           ...user,
// //           Timestamp: Date.now(),
// //         },
// //       };
// //       console.log(updateDoc);
// //       const result = await usersCollection.updateOne(query, updateDoc, options);
// //       res.send({ message: 'User registered successfully', result });
// //     });

// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     // await client.close();
// //   }
// // }
// // run().catch(console.dir);

// // app.get('/', (req, res) => {
// //   res.send('Server is running');
// // });

// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });

// const express = require("express");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const app = express();
// require("dotenv").config();
// const port = process.env.PORT || 5000;
// const cors = require("cors");

// // Middleware
// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqcbidk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     const usersCollection = client.db("mfs").collection("users");

//     app.put("/users", async (req, res) => {
//       const user = req.body;
//       console.log("user", user);
//       const query = { email: user?.email };

//       const isExists = await usersCollection.findOne(query);
//       if (isExists) {
//         if (user.status === "Requested") {
//           const result = await usersCollection.updateOne(query, {
//             $set: { status: user?.status },
//           });
//           return res.send({ message: "User status updated", result });
//         } else {
//           return res.send({ message: "User already exists", user: isExists });
//         }
//       }
//       // Hash the PIN before saving it
//       const salt = 10;
//       const hashedPin =  bcrypt.hashSync(user.pin, salt);
//       const options = { upsert: true };
//       const updateDoc = {
//         $set: {
//           ...user,
//           pin: hashedPin, // Save the hashed PIN
//           Timestamp: Date.now(),
//         },
//       };
//       console.log(updateDoc);
//       const result = await usersCollection.updateOne(query, updateDoc, options);
//       res.send({ message: "User registered successfully", result });
//     });

//     // Login Endpoint
//     app.post("/api/users/login", async (req, res) => {
//       const { identifier, pin } = req.body;
//       const query = {
//         $or: [{ email: identifier }, { mobileNumber: identifier }],
//         pin,
//       };

//       const user = await usersCollection.findOne(query);
//       if (!user) {
//         return res.status(401).send({ message: "Invalid credentials" });
//       }

//       const token = jwt.sign(
//         { id: user._id, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       const userInfo = {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         mobileNumber: user.mobileNumber,
//       };

//       res.send({ message: "Login successful", token, user: userInfo });
//     });

//     // get all user data
//     app.get("/users", async (req, res) => {
//       const result = await usersCollection.find().toArray();

//       res.send(result);
//     });

//     app.patch("/users/update/:email", async (req, res) => {
//       const email = req.params.email;
//       const query = { email };
//       const user = req.body;
//       const updateDoc = {
//         $set: {
//           ...user,
//           Timestamp: Date.now(),
//         },
//       };
//       const result = await usersCollection.updateOne(query, updateDoc);
//       res.send(result);
//     });

//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqcbidk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const usersCollection = client.db("mfs").collection("users");

    app.put("/users", async (req, res) => {
      const user = req.body;
      console.log("user", user);
      const query = { email: user?.email };

      const isExists = await usersCollection.findOne(query);
      if (isExists) {
        if (user.status === "Requested") {
          const result = await usersCollection.updateOne(query, {
            $set: { status: user?.status },
          });
          return res.send({ message: "User status updated", result });
        } else {
          return res.send({ message: "User already exists", user: isExists });
        }
      }
      // Hash the PIN before saving it
      const salt = 10;
      const hashedPin = bcrypt.hashSync(user.pin, salt);
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...user,
          pin: hashedPin, // Save the hashed PIN
          Timestamp: Date.now(),
        },
      };
      console.log(updateDoc);
      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send({ message: "User registered successfully", result });
    });

    // Login Endpoint
    app.post("/api/users/login", async (req, res) => {
      const { identifier, pin } = req.body;
      const query = {
        $or: [{ email: identifier }, { mobileNumber: identifier }],
      };

      const user = await usersCollection.findOne(query);
      if (!user || !bcrypt.compareSync(pin, user.pin)) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const userInfo = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobileNumber: user.mobileNumber,
      };

      res.send({ message: "Login successful", token, user: userInfo });
    });

    // get all user data
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();

      res.send(result);
    });

    app.patch("/users/update/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = req.body;
      const updateDoc = {
        $set: {
          ...user,
          Timestamp: Date.now(),
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
