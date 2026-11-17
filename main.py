from fastapi import FastAPI, HTTPException, Security
from fastapi.security.api_key import APIKeyHeader
from pydantic import BaseModel

app = FastAPI(title="WORTEX Optimized Compute API", version="1.0.0")

API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

# Gerçek sistemde bu anahtarlar veritabanından veya Stripe ödeme webhook'larından doğrulanır
VALID_API_KEYS = {"WORTEX_PREMIUM_KEY_2026"}

class OptimizeRequest(BaseModel):
    data_payload: list
    optimization_mode: str = "speed"

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "WORTEX Global Compute & Optimization Engine",
        "pricing": "Pay-per-request / Enterprise Tier"
    }

@app.post("/v1/optimize")
def optimize_data(data: OptimizeRequest, api_key: str = Security(api_key_header)):
    if api_key not in VALID_API_KEYS:
        raise HTTPException(status_code=403, detail="Invalid or missing API Key. Please subscribe via WORTEX Billing.")
    
    # Burada otonom optimizasyon algoritması çalışır
    item_count = len(data.data_payload)
    efficiency_gain = item_count * 1.42 # Simüle edilmiş performans kazancı
    
    return {
        "status": "success",
        "processed_items": item_count,
        "optimization_mode": data.optimization_mode,
        "efficiency_gain_percentage": f"%{efficiency_gain:.2f}",
        "billed_amount_usd": f"${item_count * 0.01:.2f}" # Her istek başına otomatik maliyetlendirme
    }
