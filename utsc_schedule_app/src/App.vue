<template>
  <div id="app">


    <HeaderBoi msg="scheduler from the future"/>
    
    <section class="container-fluid" style="background-color:darkslateblue;">
      <div class=row>
        <div class="col-lg-3">
          <CourseSearcher v-on:testbroadcast="scopeCourse" msg=''/>
        </div>
        <div class="col-lg-9">
          <Schedule msg="uh" :courseAdd="scopedCourse"/>
          
        </div>
      </div>
    </section>

    <footer class="container-fluid">
      <p>Made by some dude</p>
    </footer>

  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

import json from './assets/courses.json'
import HeaderBoi from './components/page-defaults/HeaderBoi.vue'
import CourseSearcher from './components/CourseSearcher.vue'
import Schedule from './components/Schedule.vue'

export default {
  name: 'app',
  components: {
    // npm components
    VueGridLayout,
    // local components
    HeaderBoi,
    CourseSearcher,
    Schedule,
  },
  data (){
    return{
      courses: json,
      defmsg: 'yote',
      scopedCourse: {}, // this will be used to transfer single course JSONs between components
    }
  },
  methods: {
    scopeCourse(data, lecIndex, tutIndex){
      this.scopedCourse=data;
      console.log(lecIndex + ' ' + tutIndex)
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:400');
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:700');

#app {
  font-family: 'Nanum Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #162137;
  
}
body, html{
  margin: 0;
  padding: 0;
  background-color:darkslateblue;
}
footer {
  background-color: #555;
  color: white;
  padding: 15px;
  width:100%;
}

</style>
