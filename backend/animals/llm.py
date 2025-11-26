import os
import time
import httpx
import json

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = "gemini-2.5-flash"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent"

MAX_RETRIES = 3
RETRY_WAIT_SECONDS = 5

def generate_text_for_animal(prompt: str, max_tokens: int = 60) -> str:
    """
    Generates a text (thought) for an animal using the Gemini API (Google Generative Language).
    """

    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY not set")

    headers = {
        "x-goog-api-key": GEMINI_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [
            {
            "parts": [
                {
                "text": prompt
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
                    return "Could not generate the thought at this time."

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
                print(f"[ERROR] Failed to generate text: {e}")
                break

    return "Could not generate the thought at this time."
