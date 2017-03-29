<template>
<div id = "app"> 
  <router-view></router-view>
</div>

</template>
<script>
  import Home from './components/Home'
  export default {
    components: { 'home': Home }
  }
</script>
