<template>
	<div>
		<el-dialog 
		:title="title" 
		width="860px"
		:visible="dialogFormVisible"
		:append-to-body=true
		@close="close"
		>
		  <el-form :model="currentLineData" ref="currentLineData" :rules="rules" status-icon class="clearfix" label-width="140px">
		  	<div class="formBlock">
			    <el-form-item label="应用系统编码" prop="appCode">
			      <el-input v-model="currentLineData.appCode" autocomplete="off"></el-input>
			    </el-form-item>

			    <el-form-item label="应用系统名称" prop="appName">
			      <el-input v-model="currentLineData.appName" autocomplete="off"></el-input>
			    </el-form-item>

			    <el-form-item label="应用系统英文名称" prop="englishName">
			      <el-input v-model="currentLineData.englishName" autocomplete="off"></el-input>
			    </el-form-item>

				<el-form-item label="登录用户名" prop="loginName">
			      <el-input v-model="currentLineData.loginName" autocomplete="off"></el-input>
			    </el-form-item>
		    </div>

		    <div class="formBlock">
				<el-form-item label="状态" prop="status">
			      <el-select v-model="currentLineData.status" placeholder="请选择">
					<el-option v-for="item in statusInfo" :key="item.code" :label="item.name" :value="item.code"></el-option>
				  </el-select>
			    </el-form-item>

				<el-form-item label="系统访问Url" prop="url">
			      <el-input v-model="currentLineData.url" autocomplete="off"></el-input>
			    </el-form-item>

				<el-form-item label="系统登录密码" prop="password">
			      <el-input v-model="currentLineData.password" autocomplete="off"></el-input>
			    </el-form-item>

				<el-form-item label="系统概述" prop="remark">
			      <el-input v-model="currentLineData.remark" autocomplete="off"></el-input>
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
		var validaAppcode = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('应用编码不能为空'));
			}

		};
		return{
			formEmpty:false,
			formLabelWidth: '120px',
			statusInfo:[],
			rules: {
				appCode: [
					{ validator: validaAppcode, trigger: 'blur' }
				]
			}
			// rules: {
            //   appCode: [
            //     { validator:validaAppcode,trigger: 'blur' },
            //   ],
            //   appName: [
            //    { validator:validaAppName,trigger: 'blur' },
            //   ],
            //   englishName: [
            //    { validator:validaEnglishName,trigger: 'blur' },
			//   ],
			//   loginName: [
            //     { validator:validaLoginName,trigger: 'blur' },
            //   ],
            //   url: [
            //      { validator:validaUrl,trigger: 'blur' },
            //   ],
			//   password: [
            //     { validator:validaPassword,trigger: 'blur' },
			//   ]
            // }
		}
	},
	computed:{
		...mapGetters(['theme','dialogFormVisible','title','currentLineData','dialogStatus','currentPage','pageSize','fullHeight']),
	},
	mounted:function(){
		this.queryStatus()
	},
	methods:{
		 //查询所有状态
		queryStatus:function(){
			this.$axios.get(process.env.API_HOST+'/appInfo/dropdown')
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
				this.$axios({
					url:process.env.API_HOST+`/appInfo/add?page=${this.currentPage}&size=${this.pageSize}`,
					method:'post',
					data:JSON.stringify(that.currentLineData),
				})
				.then((res)=>{
					console.log(res);
					this.$store.commit(appManagetypes.turnDialogFormVisible,false);
					this.$store.commit(appManagetypes.setCurrentLineData,{
						appCode: '',
						appName: '',
						englishName:'',
						status: '',
						loginName:'',
						url: '',
						password: '',
						remark:''
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
					url:process.env.API_HOST+`/appInfo/update?page=${this.currentPage}&size=${this.pageSize}`,
					method:'post',
					data:JSON.stringify(that.currentLineData),
				})
				.then((res)=>{
					console.log(res);
					this.$store.commit(appManagetypes.turnDialogFormVisible,false);
					this.$store.commit(appManagetypes.setCurrentLineData,{
						appCode: '',
						appName: '',
						englishName:'',
						status: '',
						loginName:'',
						url: '',
						password: '',
						remark:''
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
