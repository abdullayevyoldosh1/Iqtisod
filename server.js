import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, "data.json");

app.use(express.json({ limit: "8mb" }));
app.use(express.static(__dirname));

app.get("/api/site-data", async (req, res) => {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    res.type("application/json").send(raw);
  } catch (error) {
    res.status(404).json({ error: "data.json topilmadi" });
  }
});

app.post("/api/site-data", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ error: "Noto'g'ri ma'lumot" });
    }
    const json = JSON.stringify(payload, null, 2);
    const tmpPath = `${DATA_PATH}.tmp`;
    await fs.writeFile(tmpPath, json, "utf-8");
    await fs.rename(tmpPath, DATA_PATH);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Saqlashda xatolik" });
  }
});

app.listen(PORT, () => {
  console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
