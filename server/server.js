import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors()); // Allow frontend to call this backend

// app.get("/api/search", async (req, res) => {
//     const { keyword } = req.query;
//     const apiUrl = `https://tmsearch.ai/api/search/?keyword=${keyword}&api_key=TESTAPIKEY`;

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching data" });
//     }
// });

app.get("/api/search", async (req, res) => {
    const { keyword } = req.query;
    const apiUrl = `https://tmsearch.ai/api/search/?keyword=${keyword}&api_key=TESTAPIKEY`;

    console.log("Fetching from API:", apiUrl); // Debug log

    try {
        const response = await fetch(apiUrl);
        console.log("API Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);

        res.json(data);
    } catch (error) {
        console.error("Error fetching API data:", error);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
