<template>
  <div class="page">
    <div class="formContainer">
      <el-form ref="queryform" :model="form" label-width="100px">
        <el-form-item label="机房名">
            <el-select v-model="form.roomName" placeholder="请选择">
                  <el-option v-for="item in roomNameOptions" :key="item.room_name" :label="item.room_name" :value="item.room_name"></el-option>
            </el-select>
        </el-form-item>

       <el-form-item label="机房地址" style="width:590px">
            <VDistpicker
              :province="select.province" 
              :city="select.city" 
              :area="select.area" 
              @province="selectProvince" 
              @city="selectCity"
              @area="selectArea"
              @selected="onSelected">
            </VDistpicker>
        </el-form-item>


        <el-form-item label="机房状态">
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
            <el-form>
                <el-switch 
                    v-model="form1.switch"
                    @change="statusChange"
                    active-text="启用"
                    inactive-text="禁用" :disabled='disabled'
                    >
                </el-switch>
            </el-form>
        </div>
    </div>
    <div class="tableContainer">
      <el-table
        :data="tableDatas"
        style="width: 100%"
        :border="false"
        :height="fullHeight-300"
        :row-class-name="tableRowClassName"
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
          prop="roomCode"
          label="区域机房编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="roomName"
          label="区域机房名称"
          width="140">
        </el-table-column>
        <el-table-column
          prop="address"
          label="区域机房地址"
          :show-overflow-tooltip="true"
          width="200">
        </el-table-column>
        <el-table-column
          prop="detailedAddress"
          label="详细地址"
          :show-overflow-tooltip="true"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90">
        </el-table-column>
        <el-table-column
          prop="chargeman"
          label="负责人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="roomMobile"
          label="负责人联系方式"
          width="140">
        </el-table-column>
        <el-table-column
          prop="roomEmail"
          label="负责人邮箱"
          width="190">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <Dialog></Dialog>
  </div>
</template>
<script>
import appManagetypes from '../../store/appManage-types.js'
import VDistpicker from '../../components/distPicker'
import {mapGetters,mapState,mapActions} from 'vuex'
import Dialog from './dialog/roomManageDialog'
export default {
    name:"Table1",
    components:{
        Dialog,
        VDistpicker 
    },
    data:function(){
        return{
            //城市联动提交初始值
            form:{
                provinceCode:'',
                cityCode:'',
                areaCode:''
            },
            //城市联动显示默认值
            select: { province: '', city: '', area: '' },
            //switch是否启用
            disabled:true,
            //启用与禁用
            form1:{
              switch:true,
            },
            //多选data
            mutiplelines:[],
            formEmpty:false,        
            tableDatas:[],      
            statusInfo:[{code:null,name:null}],
            roomNameOptions:[],
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
    mounted:function(){
        this.$store.dispatch('getfullHeight');
        this.queryPageList(JSON.stringify({}));
        this.queryStatus();
        this.queryRoomName();     
    },
    computed:{
        ...mapGetters(['fullHeight','mainContainerEl']),
         ...mapGetters('resourManage',['currentPage','pageSize','total']),
    },
    watch:{
      mutiplelines:function(val){
        let mark1=[],mark2=[];
        for(let i=0;i<val.length;i++){
          if(val[i].status=="禁用"){
            mark1.push(val[i]);
          }
          else if(val[i].status=="启用"){
            mark2.push(val[i]);
          }
        }
        //同时包含启用和禁用
        if(mark1.length!=0 && mark2!=0){
          this.disabled=true;
        }
        //啥都没有
        else if(mark1.length==0 && mark2==0){
          this.disabled=true;
        }
        //选中的全是启用状态的
        else if(mark1.length==0 && mark2!=0){
           this.disabled=false;
           this.form1.switch=true;
        }
        //选中的全是禁用状态的
        else if(mark1.length!=0 && mark2==0){
           this.disabled=false;
           this.form1.switch=false;
        }
      }
    },
    methods: {
      //城市联动
       selectProvince(value) {
        this.select.province = value.value;
        this.form.provinceCode=value.code;
      },
      selectCity(value) {
        this.select.city = value.value;
        this.form.cityCode=value.code;
        
        
      },
      selectArea(value) {
        this.select.area = value.value;
        this.form.areaCode=value.code;      
      },
      onSelected(data) {
      },
      reset() {
        this.select.province = ''
        this.select.city = ''
        this.select.area = ''
      },
      //查询机房名称
      queryRoomName:function(){
         this.$axios.get(process.env.API_HOST+'/machinesRoom/name')
         .then((res=>{
           this.roomNameOptions=res.data.data.name;
         }))
         .catch((res)=>{

         })
      },
      //查询所有已存在的状态
      queryStatus:function(){
        this.$axios.get(process.env.API_HOST+'/machinesRoom/dropdown')
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
           
         })
      },
      //序列
      indexMethod(index) {
        return index+1;
      },
      //表示禁用行
      tableRowClassName({row, rowIndex}) {
        if(row.status=="禁用"){
           return 'disable-row';
        }
      },
      //size
      handleSizeChange(val) {
        console.log(val)
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
      //多选
      handleSelectionChange:function(val){
        this.mutiplelines=val;
      },
      statusChange:function(value){
        let statusValue='',roomCodes=[];
        value ? statusValue='1':statusValue='2'
        this.mutiplelines.find((val,index,arr)=>{
          roomCodes.push(val.roomCode);
        });
        this.$axios.post(process.env.API_HOST+`/machinesRoom/change?statusValue=${statusValue}`,JSON.stringify(roomCodes))
        .then((res=>{
          this.mutiplelines.find((val,index,arr)=>{
            if(value){
              val.status="启用"
            }
            else if(!value){
              val.status="禁用"
            } 
          });
          this.$message({
              showClose:false,
              type:'success',
              message:'操作成功！',
              center:'center',
              offset:this.fullHeight/2,
          })
        }))
        .catch((res)=>{
          this.$message({
            showClose:false,
            type:'error',
            center:'center',
            message:'操作失败！',
            offset:this.fullHeight/2,
          })
        })
       
      },
      //编辑按钮
      btnEdit:function(){
        if(this.mutiplelines.length==0){
          this.$message({
            showClose:false,
            type:'warning',
            center:'center',
            message:'请先勾选一行',
            offset:this.fullHeight/2,
          })
        }
        else if(this.mutiplelines.length==1){
         this.$store.commit('resourManage/setLineData',this.mutiplelines[0]);
          this.$store.commit('resourManage/setDialogFormVisible',true);
          this.$store.commit('resourManage/setDialogStatus','区域机房更新');     //弹窗标题
          this.$store.commit('resourManage.setDialogStatus','edit');   //弹窗状态 edit|add

        }
        else if(this.mutiplelines.length>1){
          this.$message({
            showClose:false,
            type:'warning',
            center:'center',
            message:'每次只能编辑1行，请重新操作！',
            offset:this.fullHeight/2,
          })
        }

      },
      //添加
      addItem(){
        this.$store.commit('resourManage/setDialogFormVisible',true);
        this.$store.commit('resourManage/setDialogStatus','区域机房新建');
        this.$store.commit('resourManage/setDialogStatus','add');
      },
      submit:function(){
        let that=this;
        this.tableDatas=[];
        this.queryPageList(JSON.stringify(that.form));
      },
      resetForm() {
        let that=this;
        this.form.roomName='';
        this.form.status='';
        this.reset();
        this.tableDatas=[];
        this.queryPageList(JSON.stringify(that.form));
      },
      queryPageList:function(appInfo){
         this.$axios.post(process.env.API_HOST+`/machinesRoom/selectPageList?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,appInfo).then((res)=>{
            let that=this;
            let resData=res.data.data.list;
          if(resData){
              that.$store.commit('resourManage/setTotal',res.data.data.total);
              resData.find((value,index,arr)=>{
                let cellObj={}
                cellObj.roomCode=value.roomCode;
                cellObj.roomName=value.roomName;
                cellObj.address=value.provinceName+value.cityName+value.areaName;
                cellObj.provinceName=value.provinceName;
                cellObj.cityName=value.cityName;
                cellObj.areaName=value.areaName;
                cellObj.detailedAddress=value.detailedAddress;
                value.status=='1'?cellObj.status='启用':cellObj.status='禁用';
                value.status=='1'?cellObj.status_=true:cellObj.status_=false;
                cellObj.chargeman=value.chargeman;
                cellObj.roomMobile=value.roomMobile;
                cellObj.roomEmail=value.roomEmail;
                cellObj.remark=value.remark;
                that.tableDatas.push(cellObj);
              })
             
          }  
        }).catch((err)=>{
        })
      },
      refeshLastpage:function(){
         this.$axios.post(process.env.API_HOST+`/machinesRoom/selectPageList?pageNum=${this.total+1}&pageSize=${this.pageSize}`,JSON.stringify({})).then((res)=>{
            let that=this;
            let resData=res.data.data.list;
            if(resData){
                that.$store.commit('resourManage/setTotal',res.data.data.total);
                this.tableDatas=[];
                resData.find((value,index,arr)=>{
                let cellObj={}
                cellObj.roomCode=value.roomCode;
                cellObj.roomName=value.roomName;
                cellObj.address=value.provinceName+value.cityName+value.areaName;
                cellObj.provinceName=value.provinceName;
                cellObj.cityName=value.cityName;
                cellObj.areaName=value.areaName;
                cellObj.detailedAddress=value.detailedAddress;
                value.status=='1'?cellObj.status='启用':cellObj.status='禁用';
                value.status=='1'?cellObj.status_=true:cellObj.status_=false;
                cellObj.chargeman=value.chargeman;
                cellObj.roomMobile=value.roomMobile;
                cellObj.roomEmail=value.roomEmail;
                cellObj.remark=value.remark;
                that.tableDatas.push(cellObj);
              })
            }  
        }).catch((err)=>{
            this.$message({
									showClose:false,
									type:'error',
									message:'刷新失败！',
									center:'true',
									offset:this.fullHeight/2,
								})
        })
      }
    },
}
</script>
