const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secretKey = "yourSecretKey";

const app = express();
const PORT = process.env.PORT || 3001;
const uri = "mongodb+srv://avinash:avinash@cluster0.rlhitli.mongodb.net/";

// Connect to MongoDB Atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "registration_db", // Specify the database name
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Define Trainer schema
const trainerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  skills: { type: String, required: true },
  address: { type: String, required: true },
  chargePerDay: { type: String, required: true },
  role: { type: String, default: "trainer" },
});

// Define Company schema
const companySchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  domain: { type: String, required: true },
  role: { type: String, default: "company" },
});

const Trainer = mongoose.model("Trainer", trainerSchema);
const Company = mongoose.model("Company", companySchema);

app.use(cors());
app.use(express.json());

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err); // Log verification errors
        return res.sendStatus(403); // Forbidden
      }

      console.log("Decoded Token:", user); // Log decoded user information
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

const authorizeRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
};

// Trainer registration endpoint
app.post("/trainers", async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      contactNumber,
      skills,
      address,
      chargePerDay,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTrainer = new Trainer({
      username,
      password: hashedPassword,
      name,
      email,
      contactNumber,
      skills,
      address,
      chargePerDay,
    });

    await newTrainer.save();
    res.status(201).json({ message: "Trainer registered successfully" });
  } catch (error) {
    console.error("Error registering trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Company registration endpoint
app.post("/companies", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // If email doesn't exist, proceed with registration
    const { uniqueId, companyName, location, phone, password, domain } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      uniqueId,
      companyName,
      location,
      phone,
      email,
      password: hashedPassword,
      domain,
    });

    await newCompany.save();
    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error registering company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// modification done from here
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Check if the provided credentials are for the admin
    if (email == "admin@gmail.com" && password == "admin") {
      // Generate token for admin as well
      const token = jwt.sign({ email, role: "admin" }, secretKey, {
        expiresIn: "1h",
      });
      return res.status(200).json({ role: "admin", token }); // Return admin role and token
    }

    // Proceed with regular user login for trainer or company
    let user = await Trainer.findOne({ email });
    let role = "trainer";

    if (!user) {
      user = await Company.findOne({ email });
      role = "company";
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Generate token
      const token = jwt.sign({ email: user.email, role }, secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({ role, token }); // Send the token to the client
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//modification for jwt token to be done till here

// Modify the admin-dashboard route to apply authentication middleware
app.get(
  "/admin-dashboard",
  authenticateJWT, // Apply authentication middleware
  authorizeRole(["admin"]), // Apply authorization middleware
  (req, res) => {
    // Admin dashboard code
    res.send("Welcome to the Admin Dashboard");
  }
);

app.get(
  "/trainer-dashboard",
  authenticateJWT,
  authorizeRole(["trainer"]),
  (req, res) => {
    // Trainer dashboard code
    res.send("Welcome to the Trainer Dashboard");
  }
);

app.get(
  "/business-dashboard",
  authenticateJWT,
  authorizeRole(["company"]),
  (req, res) => {
    // Business dashboard code
    res.send("Welcome to the Business Dashboard");
  }
);

app.get("/trainers", async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update trainer by ID
app.put("/trainers/:id", async (req, res) => {
  const { id } = req.params; // Get the trainer ID from the URL params
  const updatedData = req.body; // Get the updated trainer data from the request body
  try {
    // Find the trainer by ID and update their details
    const updatedTrainer = await Trainer.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedTrainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.status(200).json(updatedTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete trainer by ID
app.delete("/trainers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Trainer.findByIdAndDelete(id);
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Updating company details by ID
app.put('/companies/:id', async (req, res) => {
  const companyId = req.params.id;
  const updatedCompanyData = req.body; // New data for the company

  try {
      // Find the company by ID and update its details
      const company = await Company.findByIdAndUpdate(companyId, updatedCompanyData, { new: true });
      res.json(company);
  } catch (error) {
      res.status(500).json({ message: "Error updating company details", error });
  }
});

// Deleting company details by ID
app.delete('/companies/:id', async (req, res) => {
  const companyId = req.params.id;

  try {
      // Find the company by ID and delete it
      await Company.findByIdAndDelete(companyId);
      res.json({ message: "Company deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting company", error });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});