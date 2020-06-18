<template>
    <div id="main" :class="theme">
       <Aside></Aside>
       <Top></Top>
       <div class="mainContainer" ref="mainContainer" :class="{mainContainerFull:maxState}" @mousemove="showMin($event)">
          <div class="inner">
                <router-view></router-view>
          </div>
       </div>
        <li class="minBtn" :class="{minBtnShow:minState}" @click="elementMin"><svg class="icon"  aria-hidden="true"><use xlink:href="#close"></use></svg></li>
    </div>
</template>
<script>
import types from '@/store/mutation-types.js'
import {mapGetters,mapState,mapActions} from 'vuex'
import Aside from '../components/layout/aside'
import Top from '../components/layout/top'
export default {
    name:'Main',
    components:{
        Aside,
        Top
    },
    data:function(){
      return{
        minState:false
      }
    },
    computed:{
    ...mapGetters(['maxState','theme'])
    },
    mounted:function(){
        let that=this;
        this.$store.commit(types.MAINCONTAINEREL,this.$refs.mainContainer);
        document.onkeydown = function(e){
            if(e.keyCode=='27'){
                that.elementMin();
            }
        }
    },
    methods:{
      showMin:function(e){
        if(this.maxState){
          if(e.offsetY==0){
            this.minState=true;
            setTimeout(() => {
              this.minState=false
            }, 1500);
          }
        }
      },
      elementMin:function(){
        this.$store.commit(types.ELEMENTMIN,false);
      }
    }
}
</script>
<style>
    @import '../public/css/layout.css';
</style>
