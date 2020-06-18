<template>
  <div class="userControl">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        Admin<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="x-dropdown-item">
          <ul class="dropitem">
            <li><svg class="icon" aria-hidden="true"><use xlink:href="#user"></use></svg></li>
            <li>编辑资料</li>
          </ul>
        </el-dropdown-item>
        <el-dropdown-item class="x-dropdown-item">
          <ul class="dropitem">
            <li><svg class="icon" aria-hidden="true"><use xlink:href="#pwd"></use></svg></li>
            <li>修改密码</li>
          </ul>
        </el-dropdown-item >
        <el-dropdown-item class="x-dropdown-item">
           <ul class="dropitem">
            <li><svg class="icon" aria-hidden="true"><use xlink:href="#seting"></use></svg></li>
            <li>用户设置</li>
          </ul>
        </el-dropdown-item >
        <el-dropdown-item divided class="x-dropdown-item">
          <ul class="dropitem">
            <li><svg class="icon" aria-hidden="true"><use xlink:href="#logout"></use></svg></li>
            <li>退出登录</li>
          </ul>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="avator">
      <el-avatar :size="size" :src="url"></el-avatar>
    </div>
  </div>
</template>

<script>
  import types from '@/store/mutation-types.js'
  import {mapGetters,mapState,mapActions} from 'vuex'
  export default{
    name:"UserControl",
    data:function(){
      return{
        size:'medium',
        url:require("../../../static/avator.png"),
      }
    },
    computed: {

    },
  }
</script>

<style>

</style>
