# # import requests
# # from bs4 import BeautifulSoup
# # from datetime import datetime
# # import shelve
# # from flask import Flask, render_template, jsonify
# # from threading import Thread
# # import time
# # from plyer import notification

# # app = Flask(__name__)

# # # Function to scrape and save contests
# # def scrapeSave(contests, shelfFile):
# #     """Scrapes contest data from the table and saves it to the shelve file."""
# #     try:
# #         savedEntries = shelfFile['future']
# #     except KeyError:
# #         savedEntries = []

# #     newEntries = []
# #     for tr in contests.children:
# #         if tr == '\n':
# #             continue
# #         temp = []
# #         if tr.td != None and savedEntries != [] and shelfFile.get(str(tr.td.getText().strip()), 0) != 0 and shelfFile[str(tr.td.getText().strip())][0] == 1:
# #             continue

# #         i = 1
# #         for td in tr.children:
# #             if td != '\n' and td.name == 'td':
# #                 if i == 1:
# #                     shelfFile[str(td.getText().strip())] = [1, 0]
# #                 if i <= 2:
# #                     temp.append(str(td.getText().strip()))
# #                 else:
# #                     temp.append(datetime.strptime(td.getText().strip(), "%Y-%m-%d %H:%M:%S"))
# #                 i += 1
# #         if temp != []:
# #             newEntries.append(temp)

# #     shelfFile['future'] = newEntries + savedEntries
# #     return newEntries

# # # Function to fetch ongoing contests
# # def onGoing(shelfFile):
# #     """Returns a list of contests currently in progress."""
# #     contests = shelfFile['future']
# #     now = datetime.now()
# #     ongoing_contests = []
# #     for contest in contests:
# #         if shelfFile[contest[0]][1] == 1:
# #             continue
# #         start = contest[2]
# #         end = contest[3]
# #         if now >= start and now <= end:
# #             ongoing_contests.append(contest)
# #     return ongoing_contests

# # # Function to send notifications
# # def notify(present, callType, shelfFile):
# #     """Sends notifications for ongoing or new contests."""
# #     if present != []:
# #         if callType == 'ongoing':
# #             title = "Ongoing contest on CodeChef"
# #         else:
# #             title = "New contest added on CodeChef"

# #         for contest in present:
# #             msg = ""
# #             if callType == 'ongoing':
# #                 shelfFile[contest[0]] = [1, 1]
# #             msg += f"Code: {contest[0]}\n"
# #             msg += f"Name: {contest[1]}\n"
# #             msg += f"Starts on: {contest[2].strftime('%d %B, %Y')}\n"
# #             msg += f"Ends on: {contest[3].strftime('%d %B, %Y')}\n\n"
            
# #             notification.notify(
# #                 title=title,
# #                 message=msg,
# #                 timeout=10  # Timeout for the notification
# #             )

# # # Function to delete old contests
# # def delOldContests(shelfFile):
# #     """Deletes contests that have ended."""
# #     try:
# #         contests = shelfFile['future']
# #     except KeyError:
# #         return

# #     relevantContests = []
# #     now = datetime.now()
# #     for contest in contests:
# #         if contest[3] < now:
# #             del shelfFile[contest[0]]
# #         else:
# #             relevantContests.append(contest)
# #     shelfFile['future'] = relevantContests

# # # Background thread to handle scraping and notifications
# # def background_scraping():
# #     while True:
# #         shelfFile = shelve.open('contests')
# #         delOldContests(shelfFile)

# #         try:
# #             page = requests.get("https://www.codechef.com/contests")
# #             soup = BeautifulSoup(page.text, "html.parser")
# #             contests = soup.select('.table-questions')[0].table
# #             new = scrapeSave(contests, shelfFile)
# #             notify(new, 'new', shelfFile)
# #         except Exception as e:
# #             print(f"Error: {e}")

# #         if shelfFile:
# #             present = onGoing(shelfFile)
# #             notify(present, 'ongoing', shelfFile)

# #         shelfFile.close()
# #         time.sleep(216000)  # Scrape every 60 hours (can be adjusted)

# # # Route to display contests in the web interface
# # @app.route('/')
# # def home():
# #     shelfFile = shelve.open('contests')
# #     contests = shelfFile.get('future', [])
# #     shelfFile.close()
# #     return render_template('index.html', contests=contests)

# # # Route to fetch contests via API
# # @app.route('/api/contests', methods=['GET'])
# # def api_contests():
# #     shelfFile = shelve.open('contests')
# #     contests = shelfFile.get('future', [])
# #     shelfFile.close()
# #     return jsonify(contests)

# # if __name__ == '__main__':
# #     # Start the scraping in the background when the app starts
# #     thread = Thread(target=background_scraping)
# #     thread.daemon = True  # Allow the thread to exit when the main program ends
# #     thread.start()

# #     # Run the Flask app
# #     app.run(debug=True, use_reloader=False)
# from flask import Flask, jsonify
# import requests
# from bs4 import BeautifulSoup

# app = Flask(__name__)

# def fetch_codechef_contests():
#     url = "https://www.codechef.com/contests"
#     headers = {
#         "User-Agent": "Mozilla/5.0"
#     }

#     try:
#         response = requests.get(url, headers=headers)
#         response.raise_for_status()
#         soup = BeautifulSoup(response.text, "html.parser")

#         contests = []
#         contest_table = soup.find("div", class_="_table__container_7s2sw_344")
#         if contest_table:
#             rows = contest_table.find_all("div", class_="_flex__container_7s2sw_528")

#             for row in rows:
#                 name_tag = row.find("a")
#                 if name_tag:
#                     name = name_tag.text.strip()
#                     link = name_tag["href"]
#                     time_data = row.find("div", class_="_timer__container_7s2sw_590")

#                     if time_data:
#                         time_parts = time_data.find_all("p")
#                         starts_in = " ".join([part.text for part in time_parts])
#                     else:
#                         starts_in = "Unknown"

#                     contests.append({
#                         "name": name,
#                         "link": "https://www.codechef.com" + link,
#                         "starts_in": starts_in
#                     })
#         return contests

#     except requests.exceptions.RequestException as e:
#         return {"error": str(e)}

# @app.route('/contests/codechef', methods=['GET'])
# def get_codechef_contests():
#     contests = fetch_codechef_contests()
#     return jsonify({"contests": contests})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5002, debug=True)
from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

CODECHEF_URL = "https://www.codechef.com/contests"

def scrape_codechef_contests():
    response = requests.get(CODECHEF_URL)
    if response.status_code != 200:
        return {"error": "Failed to fetch data"}
    
    soup = BeautifulSoup(response.text, "html.parser")
    upcoming_contests_table = soup.find("table", class_="dataTable")
    
    if not upcoming_contests_table:
        return {"error": "No upcoming contests found"}
    
    contests = []
    rows = upcoming_contests_table.find_all("tr")[1:]
    
    for row in rows:
        cols = row.find_all("td")
        if len(cols) < 4:
            continue
        
        contest = {
            "name": cols[1].text.strip(),
            "code": cols[0].text.strip(),
            "start_time": cols[2].text.strip(),
            "end_time": cols[3].text.strip(),
            "link": f"https://www.codechef.com/{cols[0].text.strip()}"
        }
        contests.append(contest)    
    return contests

@app.route("/contests/codechef", methods=["GET"])
def get_codechef_contests():
    contests = scrape_codechef_contests()
    return jsonify({"upcoming_contests": contests})
if __name__ == "__main__":
     app.run(host='0.0.0.0', port=5002, debug=True)
