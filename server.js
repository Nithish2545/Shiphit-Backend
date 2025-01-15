import express from "express";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { db } from "./firebase.js";
dotenv.config();
// Set up the Express app
const app = express();
const port = 3001;
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// Get the current directory from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the service account key JSON
// Path to your service account JSON file
const serviceAccountPath = path.join(__dirname, "serviceAccount.json");

// Read the JSON file
fs.readFile(serviceAccountPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading service account file:", err);
    return;
  }

  // Convert the JSON data to Base64
  const base64Data = Buffer.from(data).toString("base64");

  // Save the Base64 data to a txt file
  const outputFilePath = path.join(__dirname, "serviceAccountBase64.txt");
  fs.writeFile(outputFilePath, base64Data, "utf8", (err) => {
    if (err) {
      console.error("Error writing Base64 to txt file:", err);
    } else {
      console.log("Base64 data saved to serviceAccountBase64.txt");
    }
  });
});
app.get("/", (req, res) => {
  res.send("app successfully running! Thank you");
});

app.post("/sendNotification", async (req, res) => {
  try {
    // Access token generation
    const serviceAccountBase64 = process.env.SERVICE_ACCOUNT_BASE64;
    const serviceAccount = JSON.parse(
      Buffer.from(serviceAccountBase64, "base64").toString("utf-8")
    );

    const jwtClient = new google.auth.JWT(
      serviceAccount.client_email,
      null,
      serviceAccount.private_key,
      ["https://www.googleapis.com/auth/firebase.messaging"]
    );
    await jwtClient.authorize();
    const { token } = await jwtClient.getAccessToken();
    const accessToken = token;
    const { to, title, body, image, link } = req.body;

    // Send the push notification
    await axios.post(
      "https://fcm.googleapis.com/v1/projects/shiphitmobileapppickup-4d0a1/messages:send",
      {
        message: {
          token: to,
          notification: {
            title: title,
            body: body,
            image: image, // Add a proper logo URL here
          },
          webpush: {
            fcm_options: {
              link: link,
            },
            headers: {
              Urgency: "high",
            },
          },
        },
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Use the dynamically retrieved access token
        },
      }
    );

    // Respond with success message
    res.status(200).send("Successfully sent the notification");
  } catch (error) {
    console.error("Error sending notification:", error);

    // Send an error response with a detailed message
    res.status(500).json({
      message: "Error sending notification",
      error: error.message || "Unknown error",
    });
  }
});
app.post("/saveToken", async (req, res) => {
  const { name_id, fcmToken } = req.body;

  if (!name_id || !fcmToken) {
    return res
      .status(400)
      .json({ message: "name_id and fcmToken are required" });
  }

  try {
    const userRef = db.collection("users").doc(name_id); // Using email as document ID
    await userRef.set({ fcmToken }, { merge: true }); // Store the token in the document

    res.status(200).json({ message: "Token saved successfully" });
  } catch (error) {
    console.error("Error saving token:", error);
    res
      .status(500)
      .json({ message: "Failed to save token", error: error.message });
  }
});

app.post("/", (req, res) => {
  res.send("Respond!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
