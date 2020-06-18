<template>
	<div>
		<el-dialog 
		:title="title" 
		width="880px"
		:visible="dialogFormVisible"
		:close-on-click-modal=false
		:append-to-body=true
		@close="close"
		
		>
		  <el-form :model="lineData" class="clearfix" label-width="140px">
		  	<div class="formBlock">
			    <el-form-item label="服务器编码" >
			      <el-input v-model="lineData.machineCode" autocomplete="off" placeholder="请选择"></el-input>
			    </el-form-item>
			    <el-form-item label="服务器名称">
			       <el-input v-model="lineData.machineName" autocomplete="off" placeholder="请输入区域机房名称" @focus="focus"></el-input>
			    </el-form-item>
				<el-form-item label="服务器IP">
				  <el-input v-model="lineData.machineIp" autocomplete="off" placeholder="请输入负责人"></el-input>
				</el-form-item>
			    <el-form-item label="SSH端口">
			      <el-input v-model="lineData.machinePort" autocomplete="off" placeholder="请输入负责人联系方式" ></el-input>
			    </el-form-item>

				<el-form-item label="部署根目录">
			      <el-input v-model="lineData.deployRoot" autocomplete="off"  placeholder="请输入负责人联系邮箱"></el-input>
			    </el-form-item>
				<el-form-item label="ROOT密码">
			      <el-input v-model="lineData.rootPassword" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="部署用户名称">
			      <el-input v-model="lineData.userName" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="部署用户密码">
			      <el-input v-model="lineData.userPassword" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="SFTP用户名称">
			      <el-input v-model="lineData.sftpUsername" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="SFTP用户密码">
			      <el-input v-model="lineData.sftpPassword" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="接口状态">
		            <el-select v-model="lineData.status_" placeholder="请选择">
		                <el-option v-for="item in statusInfo" :key="item.code" :label="item.name" :value="item.code"></el-option>
		            </el-select>
		        </el-form-item>
				<el-form-item label="服务器类型">
			      <el-input v-model="lineData.machineType" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="操作系统">
			      <el-input v-model="lineData.operatingSystem" autocomplete="off" placeholder="请输入"></el-input>
			    </el-form-item>
			    <el-form-item label="服务器域名">
			      <el-input v-model="lineData.machineDomain" autocomplete="off" placeholder="请输入服务器域名"></el-input>
			    </el-form-item>
			    <el-form-item label="CPU">
			      <el-input v-model="lineData.cpu" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="内存">
			      <el-input v-model="lineData.memory" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="硬盘空间">
			      <el-input v-model="lineData.diskSpace" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="网卡">
			      <el-input v-model="lineData.networkCard" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
				<el-form-item label="规划说明或备注" class="remark">
				  <el-input type="textarea" v-model="lineData.planning" placeholder="请输入备注"></el-input>
			    </el-form-item>
		    </div>

		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取消</el-button>
		    <el-button type="primary" @click="submit" >提交</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
import appManagetypes from '../../../store/appManage-types.js'
import {mapGetters,mapState,mapActions} from 'vuex'
export default{
	name:'Dialog',
	data:function(){
		return{
			formEmpty:false,
			formLabelWidth: '120px',
			statusInfo:[{code:null,name:null}],
			type:true,
			dropTablevisible:false,
		}
	},
	computed:{
		...mapGetters(['fullHeight']),
		...mapGetters('resourManage',['dialogFormVisible','lineData','dialogStatus','currentPage','pageSize','title']),
	},
	mounted:function(){
		this.queryStatus();
	},
	methods:{
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
		//发布方式
		publishMode:function(){
			if(this.lineData.publishMode=='1'){
				this.type=true
			}
			else if(this.lineData.publishMode=='2'){
				this.type=false
			}
		},
		focus:function(){
			this.dropTablevisible=true;
		},
		submit:function(){
			//添加提交
			if(this.dialogStatus=='add'){
				let that=this;
				this.$axios({
					url:process.env.API_HOST+`/machineInfo/add`,
					method:'post',
					data:JSON.stringify(that.lineData),
				})
				.then((res)=>{
					this.$store.commit('resourManage/setDialogFormVisible',false)
					this.$message({
						showClose:false,
						type:'success',
						message:'恭喜，添加成功！',
						center:'center',
						offset:this.fullHeight/2,
					})
				})
				.catch((err)=>{
					console.log(err)
				})
			}
			//编辑提交
			else if(this.dialogStatus=='edit'){
				let that=this,
				updateUsername='editor';
				this.lineData.updateTime=new Date().toISOString();
				this.lineData.updateUsername=updateUsername;
				this.$axios({
					url:process.env.API_HOST+`/machineInfo/update`,
					method:'post',
					data:JSON.stringify(that.lineData),
				})
				.then((res)=>{
					console.log(res);
					this.$store.commit('resourManage/setDialogFormVisible',false);
					this.$message({
						showClose:false,
						type:'success',
						message:'恭喜，修改成功！',
						center:'center',
						offset:this.fullHeight/2,
					})
				})
				.catch((err)=>{
					console.log(err)
				})
			}
		},
		close:function(){
			this.$store.commit('resourManage/setDialogFormVisible',false);
		},
		cancel:function(){
			this.$store.commit('resourManage/setDialogFormVisible',false);
			this.$message({
				showClose:false,
				type:'success',
				message:'已取消编辑',
				center:'center',
				offset:this.fullHeight/2,
			})
		},
		
	}
}
</script>