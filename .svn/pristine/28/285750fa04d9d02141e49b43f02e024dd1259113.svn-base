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
			    <el-form-item label="应用系统编码" >
			      <el-input v-model="currentLineData.appCode" autocomplete="off" placeholder="请选择"></el-input>
			    </el-form-item>
				<el-form-item label="应用系统名称" >
					<el-input v-model="currentLineData.appName" autocomplete="off" placeholder="请选择系统编码"  :disabled="true"></el-input>
				</el-form-item>

			    <el-form-item label="应用模块编码">
			       <el-input v-model="currentLineData.moduleCode" autocomplete="off" placeholder="请选择" @focus="focus"></el-input>
				   <DropTable :data="tableColumn" :dropTablevisible="dropTablevisible" @queryPageList="queryPageList"></DropTable>
			    </el-form-item>
				<el-form-item label="模块名称">
				  <el-input v-model="currentLineData.moduleName" autocomplete="off" placeholder="请选择模块编码" :disabled="true"></el-input>
				</el-form-item>
			    <el-form-item label="启动脚本路径" >
			      <el-input v-model="currentLineData.startScript" autocomplete="off" placeholder="请输入启动脚本路径" ></el-input>
			    </el-form-item>

				<el-form-item label="系统监控URL" >
			      <el-input v-model="currentLineData.url" autocomplete="off"  placeholder="请输入系统监控URL"></el-input>
			    </el-form-item>
				<el-form-item label="鉴权用户名" >
			      <el-input v-model="currentLineData.authName" autocomplete="off" placeholder="请输入鉴权用户名"></el-input>
			    </el-form-item>
				<el-form-item label="鉴权密码">
					<el-input v-model="currentLineData.authPassword" autocomplete="off"  placeholder="请输入鉴权密码"></el-input>
				</el-form-item>
				<el-form-item label="发布方式" >
					<el-select v-model="currentLineData.publishMode" placeholder="请选择" @click.native="publishMode" >
					<el-option label="按照服务器分组发布" value="1"></el-option>
					<el-option label="按照服务器发布" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="服务器分组编码" v-if="currentLineData.publishMode=='1'">
					<el-input v-model="currentLineData.groupCode" autocomplete="off"  placeholder="请输入鉴权密码"></el-input>
				</el-form-item>
				<el-form-item label="服务器分组名称" v-if="currentLineData.publishMode=='1'">
					<el-input v-model="currentLineData.groupName" autocomplete="off"  placeholder="请输入鉴权密码"></el-input>
				</el-form-item>
				<el-form-item label="服务器编码" v-if="currentLineData.publishMode=='2'">
					<el-input v-model="currentLineData.groupCode" autocomplete="off"  placeholder="请输入鉴权密码"></el-input>
				</el-form-item>
				<el-form-item label="服务器名称" v-if="currentLineData.publishMode=='2'">
					<el-input v-model="currentLineData.groupName" autocomplete="off"  placeholder="请输入鉴权密码"></el-input>
				</el-form-item>
				<el-form-item label="应用状态">
					<el-select v-model="currentLineData.status" placeholder="请选择" @click.native="queryStatus" >
						<el-option v-for="item in statusInfo" :key="item.code" :label="item.name" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
			
				<el-form-item label="接口描述" class="remark">
				  <el-input type="textarea" v-model="currentLineData.remark" placeholder="请输入接口描述"></el-input>
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
import DropTable from '../../../components/table/dropTable'
import {mapGetters,mapState,mapActions} from 'vuex'
export default{
	name:'Dialog',
	components:{
		DropTable
	},
	data:function(){
		return{
			formEmpty:false,
			formLabelWidth: '120px',
			statusInfo:[{code:null,name:null}],
			type:true,
			dropTablevisible:false,
			tableColumn:[
				{prop:'moduleCode',label:'模块编号',width:'120'},
				{prop:'moduleName',label:'模块名称',width:'140'},
				{prop:'appName',label:'所属应用系统',width:'140'},
				{prop:'englishName',label:'模块英文名称',width:'140'},
				{prop:'appCode',label:'所属应用系统编码',width:'140'},
				{prop:'url',label:'模块Url',width:'120'},
				{prop:'status',label:'状态',width:'120'},
				{prop:'moduleServiceCode',label:'模块服务码',width:'100'},
				{prop:'remark',label:'模块概述',width:''}
			] 
		}
	},
	computed:{
		...mapGetters(['theme','dialogFormVisible','title','currentLineData','dialogStatus','currentPage','pageSize','fullHeight']),
	},
	mounted:function(){
		let that=this;
		document.addEventListener('click', function (e) {
		let flag = e.target.contains(document.getElementsByClassName('dropTable')[0]);
		console.log(flag);
		if(!flag) return
		that.dropTablevisible = false
		})
	},
	methods:{
		//查询子页面表格分页
		queryPageList:function(currentPage,pageSize,appInfo){
			this.$axios.post(process.env.API_HOST+`/moduleInfo/selectByPage?page=${currentPage}&size=${pageSize}`,appInfo).then((res)=>{
            let that=this;
            let resData=res.data.data;
            resData.find((value,index,arr)=>{
              let cellObj={}
              cellObj.moduleCode=value.moduleCode;
              cellObj.moduleName=value.moduleName;
              cellObj.appName=value.appName;
              cellObj.englishName=value.englishName;
              cellObj.appCode=value.appCode;
              cellObj.url=value.url;
              cellObj.status=value.status;
              cellObj.moduleServiceCode=value.moduleServiceCode;
              cellObj.remark=value.remark;
              that.tableDatas.push(cellObj);
            })
            
        }).catch((err)=>{
            console.log(err);
        })
		},
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
					url:process.env.API_HOST+`/deployInfo/add?page=${this.currentPage}&size=${this.pageSize}`,
					method:'post',
					data:JSON.stringify(that.currentLineData),
				})
				.then((res)=>{
					console.log(res);
					this.$store.commit(appManagetypes.turnDialogFormVisible,false);
					this.$store.commit(appManagetypes.setCurrentLineData,{
						appCode: '',
						appName: '',
						moduleCode:'',
						moduleName:'',
						groupCode: '',
						machineCode:'',
						machineIp: '',
						machineName: '',
						startScript: '',
						status: '',
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
					url:process.env.API_HOST+`/deployInfo/update?page=${this.currentPage}&size=${this.pageSize}`,
					method:'post',
					data:JSON.stringify(that.currentLineData),
				})
				.then((res)=>{
					console.log(res);
					this.$store.commit(appManagetypes.turnDialogFormVisible,false);
					this.$store.commit(appManagetypes.setCurrentLineData,{
						interfaceCode: '',
						interfaceName: '',
						interfaceUrl:'',
						requestMethod: '',
						requestProtocal:'',
						status: '',
						interfaceClassname: '',
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