<template>
	<div>
		<el-dialog 
		:title="title" 
		width="860px"
		:visible="dialogFormVisible"
		:append-to-body=true
		@close="close"
		>
		  <el-form :model="currentLineData" status-icon :rules="rules" class="clearfix" label-width="140px">
		  	<div class="formBlock">
			    <el-form-item label="接口编码" prop="interfaceCode">
			      <el-input v-model="currentLineData.interfaceCode" autocomplete="off"></el-input>
			    </el-form-item>

			    <el-form-item label="接口类名称" prop="interfaceClassname">
			      <el-input v-model="currentLineData.interfaceClassname" autocomplete="off"></el-input>
			    </el-form-item>

			    <el-form-item label="接口URL" prop="interfaceUrl">
			      <el-input v-model="currentLineData.interfaceUrl" autocomplete="off"></el-input>
			    </el-form-item>

				<el-form-item label="接口协议" prop="requestProtocal">
			      <el-input v-model="currentLineData.requestProtocal" autocomplete="off"></el-input>
			    </el-form-item>
				<el-form-item label="接口描述" prop="remark">
			      <el-input v-model="currentLineData.remark" autocomplete="off"></el-input>
			    </el-form-item>

		    </div>

		    <div class="formBlock">
			    <el-form-item label="接口名称" >
			      <el-input v-model="currentLineData.interfaceName" autocomplete="off"></el-input>
			    </el-form-item>
				<el-form-item label="所属模块系统">
			      <el-select v-model="currentLineData.moduleCode" placeholder="请选择">
			        <el-option label="模块1" value="m1"></el-option>
			        <el-option label="模块2" value="m2"></el-option>
					<el-option label="模块3" value="m3"></el-option>
			      </el-select>
			    </el-form-item>
				<el-form-item label="接口请求方式" >
			      <el-select v-model="currentLineData.requestMethod" placeholder="请选择">
			        <el-option label="get" value="get"></el-option>
			        <el-option label="psot" value="post"></el-option>
			      </el-select>
			    </el-form-item>

				<el-form-item label="接口状态">
					<el-select v-model="currentLineData.status" placeholder="请选择" @click.native="queryStatus" >
						<el-option v-for="item in statusInfo" :key="item.code" :label="item.name" :value="item.code"></el-option>
					</el-select>
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
			rules: {
				interfaceCode: [
					{ required: true, message: '请输入接口编码', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				interfaceClassname: [
					{ required: true, message: '请输入接口类名称', trigger: 'blur' }
				],
				interfaceUrl: [
					{ required: true, message: '请输入接口url', trigger: 'blur' }
				],
				requestProtocal: [
					{ required: true, message: '请输入接口协议', trigger: 'blur' }
				],
				remark: [
					{ required: true, message: '请输入接口描述', trigger: 'blur' },
					{ min: 10, max: 50, message: '长度在 10 到 50 个字符', trigger: 'blur' }
				]
			}
		}
	},
	computed:{
		...mapGetters(['theme','dialogFormVisible','title','currentLineData','dialogStatus','currentPage','pageSize','fullHeight']),
	},
	methods:{
		//查询状态
		queryStatus:function(){
        this.$axios.get(process.env.API_HOST+'/serviceInterface/eject?eject=add')
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
				console.log(this.currentLineData);
				this.$axios({
					url:process.env.API_HOST+`/serviceInterface/addServiceInterface?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,
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
			//编辑提交
			else if(this.dialogStatus=='edit'){
				let that=this,
				updateUsername='editor';
				this.currentLineData.updateTime=new Date().toISOString();
				this.currentLineData.updateUsername=updateUsername;
				this.$axios({
					url:process.env.API_HOST+`/serviceInterface/updateServiceInterface?pageNum=${this.currentPage}&pageSize=${this.pageSize}`,
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
		}
	}
}
</script>
