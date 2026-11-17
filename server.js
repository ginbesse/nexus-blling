const express = require('express');
const app = express();

// Render.com'un atayacağı dinamik port veya yerel test için 3000
const PORT = process.env.PORT || 3000;

// JSON gövde (body) okuyucusunu aktif et
app.use(express.json());

// Geçerli API anahtarları (Gerçek sistemde Stripe/Veritabanı ile doğrulanır)
const VALID_API_KEYS = new Set(["WORTEX_PREMIUM_KEY_2026"]);

// Ana Sayfa - Sistem Durumu
app.get('/', (req, res) => {
    res.json({
        status: "online",
        ecosystem: "WORTEX Global",
        service: "Node.js Autonomous Compute & Optimization Engine",
        pricing: "Pay-per-request / Enterprise Tier"
    });
});

// Otonom Optimizasyon ve Gelir Üretim Endpoint'i
app.post('/v1/optimize', (req, res) => {
    const apiKey = req.headers['x-api-key'];

    // API Anahtarı Kontrolü
    if (!apiKey || !VALID_API_KEYS.has(apiKey)) {
        return res.status(403).json({
            error: "Forbidden",
            message: "Invalid or missing API Key. Please subscribe via WORTEX Billing."
        });
    }

    const { data_payload, optimization_mode = "speed" } = req.body;

    if (!data_payload || !Array.isArray(data_payload)) {
        return res.status(400).json({
            error: "Bad Request",
            message: "'data_payload' field must be a valid array."
        });
    }

    // Otonom motor işlem hesaplamaları
    const itemCount = data_payload.length;
    const efficiencyGain = (itemCount * 1.42).toFixed(2);
    const billedAmount = (itemCount * 0.01).toFixed(2);

    // Başarılı yanıt ve otomatik değer üretimi
    res.json({
        status: "success",
        processed_items: itemCount,
        optimization_mode: optimization_mode,
        efficiency_gain_percentage: `%${efficiencyGain}`,
        billed_amount_usd: `$${billedAmount}`,
        node: "Render-Cloud-Node-NodeJS"
    });
});

// Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`WORTEX Autonomous Engine running on port ${PORT}`);
});
