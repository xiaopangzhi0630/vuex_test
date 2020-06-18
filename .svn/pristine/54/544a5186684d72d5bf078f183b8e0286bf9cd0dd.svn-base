<template>

  <div>
    <el-dialog title='' :visible="dialogVisible" width="60%" :before-close="handleClose" center>

      <el-form :model="editChangeInfo" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-Row>
          <el-col :span="12" style="padding-left: 37px">
            <el-form-item label="机构编码" prop="orgCode">
              <el-input v-model="editChangeInfo.orgCode" style="width: 72%"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="机构名称" prop="orgName">
              <el-input v-model="editChangeInfo.orgName " style="width: 80%"></el-input>
            </el-form-item>
          </el-col>
        </el-Row>

        <el-Row>
          <el-col :span="12" style="padding-left: 37px">
            <el-form-item label="是否根机构" prop="orgRoot">
              <el-select v-model="editChangeInfo.orgRoot" placeholder="请选择">
                <el-option label="是" value="true"></el-option>
                <el-option label="否" value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级机构" prop="orgSuperiors" style="width: '50px'">
              <el-input v-model="editChangeInfo.orgSuperiors" style="width: 80%"></el-input>
            </el-form-item>
          </el-col>
        </el-Row>

        <el-Row>
          <el-col :span="12" style="padding-left: 37px">
            <el-form-item label="机构状态" prop="orgStatus">
              <el-select v-model="editChangeInfo.orgStatus" placeholder="请选择">
                <el-option label="正常" value="true"></el-option>
                <el-option label="失效" value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构负责人" prop="orgPrincipal">
              <el-input v-model="editChangeInfo.orgPrincipal" style="width: 80%"></el-input>
            </el-form-item>
          </el-col>
        </el-Row>

        <el-Row>
          <el-col :span="12">
            <el-form-item label="机构负责人联系方式" prop="orgPriTell" label-width="140">
              <el-input v-model="editChangeInfo.orgPriTell" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构联系方式" prop="orgTell">
              <el-input v-model="editChangeInfo.orgPhone" style="width: 80%"></el-input>
            </el-form-item>
          </el-col>
        </el-Row>

        <el-Row>
          <el-col style="padding-left: 37px">
            <el-form-item label="机构类型" prop="orgType">
              <el-select v-model="editChangeInfo.orgType" placeholder="请选择">
                <el-option label="实际机构" value="true"></el-option>
                <el-option label="虚拟机构" value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-Row>

        <el-Row style="padding: 0px 8% 0px 37px">
          <el-form-item label="机构地址" prop="orgAddress">
            <el-input v-model="editChangeInfo.orgAddress"></el-input>
          </el-form-item>
        </el-Row>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="saveHandle">保 存</el-button>
        <el-button type="primary" @click="resetHandle">重 置</el-button>
      </span>
    </el-dialog>

  </div>

</template>


<script>
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex'

  export default {
    // name: 'Dialog',
    data() {

      return {

        // ruleForm: {
        //   orgCode: '', //机构编码
        //   orgName: '', // 机构名称
        //   orgStatus: '', // 机构状态
        //   orgRoot: '', // 是否跟机构
        //   orgType: '', // 机构类型
        //   orgPhone: '', // 机构电话
        //   orgAddress: '', // 机构地址
        //   orgPriTell: '', //负责人电话
        //   orgSuperiors: '', // 上级机构
        //   orgPrincipal: ' ' //机构负责人
        // }
      };
    },

    computed: {
      // ...mapGetters(['fullHeight']),
      ...mapGetters('systemManage', ['dialogVisible', 'editChangeInfo', 'btnType']),
    },


    watch: {
      // ruleForm: function (val, oldVal) {
      //   console.log(val);
      //   console.log(oldVal);

      // }
      btnType: function (val) {
        console.log('type', val);
        if (val == 'edit') {
          console.log(this.editChangeInfo);
          console.log('rule', this.ruleForm);
          this.ruleForm = this.editChangeInfo
        }

      }
    },

    mounted: function () {
      // console.log(this.btnType);

    },


    methods: {

      handleClose(done) {
        this.$store.commit('systemManage/setDialogVisible', false);
        done();
        // this.$confirm('确认关闭?')
        //   .then(_ => {})
        //   .catch(_ => {});
        // 清空form
        this.$store.commit('systemManage/setEditChangeInfo', {})
      },

      // 保存
      saveHandle: function () {
        this.$store.commit('systemManage/setDialogVisible', false);


        console.log(this.editChangeInfo);
      },

      // 确定
      resetHandle: function () {
        // this.$store.commit('systemManage/setDialogVisible', false);
        this.$store.commit('systemManage/setEditChangeInfo', {})
        // this.ruleForm = {
        //   orgCode: '', //机构编码
        //   orgName: '', // 机构名称
        //   orgStatus: '', // 机构状态
        //   orgRoot: '', // 是否跟机构
        //   orgType: '', // 机构类型
        //   orgPhone: '', // 机构电话
        //   orgAddress: '', // 机构地址
        //   orgPriTell: '', //负责人电话
        //   orgSuperiors: '', // 上级机构
        //   orgPrincipal: ' ' //机构负责人
        // }
      }

    },


  }

</script>>



<style scoped>
  /* .el-input {
    width: 220px;
  } */


  /* .el-form-item__label {
    width: 140px !important;
  } */

</style>
