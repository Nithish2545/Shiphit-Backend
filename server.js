import express from "express";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
// Set up the Express app
const app = express();
const port = 3001;
app.use(express.json());
app.use(
  cors({
    origin: "https://enquiry-app-a4bfc.web.app", // Allow your frontend origin
  })
);
// Get the current directory from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the service account key JSON
const serviceAccountPath = path.join(__dirname, "serviceAccount.json");

app.get("/", (req, res) => {
  res.send("app successfully running!");
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
    const { fcm_token, title, body, image, link } = req.body;

    // Send the push notification
    await axios.post(
      "https://fcm.googleapis.com/v1/projects/shiphitmobileapppickup-4d0a1/messages:send",
      {
        message: {
          token: fcm_token,
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
