import os
from typing import List
try:
    import openai
except Exception:
    openai = None

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
if openai and OPENAI_KEY:
    openai.api_key = OPENAI_KEY

def explain_incidents(incidents: List[dict], question: str):
    context = "\n\n".join([f"- {i.get('timestamp')} {i.get('src')} {i.get('message')}" for i in incidents])
    prompt = f"""You are a security analyst. Given the following log excerpts:
{context}

Answer the query: {question}
Provide:
1) Brief explanation of likely root cause
2) Top 3 remediation steps
Keep it short and actionable.
"""
    if openai and OPENAI_KEY:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role":"user","content":prompt}],
            max_tokens=300
        )
        return resp["choices"][0]["message"]["content"].strip()
    else:
        return "No OPENAI_API_KEY set. Set it to get richer explanations."
