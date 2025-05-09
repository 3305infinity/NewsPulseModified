from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import re

app = Flask(__name__)

ATCODER_URL = "https://atcoder.jp/contests/"

def fetch_upcoming_atcoder_contests():
    response = requests.get(ATCODER_URL)
    if response.status_code != 200:
        return []
    
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Find the 'Upcoming Contests' section (located in a separate <div>)
    upcoming_section = soup.find("div", id="contest-table-upcoming")
    if not upcoming_section:
        return []
    
    contest_table = upcoming_section.find("table")
    if not contest_table:
        return []

    contests = []
    
    for row in contest_table.find_all("tr")[1:]:  # Skip header row
        cols = row.find_all("td")
        if len(cols) < 4:
            continue

        # Clean contest name
        contest_name = cols[1].text.strip()
        contest_name = re.sub(r"[\u24bd\u25c9]", "", contest_name).strip()  # Remove unwanted symbols
        contest_link = "https://atcoder.jp" + cols[1].find("a")["href"]
        
        # Parse and convert start time
        start_time_jst = cols[0].text.strip()
        start_time_jst = datetime.strptime(start_time_jst, "%Y-%m-%d %H:%M:%S%z")
        start_time_utc = start_time_jst.astimezone(tz=None).isoformat()  # Convert to UTC
        
        # Format duration properly
        duration_raw = cols[2].text.strip()
        duration_parts = duration_raw.split(":")
        duration_hours = int(duration_parts[0])
        duration_minutes = int(duration_parts[1])
        formatted_duration = f"{duration_hours} hrs {duration_minutes} mins"

        contests.append({
            "platform": "AtCoder",
            "name": contest_name,
            "url": contest_link,
            "start_time": start_time_utc,  # ISO format (UTC)
            "duration": formatted_duration
        })

    return contests

@app.route("/contests/atcoder", methods=["GET"])
def get_atcoder_contests():
    contests = fetch_upcoming_atcoder_contests()
    return jsonify(contests)

if __name__ == "__main__":
    app.run(port=5003, debug=True)
