import pandas as pd
import re
from datetime import datetime

LOG_PATTERN = r'(?P<timestamp>\S+) (?P<level>\S+) (?P<src>\S+) (?P<msg>.+)'

def parse_log_line(line):
    m = re.match(LOG_PATTERN, line)
    if not m:
        return None
    d = m.groupdict()
    try:
        ts = datetime.fromisoformat(d["timestamp"])
    except Exception:
        ts = datetime.now()
    return {
        "timestamp": ts.isoformat(),
        "level": d["level"],
        "src": d["src"],
        "message": d["msg"].strip()
    }

def load_logs(path):
    rows = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            parsed = parse_log_line(line)
            if parsed:
                rows.append(parsed)
    return pd.DataFrame(rows)
