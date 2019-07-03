<template>
  <div class="headbar">
    <img src="http://utsc.utoronto.ca/~registrar/email/images/utscbanner.png">
    <h1 class="stretch">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HeaderBoi',
  props: {
    msg: String
  }
}
</script>

<!-- Added "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.headbar{
  padding: 10px 0 10px 0;
  margin: 0;
  background-color:darkslateblue;
  width: 100%;
  letter-spacing: 0.5em;
}
.headbar h1{
  font-size: 5em;
  color: #f1f1f1;
}
img{
  max-width: 10%;
  max-height: 10%;
}

</style>
