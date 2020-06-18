<template>
  <el-dialog :visible.sync="dialogFormVisible" :fullscreen="fullFlag" :before-close="handleClose">
    <template slot="title">
      <slot name="title"></slot>
        <span class="dialog-full-screen">
          <i v-if="!fullFlag" class="el-icon-full-screen" @click="fullFlag=!fullFlag"></i>
          <i v-if="fullFlag" class="el-icon-aim" @click="fullFlag=!fullFlag"></i>
        </span>
    </template>
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "DialogMain",
        props:{
            dialogFormVisible:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                fullFlag:false
            }
        },
        methods:{
            handleClose(done){
                this.$emit('dialog-close');
            }
        },
    }
</script>

<style scoped>
  .el-icon-full-screen:hover,.el-icon-aim:hover{
    cursor:pointer;
    color:#409eff;
  }
  .dialog-full-screen{
    position: absolute;
    top: 20px;
    right: 50px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    font-size: 16px;
  }
</style>
