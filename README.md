# SentinelAI  
Security log analysis assistant built with retrieval augmented reasoning.

## Overview  
SentinelAI takes raw system logs, parses and cleans them, converts them into dense embeddings, indexes them using FAISS, retrieves the most relevant log lines, and produces a human readable incident explanation. This project demonstrates practical end to end AI engineering skills.

## Features  
• Upload log files from the UI  
• Automatic log parsing and structuring  
• Embedding generation using MiniLM  
• Fast semantic search with FAISS  
• Natural language query and explanation layer  
• Simple browser based interface  
• Supports OPENAI_API_KEY for richer reasoning

## Architecture  
```
Logs → Ingestion → Embeddings → FAISS Index → Retrieval → LLM Explanation Layer → UI
```

### Detailed Diagram  
```
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
```

## How to Run Locally  

### Create a virtual environment  
```bash
python -m venv venv
```

### Activate it  
```bash
source venv/bin/activate
```

### Install dependencies  
```bash
pip install -r requirements.txt
```

### Start the server  
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Open in browser  
```
http://localhost:8000
```

## Example Query  
Ask something like:  
```
What caused recent error level events
```

## Example Output  
The system returns:  
• Top matching log entries  
• Explanation (if OPENAI_API_KEY is set)

## Developer Notes  
You can set OPENAI_API_KEY for real reasoning:  
```bash
export OPENAI_API_KEY="your_key_here"
```


