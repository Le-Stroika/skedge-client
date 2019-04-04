from bs4 import BeautifulSoup
import re
import json

def getNewCourseObj():
    obj={
        'code':'',
        'name':'',
        'lec':[],
        'day':[],
        'start':[],
        'end':[],
        'room':[],
        'prof':[],
    }
    return obj
def validateCourse(obj):
    return  (len(obj['lec']) == 
            len(obj['day']) ==
            len(obj['start']) ==
            len(obj['end']) ==
            len(obj['room']) ==
            len(obj['prof']) and
            len(obj['code'])>0)

f = open('./output/lotsofhtml.txt', 'r')
content = f.read()
f.close()

soup = BeautifulSoup(content, 'html.parser')
allRows = soup.select('table.tb_border_tb tr')
# start parsing now :'(
res=[]
obj=None
for row in allRows:

    # case 1: Row is header, contains course Name, Code. 1 per course
    if len(row.select('td > b')) == 1:
        # check if this is not the first header
        if obj != None:
            if len(obj) > 0:
                if validateCourse(obj): res.append(obj)
        # get course name and code
        obj = getNewCourseObj()

        temp = row.select('td > b')[0]
        lis = temp.text.split('-')
        obj['code']=lis[0]
        obj['name']=lis[1]
        # print(obj)
    
    # case 2: Row is enrollment Controll: skip. 1 per course
    # case 3: Row is information: skip. 1 per course
    elif len(row.select('td > div')) == 1:
        continue
    
    # case 4: Row is header row: skip. 1 per course
    elif 'Meeting Section' in row.select('td')[0]:
        # print(row.select('td'));print('\n')
        continue

    # case 5: Row is data row: ....   many per course
    elif len(row.select('td')[1]) > 0:
        # we gucci, get bare data and add into obj
        # print(obj)
        datas=row.select('td')
        # check if course even has times
        if datas[1].text == '' and datas[2].text == '':
            continue
        # check if lecture blank indicating multiple times for that lecture section
        if datas[0].text=='':
            obj['lec'].append(obj['lec'][len(obj['lec'])-1])
        else:
            obj['lec'].append(datas[0].text)
        
        obj['day'].append(datas[1].text)
        obj['start'].append(datas[2].text)
        obj['end'].append(datas[3].text)
        obj['room'].append(re.sub(r'\W+', '', datas[4].text))
        obj['prof'].append(datas[5].text)
    else:
        obj=getNewCourseObj()
    i=0

for i in res:
    print (i);print('\n')

f = open('./output/courses.json', 'w+')
# f.write(res)
json.dump(res, f, indent=4, separators=(',', ':'))
f.close()