# UTSC-Summer-Scheduler
Useful for when registrar has released summer courses but enrolment hasn't begun. (WIP)
## Dependencies
Python
- BeautifulSoup 4
JS
- Vue-grid-layout (https://github.com/jbaysolutions/vue-grid-layout)

##Usage
Run ```python3 uoftScrape/scripts/req.py```
* this gets the html from the registrars calendar, to be scraped
then ```python3 uoftScrape/scripts/filter.py ```
* this scrapes the html saved from the previous script, 
