const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);

/* ── Socket.IO ── */
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

/* ── Middleware ── */
app.use(cors());
app.use(express.json());

/* ── Simple file-based DB (for Render free tier) ── */
const DB_FILE = path.join(__dirname, "data.json");

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) return { users: [], messages: [], rooms: [] };
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch { return { users: [], messages: [], rooms: [] }; }
}

function writeDB(data) {
  try { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); } catch {}
}

/* ── Creator config ── */
const CREATOR_PHONES = ["2347037422544", "2348083214219"];
const CREATOR_PASSWORD = "Qwin2007";

/* ═══════════════════════ REST API ═══════════════════════ */

/* Health check */
app.get("/api/health", (req, res) => {
  const db = readDB();
  res.json({
    status: "online",
    platform: "QwinChat v2.5",
    users: db.users.length,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* GET stats (public) */
app.get("/api/stats", (req, res) => {
  const db = readDB();
  res.json({
    totalUsers: db.users.length,
    totalMessages: db.messages.length,
    platform: "QwinChat v2.5",
  });
});

/* Register */
app.post("/api/register", (req, res) => {
  const { phone, password, displayName, username, country, dialCode } = req.body;
  if (!phone || !password || !displayName || !username)
    return res.status(400).json({ error: "All fields required" });

  const cleanPhone = phone.replace(/\D/g, "");
  if (CREATOR_PHONES.includes(cleanPhone))
    return res.status(400).json({ error: "This number is reserved" });

  const db = readDB();
  if (db.users.find((u) => u.phone === cleanPhone))
    return res.status(400).json({ error: "Phone number already registered" });
  if (db.users.find((u) => u.username === username.toLowerCase()))
    return res.status(400).json({ error: "Username already taken" });

  const hue = Math.floor(Math.random() * 360);
  const user = {
    id: `u_${Date.now()}`,
    displayName: displayName.trim(),
    username: username.toLowerCase().trim(),
    phone: cleanPhone,
    dialCode,
    country,
    password, // In production: bcrypt hash
    role: "user",
    color: `hsl(${hue},60%,40%)`,
    color2: `hsl(${(hue + 60) % 360},60%,35%)`,
    online: false,
    bio: "",
    status: "",
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDB(db);

  const { password: _, ...safe } = user;
  res.json({ success: true, user: safe });
});

/* Login */
app.post("/api/login", (req, res) => {
  const { phone, password, dialCode } = req.body;
  if (!phone || !password)
    return res.status(400).json({ error: "Phone and password required" });

  const cleanPhone = (phone).replace(/\D/g, "");

  /* Creator login */
  if (CREATOR_PHONES.includes(cleanPhone)) {
    if (password !== CREATOR_PASSWORD)
      return res.status(401).json({ error: "Wrong password" });
    return res.json({
      success: true,
      user: {
        id: "CREATOR",
        displayName: "Qwin Creator",
        username: "qwincreator",
        phone: cleanPhone,
        role: "creator",
        color: "#f59e0b",
        color2: "#ef4444",
        online: true,
      },
    });
  }

  /* Normal user */
  const db = readDB();
  const user = db.users.find((u) => u.phone === cleanPhone);
  if (!user) return res.status(404).json({ error: "Account not found" });
  if (user.password !== password)
    return res.status(401).json({ error: "Wrong password" });

  const { password: _, ...safe } = user;
  res.json({ success: true, user: { ...safe, online: true } });
});

/* Get all users (creator only — no chat content) */
app.get("/api/users", (req, res) => {
  const db = readDB();
  const safe = db.users.map(({ password, ...u }) => u);
  res.json(safe);
});

/* Delete user (creator moderation) */
app.delete("/api/users/:id", (req, res) => {
  const db = readDB();
  db.users = db.users.filter((u) => u.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

/* Serve built frontend */
const DIST = path.join(__dirname, "..", "frontend", "dist");
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get("*", (_, res) => res.sendFile(path.join(DIST, "index.html")));
} else {
  app.get("/", (_, res) =>
    res.send(`
      <html><body style="background:#04040c;color:#eef0ff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:16px">
        <div style="font-size:60px">⚡</div>
        <h1 style="background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:32px">QwinChat</h1>
        <p style="color:#6060a0">Backend running. Deploy frontend to see the full app.</p>
        <a href="/api/health" style="color:#06b6d4">/api/health ✓</a>
      </body></html>
    `)
  );
}

/* ═══════════════════════ SOCKET.IO ═══════════════════════ */
const onlineUsers = new Map(); // socketId → userId

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  /* User comes online */
  socket.on("user:online", (userId) => {
    onlineUsers.set(socket.id, userId);
    socket.broadcast.emit("user:status", { userId, online: true });
    io.emit("online:count", onlineUsers.size);
  });

  /* Join a room (chat) */
  socket.on("room:join", (roomId) => {
    socket.join(roomId);
  });

  /* Send a message to a room */
  socket.on("message:send", (data) => {
    const { roomId, message } = data;
    const db = readDB();
    const stored = { ...message, roomId, serverTime: new Date().toISOString() };
    db.messages.push(stored);
    writeDB(db);
    socket.to(roomId).emit("message:receive", stored);
    /* Send delivered receipt back */
    socket.emit("message:delivered", { id: message.id });
  });

  /* Typing indicator */
  socket.on("typing:start", ({ roomId, userId }) => {
    socket.to(roomId).emit("typing:start", { userId });
  });
  socket.on("typing:stop", ({ roomId, userId }) => {
    socket.to(roomId).emit("typing:stop", { userId });
  });

  /* Read receipt */
  socket.on("message:read", ({ roomId, messageId }) => {
    socket.to(roomId).emit("message:read", { messageId });
  });

  /* Disconnect */
  socket.on("disconnect", () => {
    const userId = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    if (userId) {
      socket.broadcast.emit("user:status", { userId, online: false });
    }
    io.emit("online:count", onlineUsers.size);
  });
});

/* ── Start ── */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n⚡ QwinChat server running on port ${PORT}`);
  console.log(`   API:     http://localhost:${PORT}/api/health`);
  console.log(`   Sockets: Socket.IO active`);
  const db = readDB();
  console.log(`   Users:   ${db.users.length} registered\n`);
});
  
