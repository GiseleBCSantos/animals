import os
import time
import httpx
import json

# ---------------------------
# Configurações da API Gemini
# ---------------------------
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = "gemini-2.5-flash"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent"

MAX_RETRIES = 3
RETRY_WAIT_SECONDS = 5

# ---------------------------
# Função principal
# ---------------------------
def gerar_texto_para_animal(prompt: str, max_tokens: int = 60) -> str:
    """
    Gera um texto (pensamento) para um animal usando a API Gemini (Google Generative Language).
    """

    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY não configurada")

    headers = {
        "x-goog-api-key": GEMINI_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [
            {
            "parts": [
                {
                "text": "Gere um pensamento curto e fofo como se fosse um(a) Cachorro chamado Bolt. Máx 180 caracteres."
                }
            ]
            }
        ]
    }

    with httpx.Client(timeout=30) as client:
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                resp = client.post(API_URL, headers=headers, json=payload)
                resp.raise_for_status()
                data = resp.json()

                try:
                    return data["candidates"][0]["content"]["parts"][0]["text"].strip()

                except Exception:
                    return "Não foi possível gerar o pensamento no momento."

            except httpx.HTTPStatusError as e:
                if e.response.status_code in (429, 503):
                    wait_time = RETRY_WAIT_SECONDS * attempt
                    time.sleep(wait_time)
                elif e.response.status_code == 401:
                    break
                elif e.response.status_code == 400:
                    break
                else:
                    raise
            except Exception as e:
                print(f"[ERRO] Falha ao gerar texto: {e}")
                break

    return "Não foi possível gerar o pensamento no momento."
