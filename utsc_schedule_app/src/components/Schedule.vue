<template>
<main>
    <div>
        <section id="mainTing" class="container-fluid">
            <div>
            <!-- Grid Layout for date headers below... -->
            <grid-layout
            :layout.sync="HeadLayout"
            :col-num="12"
            :static="true"
            :row-height="30"
            :is-draggable="false"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[5, 5]"
            :use-css-transforms="true"
            >

        <grid-item v-for="item in HeadLayout" v-bind:key="item.uniq"
                   :x="item.x"
                   :y="item.y"
                   :minW='2'
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            {{item.i}}
        </grid-item>
    </grid-layout>
    <!-- Grid Layout for All times below: -->
    <grid-layout
            :layout.sync="TimesLayout"
            :col-num="12"
            :static="true"
            :row-height="30"
            :is-draggable="false"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[5, 5]"
            :use-css-transforms="true"
            >

        <grid-item v-for="item in TimesLayout" v-bind:key="item.uniq"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            {{item.i}}
        </grid-item>
    </grid-layout>

            </div>
        </section>
        <!-- Courses somehow gotta fit. how tf we doin this -->
    </div>
</main>
</template>

<script>
var calLayout = [];
import Vue from 'vue';
import json from '../assets/courses.json'
export default {
    name: 'Schedule',
    props: {
        msg: String,
        courseAdd: {},
    },

    data(){
        return{
            
            HeadLayout: [],
            TimesLayout: [],
            days: [],
            courses: json,
            addedCourses: [],
            addedCourseNames: [],
        }
    },

    created(){
        // initializing static data
        this.days = ['','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        this.smdays = ['','Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    },

    mounted(){
        this.HeadLayout = this.genEmptyCalendar()
        this.TimesLayout = this.genTimeSlots()
        // for (let ting of JSON.parse(JSON.stringify(this.TimesLayout))){
        //     console.log(ting.uniq)
        // }
        this.timeToRowPosition  =
            {
                '8:00 AM': 0*6,
                '8:30 AM': 1*6,
                '9:00 AM': 2*6,
                '9:30 AM': 3*6,
                '10:00 AM': 4*6,
                '10:30 AM': 5*6,
                '11:00 AM': 6*6,
                '11:30 AM': 7*6,
                '12:00 PM': 8*6,
                '12:30 PM': 9*6,
                '1:00 PM': 10*6,
                '1:30 PM': 11*6,
                '2:00 PM': 12*6,
                '2:30 PM': 13*6,
                '3:00 PM': 14*6,
                '3:30 PM': 15*6,
                '4:00 PM': 16*6,
                '4:30 PM': 17*6,
                '5:00 PM': 18*6,
                '5:30 PM': 19*6,
                '6:00 PM': 20*6,
                '6:30 PM': 21*6,
                '7:00 PM': 22*6,
                '7:30 PM': 23*6,
                '8:00 PM': 24*6,
                '8:30 PM': 25*6,
                '9:00 PM': 26*6,
                '9:30 PM': 27*6,
            }
        this.dayToColumn = 
        {
            "MO":1,
            "TU":2,
            "WE":3,
            "TH":4,
            "FR":5,
        }
    },

    watch: {
        courseAdd: function(oldval, newval){
            if (! (newval.code in this.addedCourseNames)){
                this.addedCourseNames.push(oldval.code)
                this.addedCourses.push(JSON.parse(JSON.stringify(oldval)))
                this.insertCourse(JSON.parse(JSON.stringify(oldval)))
            }
            // check values to perhaps remove course
            console.log(JSON.parse(JSON.stringify(this.addedCourses)))
            this.$forceUpdate()
        }

        
    },

    methods: {
        /** generates weekly schedule dates header */
        genEmptyCalendar: function(){
            // initial empty space is to give space for times
            var res = []
            for (var i=0; i<this.days.length; i++){
                let cell = {}
                cell.x = i*2
                cell.y = 0
                cell.h = 1
                cell.w = 2
                cell.i = this.days[i];

                res.push(cell);
            }
            // ADD in empty cells for times nshit
            return res;
        },

        /** TODO: FIX FUNCTION FOR INSERTING COURSE INTO SCHEDULE */
        insertCourse: function(courseData){
            console.log('coursedata', courseData)
            /* determine timeslots */
            // use lecIndex and tutIndex to determine which dates/times to use
            var lecIndexes = [];
            var tutIndexes = [];
            for (let i=0; i<courseData.lec.length; i++){
                if (courseData.lec[i] == courseData.tutorialCode){
                    tutIndexes.push(i)
                }
                else if (courseData.lec[i] == courseData.lectureCode){
                    lecIndexes.push(i)
                }
            }
            for (let i of lecIndexes){
                let cellIndex = this.timeToRowPosition[courseData.start[i].trim()+' PM'];
                cellIndex = cellIndex + this.dayToColumn[courseData.day[i]];
                Vue.set(this.TimesLayout[cellIndex],'i', 'looky looky here bitch')
                // todo: make text gen function for course info
                // tood: get the times consistent..
                //after filling cell with text, fill other cells below by using end time.
            }
        },

        /** generates empty weekly timetable */
        genTimeSlots: function(){
            var times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
            '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
            '7:00 PM', '8:00 PM', '9:00 PM']
            var res =[]
            let k=0; let half=true;
            for (let i=0;i<times.length*2;i++){
                // every other i will be the half hour increment
                if (i%2 == 0 && i>0){ k++;}
                half=!half
                // console.log(i); console.log(half)
                let cell = {}
                cell.x = 0
                cell.y = 1+i
                cell.h = 1
                cell.w = 2
                cell.i = times[k];
                if (half){
                    cell.i=''
                }
                cell.uniq = (i%2 == 1 && i>0) ? times[k].replace('00', '30') : times[k];
                cell.innerText=''
                res.push(cell)
                // now make empty row
                for (let j=0; j<5; j++){
                    let rowCell = {};
                    rowCell.x = 2+j*2
                    rowCell.y = cell.y
                    rowCell.h = 1
                    rowCell.w = 2
                    rowCell.i = ''; //for now... this is where course info finna go
                    rowCell.uniq = cell.uniq+' '+this.days[j+1];
                    // this uniq field will be used to determine day/time, looks like '9:30 PM Monday'
                    res.push(rowCell)
                }
                // do over for
            }
            console.log(res)
            return res;
        },

        testbroadcast(data){
            console.log(data)
        },
    },

}
</script>

<style scoped>
body, html {
    background-color:darkslateblue;
}
#mainTing{
    width:100%;
    background-color:#f1f1f1;
}
#week-head div, .center{
    justify-content: center;
    text-align: center;
}
.vue-grid-item{
    /* border-left: 1px solid rgba(174, 163, 241, 0.5); */
    border-right: 1px solid #f1f1f1;
    background-color: #f8f9fa;
}
.vue-grid-item:nth-child(6n){
    border:unset;
}

.vue-grid-item:nth-child(12n+7){
    /* background-color: unset; */
}
</style>