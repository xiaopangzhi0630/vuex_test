<template>
	<div>
		<el-dialog 
		:title="title" 
		width="880px"
		:visible="dialogFormVisible"
		:close-on-click-modal=false
		@close="close"
		
		>
		  <el-form :model="currentLineData" class="clearfix" label-width="140px">
		  	<div class="formBlock">
			    <el-form-item label="服务器编码" >
			      <el-input v-model="currentLineData.machineCode" autocomplete="off" placeholder="请选择"></el-input>
			    </el-form-item>
			    <el-form-item label="服务器名称">
			       <el-input v-model="currentLineData.machineName" autocomplete="off" placeholder="请输入区域机房名称" @focus="focus"></el-input>
			    </el-form-item>
				<el-form-item label="服务器IP">
				  <el-input v-model="currentLineData.machineIp" autocomplete="off" placeholder="请输入负责人"></el-input>
				</el-form-item>
			    <el-form-item label="SSH端口">
			      <el-input v-model="currentLineData.machine_port" autocomplete="off" placeholder="请输入负责人联系方式" ></el-input>
			    </el-form-item>

				<el-form-item label="部署根目录">
			      <el-input v-model="currentLineData.deployRoot" autocomplete="off"  placeholder="请输入负责人联系邮箱"></el-input>
			    </el-form-item>
				<el-form-item label="ROOT密码">
			      <el-input v-model="currentLineData.rootPassword" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="部署用户名称">
			      <el-input v-model="currentLineData.userName" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="部署用户密码">
			      <el-input v-model="currentLineData.userPassword" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="SFTP用户名称">
			      <el-input v-model="currentLineData.sftpUsername" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="SFTP用户密码">
			      <el-input v-model="currentLineData.sftpPassword" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="接口状态">
		            <el-select v-model="currentLineData.status" placeholder="请选择">
		                <el-option v-for="item in statusInfo" :key="item.code" :label="item.name" :value="item.code"></el-option>
		            </el-select>
		        </el-form-item>
				<el-form-item label="服务器类型">
			      <el-input v-model="currentLineData.machineType" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="操作系统">
			      <el-input v-model="currentLineData.operatingSystem" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="服务器域名">
			      <el-input v-model="currentLineData.machineDomain" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="CPU">
			      <el-input v-model="currentLineData.cpu" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="内存">
			      <el-input v-model="currentLineData.memory" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="硬盘空间">
			      <el-input v-model="currentLineData.diskSpace" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
			    <el-form-item label="网卡">
			      <el-input v-model="currentLineData.networkCard" autocomplete="off" placeholder="请输入区域机房地址"></el-input>
			    </el-form-item>
				<el-form-item label="规划说明或备注" class="remark">
				  <el-input type="textarea" v-model="currentLineData.remark" placeholder="请输入备注"></el-input>
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
		...mapGetters(['theme','dialogFormVisible','title','currentLineData','dialogStatus','currentPage','pageSize','fullHeight']),
	},
	mounted:function(){
		let that=this;
		document.addEventListener('click', function (e) {
		let flag = e.target.contains(document.getElementsByClassName('dropTable')[0]);
		// console.log(flag);
		if(!flag) return
		that.dropTablevisible = false
		})
	},
	methods:{
		//查询状态
		queryStatus:function(){
			this.$axios.get(process.env.API_HOST+'/deployInfo/operation')
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
		//发布方式
		publishMode:function(){
			// this.currentLineData.publishMode=='1'?this.type==true:this.type==false
			console.log(this.currentLineData.publishMode);
			if(this.currentLineData.publishMode=='1'){
				this.type=true
			}
			else if(this.currentLineData.publishMode=='2'){
				this.type=false
			}
		},
		focus:function(){
			this.dropTablevisible=true;
		},
		submit:function(){
			//添加提交
			if(this.dialogStatus=='add'){
				let that=this,
				createUsername='addtor',
				updateUsername='editor';
				this.currentLineData.createTime=new Date().toISOString();
				this.currentLineData.updateTime=new Date().toISOString();
				this.currentLineData.createUsername=createUsername;
				this.currentLineData.updateUsername=updateUsername;
				this.$axios({
					url:process.env.API_HOST+`/machinesGroup/add?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,
					method:'post',
					data:JSON.stringify(that.currentLineData),
				})
				.then((res)=>{
					console.log(res);
					this.$store.commit(appManagetypes.turnDialogFormVisible,false);
					this.$store.commit(appManagetypes.setCurrentLineData,{
						roomCode: '',
						roomName: '',
						roomAddress:'',
						status:'',
						chargeman: '',
						roomMobile:'',
						machineIp: '',
						machineName: '',
						roomEmail: '',
						remark: '',
						}
					)
				})
				.catch((err)=>{
					console.log(err)
				})
			}
			//编辑提交
			else if(this.dialogStatus=='edit'){
				let that=this,
				updateUsername='editor';
				this.currentLineData.updateTime=new Date().toISOString();
				this.currentLineData.updateUsername=updateUsername;
				this.$axios({
					url:process.env.API_HOST+`/machinesGroup/update?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,
					method:'post',
					data:JSON.stringify(that.currentLineData),
				})
				.then((res)=>{
					console.log(res);
					this.$store.commit(appManagetypes.turnDialogFormVisible,false);
					this.$store.commit(appManagetypes.setCurrentLineData,{
						roomCode: '',
						roomName: '',
						roomAddress:'',
						status:'',
						chargeman: '',
						roomMobile:'',
						machineIp: '',
						machineName: '',
						roomEmail: '',
						remark: '',
						}
					)
				})
				.catch((err)=>{
					console.log(err)
				})
			}
		},
		close:function(){
			let that=this;
			Object.keys(that.currentLineData).forEach((key)=>{
				if(that.currentLineData[key]!=''){
					that.formEmpty=true
				}
			});
			if(this.formEmpty){
				that.$confirm('检测到表单内容非空，是否要关闭？','确认信息',{
							showClose:false,
							customClass:this.theme
				})
				.then(()=>{
					that.$store.commit(appManagetypes.turnDialogFormVisible,false);
					that.$store.commit(appManagetypes.setCurrentLineData,{
						appCode: '',
						appName: '',
						englishName:'',
						status: '',
						loginName:'',
						url: '',
						password: '',
						remark:''
					});
				})
				.catch(()=>{
					return false
				})
			}
			else{
				that.$store.commit(appManagetypes.turnDialogFormVisible,false);
				that.$store.commit(appManagetypes.setCurrentLineData,{
					appCode: '',
					appName: '',
					englishName:'',
					status: '',
					loginName:'',
					url: '',
					password: '',
					remark:''
				});
			};
			that.formEmpty=false;
			
		},
		cancel:function(){
			this.$store.commit(appManagetypes.turnDialogFormVisible,false);
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