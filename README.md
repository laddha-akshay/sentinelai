# SentinelAI
Security log analysis assistant built with embeddings and a lightweight LLM reasoning layer.

## Overview
SentinelAI takes raw system logs, parses and cleans them, converts them into dense embeddings, indexes them with FAISS, retrieves the most relevant entries, and produces clear incident explanations. The goal is to demonstrate practical skills in retrieval pipelines, LLM orchestration, backend engineering, and applied security reasoning.

## Key Features
• Log ingestion and parsing  
• Embedding generation using MiniLM  
• Semantic retrieval through FAISS  
• Context aware incident explanations  
• Simple web interface for testing  
• Fallback mode for environments without an API key

## Architecture
\`\`\`
Logs -> Ingestion -> Embeddings -> FAISS Index -> Retrieval -> LLM Explanation Layer -> UI
\`\`\`

## Architecture Diagram
\`\`\`
                   +----------------------+
                   |   User Interface     |
                   +-----------+----------+
                               |
                               v
                        Upload and Query
                               |
                   +-----------+-----------+
                   |         FastAPI        |
                   +-----------+-----------+
                               |
         +---------------------+----------------------+
         |                                            |
         v                                            v
    Log Ingestion                              Query Agent
 (Parse and clean logs)             (Retrieve context and build prompt)
         |                                            |
         v                                            v
Embedding Model (MiniLM)                    LLM or fallback summary
         |                                            |
         v                                            v
     FAISS Index                             Final incident explanation
\`\`\`

## How to Run
\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

Open:
\`\`\`
http://localhost:8000
\`\`\`

## Deployment
See render.yaml and Dockerfile in repo root for Render or Docker based deploys.
