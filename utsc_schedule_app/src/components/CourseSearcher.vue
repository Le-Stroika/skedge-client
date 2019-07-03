<template>
<body>

	<div class="container-fluid">
		<div class="row content">
			
			<!-- Start SideNav -->
			
			<div class="col-sm-12 sidenav">
				<h4>Find Course</h4>

				<!-- start seach input field -->

				<div class="" style="display:inline-block; max-width:50%">
					<input 	id ="course-search-bar"
									type="search"
									class="form-control"
									placeholder="Search Courses.."
									list='lis' style="width:200%;"
									v-model="courseField">
					<datalist id='lis'>
						<option v-for="course in courses"
										v-bind:key="course.code"
										:label=course.code+course.name
										:value=course.code.trim()>
						</option>
					</datalist>
				</div> <!-- End search inputField -->

				<button v-on:click='addCourse'>test a ting</button>
				<!-- adds/removes extra section when valid course is in textbox -->

				<div v-if="inputField.length==9" class="courseInfo">
					<p name="LectureNum">Pick a Lecture</p>
					<input v-for="i in courseMap[inputField].lec.length" :key=i type=radio name="LectureNum" :value="i">
					{{inputField}}
				</div>

			</div> <!-- End SideNav -->
			
		</div>
	</div>

</body>

</template>

<script>
import json from '../assets/courses.json'

export default {
  name: 'CourseSearcher',
  props: {
    msg: String
	},
	// initialCourses: json,
  data: function(){
	  return{
			courses: json,
			inputField: '',
		} 
	},

	created(){
		this.inputHasValidCourse = false;
		this.courseMap = this.createCourseMap()
		this.courseCodeLength=9; // i.e. CSCA48H3Y --> 9 characters
		console.log(this.courseMap)
	},

	computed:{

		courseField:{
			get(){
				console.log('entered')
				if (this.inputField.length == 9){
					// open extra options to add course yeet
					console.log('congrats bud')
				}else{
					// close modal thingy?
				}
				return this.inputField;
			},
			set(newValue){
				this.inputField=newValue;
			}
    },

	},

  methods: {
		/** creates a map of the course codes and their course Json objects */
		createCourseMap(){
			var mapp = {}
			for(let i=0; i<this.courses.length; i++){
				mapp[this.courses[i].code.trim()] = JSON.parse(JSON.stringify(this.courses[i]))
			}
			return mapp
		},
		test(){
			return 'yayeet'
		},
		addCourse(){
			// use form info to send the right lec numbers and tutorial numbers
			this.$emit('testbroadcast', this.courseMap[this.inputField], "LEC01", "TUT0001")
			//todo: un-hardcode the lec and tut
		}

	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
	
}
h5 {
  color: #162137;
  font-weight: 700;
  
}
.row.content {
	height: auto;
	padding-bottom: 25%;
}
.sidenav {
    background-color: #f1f1f1;
    height: 100%;
		padding-top: 20px;
}

@media screen and (max-width: 767px) {
      .sidenav {
        height: auto;
        padding: 15px;
      }
      .row.content {height: auto;} 
}
#course-search-bar{
	width: 100%;
}
option{
	white-space: initial;
}
</style>
