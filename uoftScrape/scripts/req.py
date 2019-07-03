import requests

API_ENDPOINT = "https://www.utsc.utoronto.ca/regoffice/timetable/timetable.php"

data = {
    "sess": "summer",
    "course": "DISPLAY_ALL",
    "submit": "Display by Discipline",
    "course": "",
}

r = requests.post(url=API_ENDPOINT, data=data)
f = open("lotsofhtml.txt", "w+")
f.write(r.text)
f.close()
