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
                    active-text="启用"
                    inactive-text="禁用">
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
          prop="roomAddress"
          label="区域机房地址"
          width="140">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="chargeman"
          label="负责人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="roomMobile"
          label="负责人联系方式"
          width="140">
        </el-table-column>
        <el-table-column
          prop="roomEmail"
          label="负责人邮箱"
          width="140">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
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
            //城市联动初始提交值
            form:{
                roomAddress:{provinceCode:null,areaCode:null,cityCode:null}
            },
            //城市联动默认值
            select: { province: '北京市', city: '北京城区', area: '西城区' },
            //启用与禁用
            form1:{
              switch:true,
            },
            formEmpty:false,        
            tableDatas:[],      
            statusInfo:[{code:null,name:null}],
            roomNameOptions:[],
            
            total:0
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
        ...mapGetters(['fullHeight','mainContainerEl','currentLineData','currentPage','currentPage','pageSize']),
    },
    methods: {
      //城市联动
       selectProvince(value) {
        this.select.province = value.value;
        this.form.roomAddress.provinceCode=value.code;
      },
      selectCity(value) {
        this.select.city = value.value;
        this.form.roomAddress.cityCode=value.code;
        
      },
      selectArea(value) {
        this.select.area = value.value;
        this.form.roomAddress.areaCode=value.code;
        
      },
      onSelected(data) {
        console.log(this.form)
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
        this.$store.commit(appManagetypes.setTitle,'区域机房更新');
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
            this.$store.commit(appManagetypes.setTitle,'区域机房更新');     //弹窗标题
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
        this.$store.commit(appManagetypes.setTitle,'区域机房新建');
        this.$store.commit(appManagetypes.turnDialogStatus,'add');
      },
      submit:function(){
        let that=this;
        this.tableDatas=[];
        this.queryPageList(JSON.stringify(that.form));
      },
      resetForm() {
        let that=this;
        this.form.roomName='';
        this.form.mapState='';
        this.form.roomAddress.provinceCode=null;
        this.form.roomAddress.areaCode=null;
        this.form.roomAddress.cityCode=null;
        this.reset();
        this.tableDatas=[];
        this.queryPageList(JSON.stringify(that.form));
      },
      viewChange:function(){
        console.log(this.view);
      },
      queryPageList:function(appInfo){
         this.$axios.post(process.env.API_HOST+`/machinesRoom/selectPageList?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,appInfo).then((res)=>{
            let that=this;
            let resData=res.data.data.list;
          if(resData){
              that.total=res.data.data.total;
             resData.find((value,index,arr)=>{
              let cellObj={}
              cellObj.roomCode=value.roomCode;
              cellObj.roomName=value.roomName;
              cellObj.roomAddress=value.roomAddress;
              cellObj.status=value.status;
              cellObj.chargeman=value.chargeman;
              cellObj.roomMobile=value.roomMobile;
              cellObj.roomEmail=value.roomEmail;
              cellObj.remark=value.remark;
              that.tableDatas.push(cellObj);
            })
          }
           
            
        }).catch((err)=>{
            console.log(err);
        })
      }
    }
}
</script>
