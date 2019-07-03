from bs4 import BeautifulSoup
import re
import json


def getNewCourseObj():
    obj = {"code": "", "name": "", "lecs": {}, "tuts": {}, "pracs": {}}
    return obj


def getNewLectureObj():
    obj = {"days": [], "starts": [], "ends": [], "rooms": [], "prof": ""}
    return obj


def validateCourse(obj):
    validity = True
    if obj["code"] == "":
        validity = False
    if not validity:  # attempt lazy finish
        return validity
    for lec in obj["lecs"]:
        validity = validity and len(obj["lecs"][lec]["starts"]) == len(
            obj["lecs"][lec]["ends"]
        ) == len(obj["lecs"][lec]["days"]) == len(obj["lecs"][lec]["rooms"])
    if not validity:  # attempt lazy finish
        return validity
    for lec in obj["tuts"]:
        validity = validity and len(obj["tuts"][lec]["starts"]) == len(
            obj["tuts"][lec]["ends"]
        ) == len(obj["tuts"][lec]["days"]) == len(obj["tuts"][lec]["rooms"])
    if not validity:  # attempt lazy finish
        return validity
    for lec in obj["pracs"]:
        validity = validity and len(obj["pracs"][lec]["starts"]) == len(
            obj["pracs"][lec]["ends"]
        ) == len(obj["pracs"][lec]["days"]) == len(obj["pracs"][lec]["rooms"])

    return validity


f = open("./output/lotsofhtml.txt", "r")
content = f.read()
f.close()

soup = BeautifulSoup(content, "html.parser")
allRows = soup.select("table.tb_border_tb tr")
# start parsing now :'(
res = []
obj = None
for row in allRows:

    # case 1: Row is header, contains course Name & course Code. 1 per course
    # note: we use a header to signify that our previous scraped course is done
    # scraping, so we can validate that course object and move on
    if len(row.select("td > b")) == 1:
        # check if this is not the first header
        if obj != None:
            if len(obj) > 0:
                if validateCourse(obj):
                    res.append(obj)
        # get course name and code
        obj = getNewCourseObj()

        temp = row.select("td > b")[0]
        lis = temp.text.split("-")
        obj["code"] = lis[0]
        # in case the name had a - in its name, join rest of lis
        obj["name"] = "-".join(lis[1:])
        # print(obj)

    # case 2: Row is enrollment Controll: skip. 1 per course
    # case 3: Row is information: skip. 1 per course
    elif len(row.select("td > div")) == 1:
        continue

    # case 4: Row is header row: skip. 1 per course
    elif "Meeting Section" in row.select("td")[0]:
        # print(row.select('td'));print('\n')
        continue

    # case 5: Row is data row: ....   many per course
    elif len(row.select("td")[1]) > 0:
        # we gucci, get bare data and add into obj
        datas = row.select("td")
        # check if course even has times
        if datas[1].text == "" and datas[2].text == "":
            continue

        # if lecture is blank here, it indicates that the lecture session has
        # multiple dates
        if datas[0].text != "":
            lecture = datas[0].text
            if "LEC" in lecture:
                lectureType = "lecs"
            elif "LEC" in lecture:
                lectureType = "tuts"
            elif "LEC" in lecture:
                lectureType = "pracs"
            obj[lectureType][lecture] = getNewLectureObj()

        obj[lectureType][lecture]["days"].append(datas[1].text)
        obj[lectureType][lecture]["starts"].append(datas[2].text)
        obj[lectureType][lecture]["ends"].append(datas[3].text)
        obj[lectureType][lecture]["rooms"].append(re.sub(r"\W+", "", datas[4].text))
        obj[lectureType][lecture]["prof"] = datas[5].text
    else:
        obj = getNewCourseObj()
    i = 0

for i in res:
    print(i)
    print("\n")

f = open("./output/courses.json", "w+")
# f.write(res)
json.dump(res, f, indent=4, separators=(",", ":"))
f.close()
