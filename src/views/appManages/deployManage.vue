<template>
  <div class="page">
    <div class="formContainer">
      <el-form ref="queryform" :model="form" label-width="100px">
        <el-form-item label="应用名称">
          <el-select v-model="form.appName" placeholder="请选择">
            <el-option label="日志动态分析" value="日志动态分析"></el-option>
            <el-option label="ES监控" value="ES监控"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="模块名称">
          <el-select v-model="form.moduleName" placeholder="请选择">
            <el-option label="日志动态分析" value="日志动态分析"></el-option>
            <el-option label="ES监控" value="ES监控"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务器名">
          <el-select v-model="form.machineName" placeholder="请选择">
            <el-option label="分布式批量" value="001"></el-option>
            <el-option label="流处理平台" value="002"></el-option>
            <el-option label="日志平台" value="003"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用状态">
            <el-select v-model="form.status" placeholder="请选择" @click.native="queryStatus" >
                <el-option v-for="item in statusInfo" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
        </el-form-item>
        <ul class="formBtn">
          <el-button type="primary" @click="submit">查询<i class="el-icon-search el-icon--right"></i></el-button>
          <el-button type="primary" @click="resetForm('queryform')">重置<i class="el-icon-refresh-left el-icon--right"></i></el-button>
        </ul>
      </el-form>
    </div>
    <div class="tableToolContainer">
      <el-row>
        <el-button type="success" icon="el-icon-plus" circle @click="addItem"></el-button>
        <el-button type="primary" icon="el-icon-edit" circle @click="btnEdit"></el-button>
        <div class="viewsFilter">
            <el-form>
              <el-radio-group  v-model="view" @change="viewChange">
                  <el-radio :label="1">服务器纬度</el-radio>
                  <el-radio :label="2">应用纬度</el-radio>
              </el-radio-group>
            </el-form>
        </div>
      </el-row>
    </div>
    <div class="tableContainer">
      <el-table
        :data="tableDatas"
        style="width: 100%"
        :border="false"
        :height="fullHeight-300"
         highlight-current-row
        @current-change="handleCurrentChange"
        >
        <el-table-column
          fixed
          type="index"
          :index="indexMethod"
          label="序号"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="appCode"
          label="应用编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="appName"
          label="应用名称"
          width="140">
        </el-table-column>
        <el-table-column
          prop="moduleCode"
          label="模块编码"
          width="140">
        </el-table-column>
        <el-table-column
          prop="moduleName"
          label="模块名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="groupCode"
          label="服务器分组编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="machineCode"
          label="服务器编码"
          width="140">
        </el-table-column>
        <el-table-column
          prop="machineIp"
          label="服务器地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="machineName"
          label="服务器名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="startScript"
          label="启动脚本目录"
          width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="lineEdit(scope)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange1"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="sizes, prev, pager, next, jumper"
        :total="999">
      </el-pagination>
    </div>
    <Dialog></Dialog>
  </div>
</template>
<script>
import appManagetypes from '../../store/appManage-types.js'
import {mapGetters,mapState,mapActions} from 'vuex'
import Dialog from './dialog/deployManageDialog'
export default {
    name:"Table1",
    components:{
        Dialog
    },
    data:function(){
        return{
            form:{
                appName:'',
                status:'',
            },
            view:1,
            formEmpty:false,        
            tableDatas:[],       //表格数据
            statusInfo:[{code:null,name:null}]
        }
    },
    beforeRouteEnter:(to,from,next)=>{
		next(vm=>{
        vm.mainContainerEl.setAttribute("class", "mainContainer animate__animated animate__zoomIn");
		});
    },
    beforeRouteLeave:function(to,from,next){
        this.mainContainerEl.setAttribute("class", "mainContainer");
        next();
    },
    mounted:function(){
        this.$store.dispatch('getfullHeight');
        this.queryPageList(JSON.stringify({}));
    },
    computed:{
        ...mapGetters(['fullHeight','mainContainerEl','currentLineData','currentPage','currentPage','pageSize']),
    },
    methods: {
      //查询所有已存在的状态
      queryStatus:function(){
        this.$axios.get(process.env.API_HOST+'/deployInfo/dropdown')
        .then((res)=>{
          this.statusInfo=[];
          let resData=res.data.data.status,that=this;
          resData.find((val,index,arr)=>{
            let cellObj={};
            cellObj.code=val.code;
            cellObj.name=val.name;
            that.statusInfo.push(cellObj);
          })
        })
      },
      //序列
      indexMethod(index) {
        return index+1;
      },
      //size
      handleSizeChange(val) {
        console.log(val)
        this.$store.commit(appManagetypes.setPageSize,val);
        this.tableDatas=[];
        let that=this;
        this.queryPageList(JSON.stringify(that.form));
      },
      //page
      handleCurrentChange1(val) {
        this.$store.commit(appManagetypes.setCurrentPage,val);
        this.tableDatas=[];
        let that=this;
        this.queryPageList(JSON.stringify(that.form));
      },
      //单选
      handleCurrentChange(val) {
        this.$store.commit(appManagetypes.setCurrentLineData,val);
      },
      //编辑行
      lineEdit:function(val){
        // console.log(val.row)
        this.$store.commit(appManagetypes.setCurrentLineData,val.row);
        this.$store.commit(appManagetypes.turnDialogFormVisible,true);
        this.$store.commit(appManagetypes.setTitle,'应用部署管理更新');
        this.$store.commit(appManagetypes.turnDialogStatus,'edit')
      },
      //编辑按钮
      btnEdit:function(){
        let that=this;
        console.log(this.currentLineData);
        Object.keys(that.currentLineData).forEach((key)=>{
          if(that.currentLineData[key]!=''){
            that.formEmpty=true
          }
		  	});
        if(this.formEmpty){
            this.$store.commit(appManagetypes.turnDialogFormVisible,true); //显示弹窗
            this.$store.commit(appManagetypes.setTitle,'应用部署管理更新');     //弹窗标题
            this.$store.commit(appManagetypes.turnDialogStatus,'edit');   //弹窗状态 edit|add
        }
        else{
          this.$message({
            showClose:false,
            type:'warning',
            message:'请先选择一行！',
            center:'center',
            offset:this.fullHeight/2,
          })
        }
      },
      //添加
      addItem(){
        this.$store.commit(appManagetypes.turnDialogFormVisible,true);
        this.$store.commit(appManagetypes.setTitle,'应用部署管理新建');
        this.$store.commit(appManagetypes.turnDialogStatus,'add');
      },
      submit:function(){
        let that=this;
        this.tableDatas=[];
        this.queryPageList(JSON.stringify(that.form));
      },
      resetForm() {
        let obj=this.form;
        let that=this;
        Object.keys(obj).forEach((key)=>{
          obj[key]='';
        });
        this.tableDatas=[];
        this.queryPageList(JSON.stringify(that.form));
      },
      viewChange:function(){
        console.log(this.view);
      },
      queryPageList:function(appInfo){
         this.$axios.post(process.env.API_HOST+`/deployInfo/selectDeployManageVO?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,appInfo).then((res)=>{
            let that=this;
            let resData=res.data.data.list;
            resData.find((value,index,arr)=>{
              let cellObj={}
              cellObj.appCode=value.appCode;
              cellObj.appName=value.appName;
              cellObj.moduleCode=value.moduleCode;
              cellObj.moduleName=value.moduleName;
              cellObj.groupCode=value.groupCode;
              cellObj.machineCode=value.machineCode;
              cellObj.machineIp=value.machineIp;
              cellObj.machineName=value.machineName;
              cellObj.startScript=value.startScript;
              cellObj.status=value.status;
              that.tableDatas.push(cellObj);
            })
            
        }).catch((err)=>{
            console.log(err);
        })
      }
    }
}
</script>
