<template>
  <div class="page">
    <div class="formContainer">
      <el-form ref="queryform" :model="form" label-width="100px">
        <el-form-item label="接口名称">
          <el-select v-model="form.interfaceName" filterable placeholder="请选择或搜索">
            <el-option v-for="item in interfaceNameOptions" :key="item.interface_name" :label="item.interface_name" :value="item.interface_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属模块">
          <el-select v-model="form.moduleName" placeholder="请选择">
            <el-option label="分布式批量" value="分布式批量"></el-option>
            <el-option label="流处理平台" value="流处理平台"></el-option>
            <el-option label="日志平台" value="日志平台"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接口状态">
            <el-select v-model="form.status" placeholder="请选择">
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
          prop="interfaceCode"
          label="接口编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="interfaceName"
          label="接口名称"
          width="140">
        </el-table-column>
        <el-table-column
          prop="interfaceClassname"
          label="接口类名称"
          width="140">
        </el-table-column>
        <el-table-column
          prop="interfaceUrl"
          label="接口URL"
          width="140">
        </el-table-column>
        <el-table-column
          prop="requestMethod"
          label="接口请求方式"
          width="140">
        </el-table-column>
        <el-table-column
          prop="requestProtocal"
          label="接口请求协议"
          width="140">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90">
        </el-table-column>
        <el-table-column
          prop="moduleName"
          label="所属模块"
          width="90">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="接口描述">
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
import Dialog from './dialog/apiManageDialog'
export default {
    name:"Table1",
    components:{
        Dialog
    },
    data:function(){
        return{
            form:{
                appName:'',
                status:''
            },
            // currentPage: 1,      
            // pageSize:10, 
            formEmpty:false,        
            tableDatas:[],       //表格数据
            statusInfo:[{code:null,name:null}],
            interfaceNameOptions:[]
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
        this.queryStatus();
        this.queryAppName();
    },
    computed:{
        ...mapGetters(['fullHeight','mainContainerEl','currentLineData','currentPage','currentPage','pageSize']),
    },
    methods: {
       //查询已有接口
      queryAppName:function(){
         this.$axios.get(process.env.API_HOST+'/serviceInterface/name')
         .then((res)=>{
           this.interfaceNameOptions=res.data.data.name;
         })
      },
      //查询所有已存在的状态
      queryStatus:function(){
        this.$axios.get(process.env.API_HOST+'/serviceInterface/dropdown')
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
        this.$store.commit(appManagetypes.setTitle,'服务接口更新');
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
            this.$store.commit(appManagetypes.setTitle,'服务接口更新');     //弹窗标题
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
        this.$store.commit(appManagetypes.setTitle,'服务接口新建');
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
      queryPageList:function(appInfo){
         this.$axios.post(process.env.API_HOST+`/serviceInterface/selectByPage?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,appInfo).then((res)=>{
            let that=this;
            let resData=res.data.data.list;
            resData.find((value,index,arr)=>{
              let cellObj={}
              cellObj.interfaceCode=value.interfaceCode;
              cellObj.interfaceName=value.interfaceName;
              cellObj.interfaceClassname=value.interfaceClassname;
              cellObj.interfaceUrl=value.interfaceUrl;
              cellObj.requestMethod=value.requestMethod;
              cellObj.requestProtocal=value.requestProtocal;
              cellObj.moduleName=value.moduleName;
              cellObj.status=value.status;
              cellObj.remark=value.remark;
              that.tableDatas.push(cellObj);
            })
            
        }).catch((err)=>{
            console.log(err);
        })
      }
    }
}
</script>
