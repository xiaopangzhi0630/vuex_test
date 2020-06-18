<template>
  <div class="page">
    <div class="formContainer">
      <el-form ref="queryform" :model="form" label-width="100px">
        <el-form-item label="渠道编码">
          <el-input v-model="form.channelCode" placeholder="请输入渠道编码"></el-input>
        </el-form-item>

        <el-form-item label="渠道名称">
          <el-input v-model="form.channelName" placeholder="请输入渠道名称"></el-input>
        </el-form-item>

        <ul class="formBtn">
          <el-button type="primary" @click="submit">
            查询
            <i class="el-icon-search el-icon--right"></i>
          </el-button>
          <el-button type="primary" @click="resetForm">
            重置
            <i class="el-icon-refresh-left el-icon--right"></i>
          </el-button>
        </ul>
      </el-form>
    </div>
    <div class="tableToolContainer clearfix">
      <div class="btnGroup-base">
        <el-button type="success" icon="el-icon-plus" circle @click="addItem"></el-button>
        <el-button type="primary" icon="el-icon-edit" circle @click="btnEdit" :disabled="disabled"></el-button>
      </div>
    </div>
    <div class="tableContainer">
      <el-table
        :data="tableDatas"
        style="width: 100%"
        :border="false"
        :height="fullHeight-300"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
        <el-table-column prop="channelCode" label="渠道编码"></el-table-column>
        <el-table-column prop="channelName" label="渠道名称"></el-table-column>
        <el-table-column prop="channelMarking" label="别称/标识"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remark" label="说明"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <Dialog></Dialog>
  </div>
</template>
<script>
import appManagetypes from "../../store/appManage-types.js";
import { mapGetters, mapState, mapActions } from "vuex";
import Dialog from "./dialog/channelManageDialog";
export default {
  name: "Table1",
  components: {
    Dialog
  },
  data: function() {
    return {
      form: {
        channelCode: "",
        channelName: ""
      },
      //多选data
      mutiplelines: [],
      tableDatas: [],
      total: 0,
      //编辑按钮状态
      disabled:true,
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.mainContainerEl.setAttribute(
        "class",
        "mainContainer animate__animated animate__fadeInLeft"
      );
    });
  },
  beforeRouteLeave: function(to, from, next) {
    this.mainContainerEl.setAttribute("class", "mainContainer");
    next();
  },
  mounted: function() {
    this.$store.dispatch("getfullHeight");
    this.queryPageList(JSON.stringify({}));
  },
  computed: {
    ...mapGetters(["fullHeight","mainContainerEl"]),
    ...mapGetters('resourManage',['currentPage','pageSize','pages']),
  },
  watch:{
    mutiplelines:function(val){
      if(val&&val.length==1){
          this.disabled=false
        }
        else if(val&&val.length>1){
          this.disabled=true
        }
        else if(val.length==0){
          this.disabled=true
        }
    }
  },
  methods: {
    //序列
    indexMethod(index) {
      return index + 1;
    },
    //size
    handleSizeChange(val) {
      this.$store.commit("resourManage/setPageSize", val);
      this.tableDatas = [];
      let that = this;
      this.queryPageList(JSON.stringify(that.form));
    },
    //多选
    handleSelectionChange: function(val) {
      this.mutiplelines = val;
    },
    //page
    handleCurrentChange(val) {
      this.$store.commit("resourManage/setCurrentPage", val);
      this.tableDatas = [];
      let that = this;
      this.queryPageList(JSON.stringify(that.form));
    },
    btnEdit: function() {
      this.$store.commit("resourManage/setLineData", this.mutiplelines[0]);
      this.$store.commit("resourManage/setDialogFormVisible", true);
      this.$store.commit("resourManage/setTitle", "渠道更新"); //弹窗标题
      this.$store.commit("resourManage/setDialogStatus", "edit"); //弹窗状态 edit|add
    },
    //添加
    addItem() {
      this.$store.commit("resourManage/setDialogFormVisible", true);
      this.$store.commit("resourManage/setTitle", "渠道设置");
      this.$store.commit("resourManage/setDialogStatus", "add");
    },
    submit: function() {
      let that = this;
      this.tableDatas = [];
      this.queryPageList(JSON.stringify(that.form));
    },
    resetForm() {
      let that = this;
      this.form.channelCode = "";
      this.form.channelName = "";
      this.tableDatas = [];
      this.queryPageList(JSON.stringify(that.form));
    },
    queryPageList: function(appInfo) {
      this.$axios
        .post(
          process.env.API_HOST +
            `/channelInfo/selectPageList?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,
          appInfo
        )
        .then(res => {
          let that = this;
          let resData = res.data.data.list;
          if (resData) {
            that.total = res.data.data.total;
            this.$store.commit('resourManage/setPages',res.data.data.pages);
            resData.find((value, index, arr) => {
              let cellObj = {};
              cellObj.channelCode = value.channelCode;
              cellObj.channelName = value.channelName;
              cellObj.channelMarking = value.channelMarking;
              cellObj.status = value.status;
              cellObj.remark = value.remark;
              that.tableDatas.push(cellObj);
            })
          }
        })
        .catch(err => {
          this.$message({
            showClose: false,
            type: "error",
            center: "center",
            message: "列表查询失败，请刷新重试！",
            offset: this.fullHeight / 2
          })
        })
    },
    refreshPageList: function() {
      this.$axios
        .post(
          process.env.API_HOST +
            `/channelInfo/selectPageList?pageNum=${this.pages+1}&pageSize=${this.pageSize}`,JSON.stringify({})
        )
        .then(res => {
          let that = this;
          let resData = res.data.data.list;
          if (resData) {
            this.tableDatas = [];
            that.total = res.data.data.total;
            this.$store.commit('resourManage/setPages',res.data.data.pages);
            resData.find((value, index, arr) => {
              let cellObj = {};
              cellObj.channelCode = value.channelCode;
              cellObj.channelName = value.channelName;
              cellObj.channelMarking = value.channelMarking;
              cellObj.status = value.status;
              cellObj.remark = value.remark;
              that.tableDatas.push(cellObj);
            });
            this.$message({
              showClose: false,
              type: "success",
              center: "center",
              message: "恭喜，列表刷新成功！",
              offset: this.fullHeight / 2
            })
          }
        })
        .catch(err => {
          this.$message({
            showClose: false,
            type: "error",
            center: "center",
            message: "抱歉，列表刷新失败，请手动刷新浏览器！",
            offset: this.fullHeight / 2
          })
        })
    }
  }
};
</script>
