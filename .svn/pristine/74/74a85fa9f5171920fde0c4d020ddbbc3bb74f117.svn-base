<template>
  <li class="switches"  @click="switches" ref='switches'>
    <svg class="icon" aria-hidden="true"><use xlink:href="#switch"></use></svg>
  </li>
</template>

<script>
  import types from '@/store/mutation-types.js'
  import {mapGetters,mapState,mapActions} from 'vuex'
  export  default{
    name:'Switches',
    computed: {
       ...mapGetters(['asideEl','asideState','mainContainerEl','topEl','logoSymbolEl','logoTextEl','itemContentEl','asideElarr']),
    },
    mounted:function(){
      // console.log(this.asideEl);
      // console.log(this.mainContainerEl);
      // console.log(this.asideState);
      this.$store.commit(types.GETSWITCHESEL,this.$refs.switches);
    },
    methods:{
      switches:function(){
        
        if(this.asideState){
          this.open()
        }
        else{
          this.close()
        }
        this.$store.commit(types.SETASIDESTATE,!this.asideState);
      },
      open:function(){
        this.$refs.switches.style.transform='rotate(180deg)';
        this.asideEl.style.width='60px';
        this.itemContentEl.find((value,index,arr)=>{
            value.style.display='none';
        });
        this.asideElarr.menuTitle.find((value,index,arr)=>{
           value.style.width='0';
        });
        this.asideElarr.menuArrow.find((value,index,arr)=>{
           value.style.width='0';
        })
        this.mainContainerEl.style.paddingLeft='72px';
        this.topEl.style.paddingLeft='72px'
      },
      close:function(){
        this.$refs.switches.style.transform='rotate(0deg)';
        this.asideEl.style.width='250px';
        this.itemContentEl.find((value,index,arr)=>{
            value.style.display='block';
        });
        this.asideElarr.menuTitle.find((value,index,arr)=>{
           value.style.width='130px';
        });
         this.asideElarr.menuArrow.find((value,index,arr)=>{
           value.style.width='20px';
        })
        this.mainContainerEl.style.paddingLeft='262px';
        this.topEl.style.paddingLeft='262px';
      }
    }
  }
</script>

<style>

</style>
