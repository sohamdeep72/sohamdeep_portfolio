// server/index.js - Express backend (CommonJS)
const express = require("express");
const path = require("path");
const fs = require("fs");
const compression = require("compression");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

// serve static assets
app.use("/public", express.static(path.join(__dirname, "public")));

const profilePath = path.join(__dirname, "data", "profile.json");
function loadProfile() {
  try {
    return JSON.parse(fs.readFileSync(profilePath, "utf8"));
  } catch (err) {
    console.error("Error reading profile.json", err);
    return {};
  }
}

app.get("/api/profile", (req, res) => res.json(loadProfile()));
app.get("/api/projects", (req, res) => res.json(loadProfile().projects || []));
// serve built client (if present)
const clientDist = path.join(__dirname, "..", "client", "dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res, next) => {
    // allow API and public asset routes to pass through
    if (req.path.startsWith("/api") || req.path.startsWith("/public") || req.path.startsWith("/health")) {
      return next();
    }
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
