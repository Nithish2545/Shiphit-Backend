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
    origin: "http://localhost:5173", // Allow your frontend origin
  })
);
// Get the current directory from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the service account key JSON
const serviceAccountPath = path.join(__dirname, "serviceAccount.json");

app.post("/sendNotification", async (req, res) => {
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
  // Access token generation
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
  res.send("successfully send");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
