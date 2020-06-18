<template>
  <div>
    <el-dialog
      title="职位状态更新"
      width="880px"
      :visible="dialogUpdateStatusVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      @close="close"
    >
      <el-form :model="lineData" class="clearfix" label-width="140px">
        <div class="formBlock">
          <el-form-item label="职位编码">
            <el-input v-model="lineData.posCode" autocomplete="off" disabled></el-input>
          </el-form-item>

          <el-form-item label="职位状态">
            <el-select v-model="lineData.status" placeholder="请选择">
              <el-option
                v-for="item in statusInfo"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import appManagetypes from "../../../store/appManage-types.js";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Dialog",
  data: function() {
    return {
      formEmpty: false,
      formLabelWidth: "120px",
      statusInfo: [{ code: null, name: null }]
      //   type: true,
      //   dropTablevisible: false,
      //   currentLineData: {}
    };
  },
  computed: {
    ...mapGetters("systemManage", ["dialogUpdateStatusVisible", "lineData"])
  },
  mounted: function() {
    this.queryStatus();
  },
  methods: {
    //查询所有已存在的状态
    queryStatus: function() {
      this.$axios
        .get(process.env.API_HOST + "/posInfo/dropdown")
        .then(res => {
          this.statusInfo = [];
          let resData = res.data.data.status,
            that = this;
          resData.find((val, index, arr) => {
            let cellObj = {};
            cellObj.code = val.code;
            cellObj.name = val.name;
            cellObj.roomAddress = val.roomAddress;
            that.statusInfo.push(cellObj);
          });
        })
        .catch(res => {
          this.$message({
            showClose: false,
            type: "error",
            message: "职位状态查询失败！",
            center: "center",
            offset: this.fullHeight / 2
          });
        });
    },
    submit: function() {
      this.$axios
        .get(
          process.env.API_HOST +
            `/posInfo/updateStatus/${this.lineData.posCode}?status=${this.lineData.status}`
        )
        .then(res => {
          this.$store.commit(
            "systemManage/setDialogUpdateStatusVisible",
            false
          );
          this.$message({
            showClose: false,
            type: "success",
            message: "恭喜，职位状态修改成功！",
            center: "center",
            offset: this.fullHeight / 2
          });
        })
        .catch(res => {
          this.$message({
            showClose: false,
            type: "success",
            message: "职位状态修改失败！",
            center: "center",
            offset: this.fullHeight / 2
          });
        });
    },
    close: function() {
      this.$store.commit("systemManage/setDialogUpdateStatusVisible", false);
    },
    reset: function() {
      this.lineData.status = "";
    }
  }
};
</script>