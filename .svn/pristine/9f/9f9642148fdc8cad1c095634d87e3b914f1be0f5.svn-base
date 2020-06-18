<template>
  <div class="systemTool" >
      <ul class="toolItem">
          <li class="symbol" @click="elementMax"><svg class="icon" aria-hidden="true"><use xlink:href="#max"></use></svg></li>
      </ul>
     <el-dropdown trigger="click" class="toolItem"  @command="handleCommand">
       <span class="el-dropdown-link x-badge">
         <li class="symbol"><svg class="icon" aria-hidden="true"><use xlink:href="#flag"></use></svg></li>
         <i class="el-icon-caret-bottom el-icon--right"></i>
       </span>
       <el-dropdown-menu slot="dropdown">
           <el-dropdown-item class="clearfix" command="cn">
           中文
         </el-dropdown-item>

         <el-dropdown-item class="clearfix" command="en">
           English
         </el-dropdown-item >
         <el-dropdown-item class="clearfix" command="ja">
            日本語
         </el-dropdown-item>
         <el-dropdown-item class="clearfix" command="ko">
            韓国語
         </el-dropdown-item>
         <el-dropdown-item class="clearfix" command="ru">
            корейский язык
         </el-dropdown-item>
       </el-dropdown-menu>
     </el-dropdown>
<!-- 
     <el-dropdown trigger="click" class="toolItem">
       <span class="el-dropdown-link">
         <el-badge :value="12" class="x-badge">
           <li class="symbol"><svg class="icon" aria-hidden="true"><use xlink:href="#messages"></use></svg></li>
         </el-badge>
         <i class="el-icon-caret-bottom el-icon--right"></i>
       </span>
       <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            评论
            <el-badge :value="12" />
          </el-dropdown-item>
          <el-dropdown-item >
            回复
            <el-badge :value="3" />
          </el-dropdown-item>
           <el-dropdown-item >
            系统通知
            <el-badge :value="8" />
          </el-dropdown-item>
       </el-dropdown-menu>
     </el-dropdown> -->
    <el-dropdown class="toolItem"  trigger="click" @command="themeChange">
      <span class="el-dropdown-link" >
         <li class="symbol"><svg class="icon" aria-hidden="true"><use xlink:href="#theme"></use></svg></li>
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item v-for="item in themeData" :key="item.id" :command="item.val">{{item.txt}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
     <!-- <ul class="toolItem">
        <li class="symbol"><svg class="icon" aria-hidden="true"><use xlink:href="#set"></use></svg></li>
     </ul> -->
  </div>
</template>

<script>
  import types from '@/store/mutation-types.js'
  import {mapGetters,mapState,mapActions} from 'vuex'
  export default{
    name:"SystemTool",
    data:function(){
      return {
          themeData:[
              {id:'theme01',val:'1',txt:'科技蓝'},
              {id:'theme02',val:'2',txt:'宝蓝色'},
              {id:'theme03',val:'3',txt:'墨绿色'},
              {id:'theme04',val:'4',txt:'神秘蓝'},
              {id:'theme05',val:'5',txt:'质感黑'},
              {id:'theme06',val:'6',txt:'蓝绿色'},
          ]
      }
    },
    computed: {
        ...mapGetters(['maxState']),
    },
    created(){
    },
    methods: {
      handleCommand:function(command){
         this.$i18n.locale = command;
      },
      mounted:function(){

      },
      themeChange(val){
        this.$store.commit(types.TABTHEME,`theme${val}`);
      },
      elementMax:function(){
        this.$store.commit(types.ELEMENTFULL,!this.maxState);
        this.$message({
          showClose:false,
          type:'success',
          message:'按ESC键退出全屏！',
          center:'center',
          customClass:'chenxuan'
        })
      }
    },
  }
</script>

<style>
  .systemTool{
    float: right;
    margin-right: 30px;
  }
  .systemTool .toolItem{
    float: left;
    height: 68px;
    line-height: 68px;
    margin: 0 10px;
    color: #fff;
    cursor: pointer;
   }
    .x-badge .el-badge__content.is-fixed{
      top: 15px;
    }
   .systemTool .toolItem .symbol{
     float: left;
     font-size: 30px;
     color: #fff;
   }
   .systemTool .toolItem .el-icon--right{
     margin-left: 0;
   }
   
</style>
