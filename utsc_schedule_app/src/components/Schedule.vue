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
    },

    watch: {
        courseAdd: function(oldval, newval){
            tempval  = newval
            if (! newval in addedCourses){
                addedCourses.append(newval)
            }
            console.log(addedCourses)
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

        /** given a course code, opens modal with course info, used to populate schedule */
        openCourse: function(code){
            for (let course of this.courses){
                if (course.code.trim()==code.trim()){
                    console.log('congrats bud')
                }
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
                
                res.push(cell)
                // now make empty rows
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
    background-color:rgba(174, 163, 241, 0.3);
}
#week-head div, .center{
    justify-content: center;
    text-align: center;
}
.vue-grid-item{
    /* border-left: 1px solid rgba(174, 163, 241, 0.5); */
    border-right: 1px solid rgba(174, 163, 241, 0.2);
}
.vue-grid-item:nth-child(6n){
    border:unset;
}
</style>