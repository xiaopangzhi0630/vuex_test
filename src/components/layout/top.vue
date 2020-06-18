<template>
  <div class="top"  ref="top">
    <Switches></Switches>
    <UserControl></UserControl>
    <systemTool></systemTool>
    <a href="http://localhost:8099/gate" class="homePage">
        <svg class="icon" aria-hidden="true"><use xlink:href="#index"></use></svg>
    </a>
    <!-- <div class="fastLinks" v-for="(v,index) in ModuleList" :key="index">
         <a :href="v.href" :class="{active:active==index}">{{$t(v.name)}}</a>
    </div> -->
  </div>
</template>
<script>
  import types from '@/store/mutation-types.js'
  import {mapGetters,mapState,mapActions} from 'vuex'
  import Switches from './switches'
  import UserControl from './userControl'
  import SystemTool  from './systemTool'
  export default {
      name:'Aside',
      data:function(){
        return {
          active:0,
          ModuleList:[
          {'name':'message.m1','href':'http://localhost:8081'},
          {'name':'message.m2','href':'http://localhost:8082'},
          {'name':'message.m3','href':'http://localhost:8083'},
          // {'name':'lang.m4','href':'http://localhost:8084'},
          // {'name':'lang.m5','href':'http://localhost:8085'},
          // {'name':'lang.m6','href':'http://localhost:8086'}
          ]
        }
      },
      components:{
        Switches,
        UserControl,
        SystemTool,
      },
      computed: {
          ...mapGetters(['navTop']),
      },
      mounted:function(){
        this.$store.commit(types.GETTOPEL,this.$refs.top);
      }

  }
</script>
