<template>
  <div class="page">
    <div class="formContainer">
      <el-form ref="queryform" :model="form" label-width="100px">
        <el-form-item label="服务器名">
          <el-select v-model="form.machineName" placeholder="请选择">
              <el-option v-for="item in machineNameInfo" :key="item.machine_name" :label="item.machine_name" :value="item.machine_name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="服务器IP">
            <el-select v-model="form.machineIp" placeholder="请选择">
              <el-option v-for="item in machineIpInfo" :key="item.machine_ip" :label="item.machine_ip" :value="item.machine_ip"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="服务器状态">
            <el-select v-model="form.status" placeholder="请选择">
                <el-option v-for="item in statusInfo" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
        </el-form-item>
        <ul class="formBtn">
          <el-button type="primary" @click="submit">查询<i class="el-icon-search el-icon--right"></i></el-button>
          <el-button type="primary" @click="resetForm">重置<i class="el-icon-refresh-left el-icon--right"></i></el-button>
        </ul>
      </el-form>
    </div>
    <div class="tableToolContainer clearfix">
        <div class="btnGroup-base">
            <el-button type="success" icon="el-icon-plus" circle @click="addItem"></el-button>
            <el-button type="primary" icon="el-icon-edit" circle @click="btnEdit"></el-button>
        </div>
        <div class="btnGroup-other">
          <el-button  type="primary" round @click="updateStatus" :disabled="disabled">状态变更</el-button>
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
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          type="index"
          :index="indexMethod"
          label="序号"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="machineCode"
          label="服务器编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="machineName"
          label="服务器名称"
          width="160">
        </el-table-column>
        <el-table-column
          prop="machineIp"
          label="服务器IP"
          width="140">
        </el-table-column>
        <el-table-column
          prop="machinePort"
          label="SSH端口"
          width="100">
        </el-table-column>
        <el-table-column
          prop="machineType"
          label="服务器类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="operatingSystem"
          label="操作系统"
          width="140">
        </el-table-column>
        <el-table-column
          prop="deployRoot"
          label="部署根目录"
          width="160">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态" 
          width="90">
        </el-table-column>
        <el-table-column
          prop="planning"
          :show-overflow-tooltip="true"
          label="规划说明">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total,sizes, prev, pager, next, jumper"
        :total="totals">
      </el-pagination>
    </div>
    <Dialog></Dialog>
    <UpdateStatus></UpdateStatus>

  </div>
</template>
<script>
import appManagetypes from '../../store/appManage-types.js'
import {mapGetters,mapState,mapActions} from 'vuex'
import Dialog from './dialog/machineManageDialog'
import UpdateStatus from './dialog/updateStatusDialog'
export default {
    name:"Table1",
    components:{
        Dialog,
        UpdateStatus
    },
    data:function(){
        return{
            //查询条件
            form:{
                appName:'',
                status:'',
                switch:true,
            },
            formEmpty:false,        
            tableDatas:[],   
            //多选data
            mutiplelines:[],   
            //按钮是否可用
            disabled:true,
            //服务器状态
            statusInfo:[],
            //服务器ip
            machineIpInfo:[],
            //服务器名称
            machineNameInfo:[],
            totals:0
        }
    },
    beforeRouteEnter:(to,from,next)=>{
		next(vm=>{
        vm.mainContainerEl.setAttribute("class", "mainContainer animate__animated animate__fadeInLeft");
		});
    },
    beforeRouteLeave:function(to,from,next){
        this.mainContainerEl.setAttribute("class", "mainContainer");
        next();
    },
    watch:{
      mutiplelines:function(val){
        if(val&&val.length==1){
          this.disabled=false
        }
        else if(val&&val.length>1){
          this.disabled=true
        }
        else if(!val){
          this.disabled=true
        }
      }
    },
    mounted:function(){
        this.$store.dispatch('getfullHeight');
        this.queryPageList(JSON.stringify({}));
        this.queryMachineName();
        this.queryMachineIp();
        this.queryStatus();
    },
    computed:{
        ...mapGetters(['fullHeight','mainContainerEl']),
        ...mapGetters('resourManage',['currentPage','pageSize']),
      
    },
    methods: {
      //查询服务器名
      queryMachineName:function(){
         this.$axios.get(process.env.API_HOST+'/machineInfo/name')
         .then((res)=>{
            this.machineNameInfo=res.data.data.name;
         })
         .catch((res)=>{
            console.log(res)
         })
      },
      //查询IP
      queryMachineIp:function(){
         this.$axios.get(process.env.API_HOST+'/machineInfo/ip')
         .then((res)=>{
            this.machineIpInfo=res.data.data.ip
         })
         .catch((res)=>{
            console.log(res)
         })
      },
      //查询所有已存在的状态
      queryStatus:function(){
        this.$axios.get(process.env.API_HOST+'/machineInfo/dropdown')
        .then((res)=>{
          this.statusInfo=[];
          let resData=res.data.data.status,that=this;
          resData.find((val,index,arr)=>{
            let cellObj={};
            cellObj.code=val.code;
            cellObj.name=val.name;
            cellObj.roomAddress=val.roomAddress
            that.statusInfo.push(cellObj);
          })
        })
        .catch((res)=>{
          this.$message({
            showClose:false,
            type:'error',
            message:'服务器状态查询失败！',
            center:'center',
            offset:this.fullHeight/2,
          })
        })
      },
      //序列
      indexMethod(index) {
        return index+1;
      },
      //size
      handleSizeChange(val) {
        this.$store.commit('resourManage/setPageSize',val);
        this.tableDatas=[];
        let that=this;
        this.queryPageList(JSON.stringify(that.form));
      },
      //page
      handleCurrentChange(val) {
        this.$store.commit('resourManage/setCurrentPage',val);
        this.tableDatas=[];
        let that=this;
        this.queryPageList(JSON.stringify(that.form));
      },
      //编辑按钮
      btnEdit:function(){
        if(this.mutiplelines.length==1){
          this.$store.commit('resourManage/setLineData',this.mutiplelines[0]);
          this.$store.commit('resourManage/setDialogFormVisible',true);
          this.$store.commit('resourManage/setDialogStatus','edit');
          this.$store.commit('resourManage/setTitle','服务器更新');
        }
        else if(this.mutiplelines.length==0){
           this.$message({
									showClose:false,
									type:'warning',
									message:'请先选择一行',
									center:'true',
									offset:this.fullHeight/2,
						})
        }
      },
      //添加
      addItem(){
        this.$store.commit('resourManage/setDialogFormVisible',true);
        this.$store.commit('resourManage/setTitle','服务器新建');
        this.$store.commit('resourManage/setDialogStatus','add');
      },
      //多选
      handleSelectionChange:function(val){
        this.mutiplelines=val;
      },
      //更新服务器状态
      updateStatus:function(){
        this.$store.commit('resourManage/setLineData',this.mutiplelines[0]);
        this.$store.commit('resourManage/setDialogUpdateStatusVisible',true);
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
         this.$axios.post(process.env.API_HOST+`/machineInfo/selectPageList?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,appInfo).then((res)=>{
            let that=this;
            let resData=res.data.data.list;
          if(resData){
              this.totals=res.data.data.total;
              resData.find((value,index,arr)=>{
              let cellObj={}
              cellObj.machineCode=value.machineCode;
              cellObj.cpu=value.cpu;
              cellObj.diskSpace=value.diskSpace;
              cellObj.machineName=value.machineName;
              cellObj.networkCard=value.networkCard;
              cellObj.memory=value.memory;
              cellObj.userName=value.userName;
              cellObj.userPassword=value.userPassword;
              cellObj.rootPassword=value.rootPassword;
              cellObj.sftpUsername=value.sftpUsername;
              cellObj.sftpPassword=value.sftpPassword;
              cellObj.machineDomain=value.machineDomain;
              cellObj.machineIp=value.machineIp;
              cellObj.machinePort=value.machinePort;
              cellObj.machineType=value.machineType;
              cellObj.deployRoot=value.deployRoot;
              cellObj.operatingSystem=value.operatingSystem;
              value.status== 1 ? cellObj.status="使用中"
                          : value.status == 2 ? cellObj.status="待分配" 
                          : value.status == 3 ? cellObj.status="待回收" 
                          : value.status == 4 ? cellObj.status="重新分配" 
                          : value.status == 5 ? cellObj.status="已报废" 
                          : value.status == 6 ? cellObj.status="已关机" : cellObj.status="";
              cellObj.status_=cellObj.status;
              cellObj.planning=value.planning;
              that.tableDatas.push(cellObj);
            })
          }
           
            
        }).catch((err)=>{
            this.$message({
									showClose:false,
									type:'error',
									message:'查询失败！',
									center:'true',
									offset:this.fullHeight/2,
						})
        })
      },

    }
}
</script>
