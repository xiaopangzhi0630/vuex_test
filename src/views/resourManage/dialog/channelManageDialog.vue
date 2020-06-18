<template>
  <div>
    <el-dialog
      :title="title"
      :show-close=false
      width="880px"
      :visible="dialogFormVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form :model="lineData" class="clearfix" label-width="120px" :rules="rules" ref="ruleForm">
        <div class="formBlock">
          <el-form-item label="渠道编码" prop="channelCode">
            <el-input v-model="lineData.channelCode" autocomplete="off" placeholder="请输入渠道编码"></el-input>
          </el-form-item>
          <el-form-item label="渠道名称" prop="channelName">
            <el-input v-model="lineData.channelName" autocomplete="off" placeholder="请输入渠道名称"></el-input>
          </el-form-item>
          <el-form-item label="渠道别称/标识" prop="channelMarking">
            <el-input v-model="lineData.channelMarking" autocomplete="off" placeholder="请输入渠道别称/标识"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="lineData.status" placeholder="请选择">
              <el-option
                v-for="item in statusOption"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注" class="wholeLine" prop="remark">
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
    var validChannelCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("渠道编码不能为空"));
      } else {
        callback();
      }
    };
    var validChannelName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("渠道名称不能为空"));
      } else {
        callback();
      }
    };
    var validChannelMarking = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("渠道别称/标识不能为空"));
      } else {
        callback();
      }
    };
    var validRemark = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("渠道别称/标识不能为空"));
      } else {
        callback();
      }
    };
    return {
      statusOption: [{ code: null, name: null }],
      rules: {
        channelCode: [{ validator: validChannelCode, trigger: "blur" }],
        channelName: [{ validator: validChannelName, trigger: "blur" }],
        channelMarking: [{ validator: validChannelMarking, trigger: "blur" }],
        remark: [{ validator: validRemark, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["fullHeight"]),
    ...mapGetters("resourManage", [
      "dialogFormVisible",
      "lineData",
      "dialogStatus",
      "currentPage",
      "pageSize",
      "title"
    ])
  },
  mounted: function() {
    this.queryStatus()
  },
  methods: {
    //查询状态
    queryStatus: function() {
      this.$axios
        .get(process.env.API_HOST + "/channelInfo/dropdown")
        .then(res => {
          this.statusOption = [];
          let resData = res.data.data.status,that = this;
          resData.find((val, index, arr) => {
            let cellObj = {};
            cellObj.code = val.code;
            cellObj.name = val.name;
            that.statusOption.push(cellObj);
          });
        });
    },
    submit: function(a) {
      //添加提交
      let that = this;
      if (this.dialogStatus == "add") {
        that.$refs[a].validate(valid => {
          //表单校验合法
          if (valid) {
            that
              .$axios({
                url: process.env.API_HOST + `/channelInfo/add`,
                method: "post",
                data: JSON.stringify(that.lineData)
              })
              .then(res => {
                  this.$store.commit("resourManage/setDialogFormVisible", false);
                  this.$store.commit('resourManage/setLineData',{});
                  this.$message({
                      showClose: false,
                      type: "success",
                      message: "恭喜，添加成功！",
                      center: "true",
                      offset: this.fullHeight / 2
                  });
                  this.$parent.refreshPageList();
                  
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
        that.$refs[a].validate(valid => {
          //表单校验合法
          if (valid) {
            let that = this;
            this.$axios({
              url: process.env.API_HOST + `/channelInfo/update?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,
              method: "post",
              data: JSON.stringify(that.lineData)
            })
            .then(res => {
                this.$store.commit("resourManage/setDialogFormVisible", false);
                this.$store.commit('resourManage/setLineData',{});
                this.$message({
                    showClose: false,
                    type: "success",
                    message: "恭喜，修改成功！",
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
                })
            })
        
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
        })
      }
    },
    cancel: function() {
      this.$store.commit("resourManage/setDialogFormVisible", false);
      this.$store.commit('resourManage/setLineData',{});
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