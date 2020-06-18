<template>
  <div class="page">
    <div class="orgButton">
      <el-button type="primary" round @click="addBtn">新建</el-button>
      <el-button type="primary" round @click="editBtn">编辑</el-button>
      <el-button type="primary" round @click="changeStatuBtn">状态更改</el-button>
    </div>

    <div class="advSearch">
      <span class="f14">机构名称: </span>
      <el-select v-model="valName" clearable placeholder="请选择" size="small" class="stateSelect">
        <el-option v-for="item in orgOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>

      <span class="f14">状态: </span>
      <el-select v-model="valState" clearable placeholder="请选择" size="small" class="stateSelect">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>

      <el-button type="primary" class="btnSearch" size="small" @click="handleSearch">查 询</el-button>

    </div>

    <div class="orgTableList">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="orgCode" label="机构编码" width="120"></el-table-column>
        <el-table-column prop="orgName" label="机构名称" width="120"></el-table-column>
        <el-table-column prop="orgStatus" label="机构状态" width="120"></el-table-column>
        <el-table-column prop="orgType" label="机构类型" width="120"></el-table-column>
        <el-table-column prop="orgPrincipal" label="机构负责人" width="120"> </el-table-column>
        <el-table-column prop="orgPriTell" label="机构负责人联系方式" width="160"> </el-table-column>
        <el-table-column prop="orgPhone" label="机构联系方式" width="120"> </el-table-column>
        <el-table-column prop="orgAddress" label="机构地址" show-overflow-tooltip> </el-table-column>
      </el-table>

    </div>
    <Dialog></Dialog>
    <DialogStatus> </DialogStatus>
  </div>

</template>

<script>
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex'

  import Dialog from './dialog/addOrgManageDialog'
  import DialogStatus from './dialog/orgStatusDialog'

  export default {
    name: "Table",
    components: {
      Dialog,
      DialogStatus
    },
    data: function () {

      return {
        multipleSelection: [], //表格选中某一行

        orgOptions: [{
            value: 'zhongjiaojian',
            label: '中交建'
          },
          {
            value: 'jingdong',
            label: '京东'
          }
        ],

        statusOptions: [{
            value: '1',
            label: '正常'
          },
          {
            value: '2',
            label: '失效'
          }
        ],
        tableData: [{
          orgType: '实际机构',
          orgName: '王小虎',
          orgCode: '12054',
          orgPriTell: '010-23458',
          orgPrincipal: '占山',
          orgStatus: '正常',
          orgPhone: '13256478923',
          orgAddress: '上海市普陀区金沙江路 1518 弄'
        }, {
          orgType: '虚拟机构',
          orgPriTell: '010-23458',
          orgName: '虎111',
          orgStatus: '失效',
          orgPrincipal: '占山22',
          orgCode: '21331234',
          orgPhone: '18656478923',
          orgAddress: '上海市普江路 1518222 弄'
        }, {
          orgType: '虚拟机构',
          orgName: '王shangzan',
          orgPriTell: '010-23458',
          orgCode: '999232',
          orgPrincipal: '占山1',
          orgStatus: 1 ? '正常' : '失效',
          orgPhone: '13356478923',
          orgAddress: '上海市普陀区金 1511118 弄'
        }, {
          orgType: '实际机构',
          orgPriTell: '010-23458',
          orgName: '虎22',
          orgPrincipal: '占山44',
          orgCode: '33344',
          orgStatus: '失效',
          orgPhone: '19956478923',
          orgAddress: '上shansagdjk路 151338 '
        }],

        valName: '',
        valState: '',

      }
    },

    // beforeRouteEnter: (to, from, next) => {
    //   next(vm => {
    //     vm.mainContainerEl.setAttribute("class", "mainContainer animate__animated animate__fadeInUpBig");
    //   });
    // },
    // beforeRouteLeave: function (to, from, next) {
    //   this.mainContainerEl.setAttribute("class", "mainContainer");
    //   next();
    // },

    mounted: function () {
      this.$store.dispatch('getfullHeight');
      // this.queryPageList(JSON.stringify({}));
      // this.queryStatus();
      // this.queryAppName();
      // console.log(this.dialogVisible)
    },
    computed: {
      ...mapGetters(['fullHeight', 'mainContainerEl', 'currentLineData', 'currentPage', 'currentPage', 'pageSize']),
      ...mapGetters('systemManage', ['dialogVisible', ]),
    },
    methods: {
      // 新建
      addBtn: function () {
        this.$store.commit('systemManage/setDialogVisible', true);
        this.$store.commit('systemManage/setOrgType', 'add');
      },

      // 编辑
      editBtn: function () {
        console.log('编辑');
        if (this.multipleSelection.length == 0) {
          this.$message({
            showClose: false,
            type: 'warning',
            center: 'center',
            message: '请先勾选一行',
            offset: this.fullHeight / 2,
          })
        } else if (this.multipleSelection.length == 1) {

          this.$store.commit('systemManage/setEditChangeInfo', this.multipleSelection[0])
          this.$store.commit('systemManage/setDialogVisible', true);
          this.$store.commit('systemManage/setOrgType', 'edit')

        } else {
          this.$message({
            showClose: false,
            type: 'warning',
            center: 'center',
            message: '只允许勾选一行',
            offset: this.fullHeight / 2,
          })
        }
      },

      // 状态更改
      changeStatuBtn: function () {

        if (this.multipleSelection.length == 0) {
          this.$message({
            showClose: false,
            type: 'warning',
            center: 'center',
            message: '请先勾选一行',
            offset: this.fullHeight / 2,
          })
        } else if (this.multipleSelection.length == 1) {

          this.$store.commit('systemManage/setEditChangeInfo', this.multipleSelection[0]);
          this.$store.commit('systemManage/setStatusDialogVisible', true);

        } else {
          this.$message({
            showClose: false,
            type: 'warning',
            center: 'center',
            message: '只允许勾选一行',
            offset: this.fullHeight / 2,
          })
        }

      },

      // 编辑行
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      // 高级查询
      handleSearch: function () {
        console.log('高级搜索');


        console.log(this.valName);
        console.log(this.valState);


      }

    },

  }

</script>


<style>
  .page {
    padding: 30px;
  }

  .orgTableList {
    margin-top: 20px
  }

  .advSearch {
    margin-top: 20px
  }

  .f14 {
    font-size: 14px;
    font-weight: 700;
    margin-right: 10px;
  }

  .stateSelect {
    margin-right: 20px;
  }

</style>
