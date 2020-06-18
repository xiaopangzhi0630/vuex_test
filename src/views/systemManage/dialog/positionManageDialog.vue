<template>
  <div>
    <el-dialog
      :title="title"
      width="880px"
      :visible="dialogFormVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form :model="lineData" class="clearfix" label-width="140px" :rules="rules" ref="ruleForm">
        <div class="formBlock">
          <el-form-item label="职位编码" prop="posCode">
            <el-input v-model="lineData.posCode" autocomplete="off" placeholder="请输入职位编码"></el-input>
          </el-form-item>
          <el-form-item label="职位名称">
            <el-input v-model="lineData.posName" autocomplete="off" placeholder="请输入职位名称"></el-input>
          </el-form-item>
          <el-form-item label="职位状态">
            <el-select v-model="lineData.status" placeholder="请选择">
              <el-option
                v-for="item in statusOption"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位所属机构">
            <el-input v-model="orgCode" autocomplete="off" placeholder="请输入职位所属机构"></el-input>
          </el-form-item>
          <el-form-item label="职位类型">
            <el-select v-model="lineData.posType" placeholder="请选择">
              <el-option
                v-for="item in typeOption"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" class="wholeLine">
            <el-input type="textarea" v-model="lineData.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Dialog",
  data: function() {
    var validPosCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("职位编码不能为空"));
      } else {
        callback();
      }
    };
    return {
      formEmpty: false, //true 表单非空，关闭时将进行提示 | false  表单为空，可直接关闭
      formLabelWidth: "120px",
      statusOption: [{ code: null, name: null }],
      typeOption: [{ code: null, name: null }],
      //职位所属机构
      orgCode: "001",
      rules: {
        posCode: [{ validator: validPosCode, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["fullHeight"]),
    ...mapGetters("systemManage", [
      "dialogFormVisible",
      "lineData",
      "dialogStatus",
      "currentPage",
      "pageSize",
      "title"
    ])
  },
  mounted: function() {
    this.queryStatus();
  },
  methods: {
    //查询状态、职位类型
    queryStatus: function() {
      this.$axios.get(process.env.API_HOST + "/posInfo/dropdown").then(res => {
        // 状态
        this.statusOption = [];
        let resDataStatus = res.data.data.status,
          that = this;
        resDataStatus.find((val, index, arr) => {
          let cellObj1 = {};
          cellObj1.code = val.code;
          cellObj1.name = val.name;
          that.statusOption.push(cellObj1);
        });
        //职位类型
        this.typeOption = [];
        let resDataType = res.data.data.type;
        resDataType.find((val, index, arr) => {
          let cellObj2 = {};
          cellObj2.code = val.code;
          cellObj2.name = val.name;
          that.typeOption.push(cellObj2);
        });
      });
    },
    submit: function(a) {
      //添加提交
      let that = this;
      if (this.dialogStatus == "add") {
        that.$refs[a].validate(valid => {
          that.lineData.orgCodes = [];
          that.lineData.orgCodes.push(that.orgCode);
          //表单校验合法
          if (valid) {
            that
              .$axios({
                url: process.env.API_HOST + `/posInfo/add`,
                method: "post",
                data: JSON.stringify(that.lineData)
              })
              .then(res => {
                console.log(res);
                this.$store.commit("systemManage/setDialogFormVisible", false);
                this.$store.commit("systemManage/setLineData", {});
                this.$message({
                  showClose: false,
                  type: "success",
                  message: "恭喜，添加成功！",
                  center: "true",
                  offset: this.fullHeight / 2
                });
                this.$parent.refeshLastpage();
              })
              .catch(err => {
                this.$message({
                  showClose: false,
                  type: "error",
                  message: "抱歉，添加失败！",
                  center: "true",
                  offset: this.fullHeight / 2
                });
              });
          }
          //表单校验不合法
          else {
            this.$message({
              showClose: false,
              type: "error",
              message: "表单填写不合法,请核对!",
              center: "true",
              offset: this.fullHeight / 2
            });
          }
        });
      }
      //编辑提交
      else if (this.dialogStatus == "edit") {
        let that = this;
        this.$axios({
          url:
            process.env.API_HOST +
            `/posInfo/update?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,
          method: "post",
          data: JSON.stringify(that.lineData)
        })
          .then(res => {
            this.$store.commit("systemManage/setDialogFormVisible", false);
            this.$store.commit("systemManage/setLineData", {});
            this.$message({
              showClose: false,
              type: "success",
              message: "修改成功！",
              center: "true",
              offset: this.fullHeight / 2
            });
          })
          .catch(err => {
            this.$message({
              showClose: false,
              type: "error",
              message: "操作失败！",
              center: "true",
              offset: this.fullHeight / 2
            });
          });
      }
    },
    cancel: function() {
      this.$store.commit("systemManage/setDialogFormVisible", false);
      this.$store.commit("systemManage/setLineData", {});
      this.$message({
        showClose: false,
        type: "success",
        message: "已取消编辑",
        center: "center",
        offset: this.fullHeight / 2
      });
    }
  }
};
</script>