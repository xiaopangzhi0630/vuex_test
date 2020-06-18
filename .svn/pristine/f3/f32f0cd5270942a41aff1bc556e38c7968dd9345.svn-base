<template>
	<div>
		<el-dialog 
		title="服务器分组选择"
		width="880px"
		:visible="machineGroupVisible"
		:close-on-click-modal=false
		:append-to-body=true
		@close="close"
		>
		<el-form :model="lineData" class="clearfix" label-width="140px">
			<div class="formBlock">
				<el-form-item label="分组服务器编码" style="width:420px;">
					<el-input v-model="lineData.groupCode" autocomplete="off" placeholder="请选择" :disabled=true></el-input>
				</el-form-item>
				<el-form-item label="分组服务器名称" style="width:420px;">
					<el-input v-model="lineData.groupName" autocomplete="off" placeholder="请输入区域机房名称" :disabled=true></el-input>
				</el-form-item>
			</div>
		</el-form>
		<div class="machineSelected clearfix">
			<li class="label">已选服务器</li>
			<li class="container">
				<ul class="machineCell" v-for="(item,index) in machineCellSelected" :key="index">
					<li class="name">{{item.machineName}}</li>
					<li class="close" @click="remove(index)"><svg class="icon" aria-hidden="true"><use xlink:href="#close"></use></svg></li>
				</ul>
			</li>
        </div>
		<div class="machineSearch">
			<el-form :model="form">
                <el-form-item>
                    <el-input v-model="form.keyWords" placeholder="请输入关键字" ></el-input>
                    <i class="el-icon-search"></i>
					<li class="searchBtn" @click="queryPageList">搜索</li>
                </el-form-item>
            </el-form>
		</div>
		<div class="machineGroupTable">
			<el-table
				:data="tableDatas"
				style="width: 100%"
				:border="false"
				:height="350"
				@selection-change="handleSelectionChange"
				>
				<el-table-column
				type="selection"
				width="50">
				</el-table-column>
				<el-table-column
				fixed
				type="index"
				:index="indexMethod"
				label="序号"
				width="60"
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
				width="180">
				</el-table-column>
				<el-table-column
				prop="machineIp"
				label="服务器IP"
				width="120">
				</el-table-column>
				<el-table-column
				prop="machineType"
				label="服务器类型" 
				width="100">
				</el-table-column>
				<el-table-column
				prop="operatingSystem"
				label="操作系统" 
				width="100">
				</el-table-column>
				<el-table-column
				prop="deployRoot"
				label="部署根目录" 
				width="100">
				</el-table-column>
				<el-table-column
				prop="status"
				label="状态" 
				width="80">
				</el-table-column>
     		</el-table>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="10"
				layout="total,sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
		
		<div slot="footer" class="dialog-footer">
		<el-button @click="cancel">取消</el-button>
		<el-button type="primary" @click="submit" >提交</el-button>
		</div>
		</el-dialog>
	</div>
</template>
<script>
import {mapGetters,mapState,mapActions} from 'vuex'
export default{
    name:'Dialog',
	data:function(){
		return{
			formLabelWidth: '120px',
			//表格
			tableDatas:[],
			total:0,
			pageSize:10,
			currentPage:1,
			form:{keyWords:''},
			//分组中已存在的服务器 | 回显 | 如果没有变化，无需提交到服务器
			machineCellSelected:[],
			//当前选中的行
			mutiplelines:[],
			//已经选中的集合
			machineSelected:[]
		}
	},
	computed:{
        ...mapGetters(['fullHeight']),
		...mapGetters('resourManage',['lineData','machineGroupVisible']),
	},
	watch:{
		lineData:function(val){
			this.machineCellSelected=val.machinesInfos;
		},
		machineGroupVisible:function(val){
			if(val){
				this.queryPageList()
			}
		}
		
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
		handleSelectionChange:function(val){
			val.find((value,index,arr)=>{
				this.mutiplelines=[];
				let cellObj1={},cellObj2={};
				cellObj1.machineCode=value.machineCode;
				cellObj1.machineName=value.machineName;

				cellObj2.machineCode=value.machineCode;
				cellObj2.machineName=value.machineName;

				this.mutiplelines.push(cellObj1);  //获取每次选中的，单一行

				this.machineSelected.push(cellObj2) //获取累计选中的，多行
			})
			this.machineCellSelected=[...this.machineCellSelected,...this.mutiplelines];
		}, 
		handleSizeChange:function(){
			this.pageSize=val;
			this.tableDatas=[];
			this.queryPageList();
		}, 
		handleCurrentChange:function(val){
			this.currentPage=val;
			this.tableDatas=[];
			this.queryPageList();
		},
		//序列
		indexMethod(index) {
			return index+1;
		},
		submit:function(){
			let obj={},arr=[];
			obj.groupCode=this.lineData.groupCode;
			this.machineCellSelected.find((val)=>{
				arr.push(val.machineCode)
			});
			obj.machineCodes=JSON.stringify(arr);
			this.$axios({
							url:process.env.API_HOST+`/machinesGroup/select`,
							method:'post',
							data:JSON.stringify(obj),
						})
			.then((res)=>{
				console.log(res)
				this.$store.commit('resourManage/setMachineGroupVisible',false);
				this.$message({
					showClose:false,
					type:'success',
					message:'恭喜，服务器分组更新成功！',
					center:'center',
					offset:this.fullHeight/2,
				});
				this.$parent.refreshPageList();
			})
			.catch((err)=>{
				this.$message({
					showClose:false,
					type:'error',
					message:'抱歉，服务器分组设置失败！',
					center:'center',
					offset:this.fullHeight/2,
				})
			})

		},
		close:function(){
			this.$store.commit('resourManage/setMachineGroupVisible',false);
			this.$parent.refreshPageList();
		},
		cancel:function(){
			this.$store.commit('resourManage/setMachineGroupVisible',false);
			this.$message({
				showClose:false,
				type:'success',
				message:'已取消服务器分组选择',
				center:'center',
				offset:this.fullHeight/2,
			});
			this.$parent.queryPageList();
		},
		remove:function(index){
			this.machineCellSelected.splice(index,1);
		},
		queryPageList:function(){
			this.$axios.post(process.env.API_HOST+`/machineInfo/unSelected?pageNum=${this.currentPage}&pageSize=${this.pageSize}&keyWord=${this.form.keyWords}`)
				.then((res)=>{
					console.log(res.data.data.list);
					let that=this;
					let resData=res.data.data.list;
					if(resData){
						that.tableDatas=[];
						that.total=res.data.data.total;
						resData.find((value,index,arr)=>{
							let cellObj={}
							cellObj.id=value.id;
							cellObj.machineCode=value.machineCode;
							cellObj.machineName=value.machineName;
							cellObj.machineType=value.machineType;
							cellObj.machineIp=value.machineIp;
							cellObj.operatingSystem=value.operatingSystem;
							cellObj.status=value.status;
							cellObj.deployRoot=value.deployRoot;
							that.tableDatas.push(cellObj);
						});
						this.$message({
							showClose:false,
							type:'success',
							message:'列表刷新成功！',
							center:'center',
							offset:this.fullHeight/2,
						})
					}
				})
				.catch((err)=>{
					this.$message({
						showClose:false,
						type:'error',
						message:'抱歉，查询失败或无匹配项！',
						center:'center',
						offset:this.fullHeight/2,
					})
				})
		},
	}
}
</script>
<style>
.machineSelected{
	margin-bottom: 24px;
}
.machineSelected .label{
	float: left;
	box-sizing: border-box;
	width: 140px;
	text-align: right;
	padding: 12px 12px 0 0;
}
.machineSelected .container{
	float: left;
	width: 698px;
	height: 100px;
	border:1px solid #DCDFE6;
	border-radius: 4px;
	overflow-x: hidden;
	overflow-y: auto;
}
.machineSelected .container .machineCell{
	position: relative;
	display: inline-block;
}
.machineSelected .container .name{
	margin: 14px;
	color: #fff;
	padding: 4px 14px;
	border-radius: 8px;
	background-color: rgba(0,0,0,.6);
}
.machineSelected .container .close{
	position: absolute;
	right: 2px;
	top: 2px;
	width: 22px;
	height: 22px;
	border-radius: 50%;
	color: #fff;
	font-size: 1.4rem;
	text-align: center;
	line-height: 22px;
	background-color: rgba(0,0,0,.8);
	cursor: pointer;
}
.machineSearch .el-form-item{
	position: relative;
	margin-bottom: 12px;
}
.machineSearch .el-form-item input{
	text-indent: 24px;
}
.machineSearch .el-icon-search{
	position: absolute;
	left: 10px;
    top:12px;
    font-size: 18px;
}
.machineSearch .searchBtn{
	position: absolute;
	right: 0;
	top: 0;
	width: 60px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 1.4rem;
	color: #fff;
	border-radius: 0 4px 4px 0;
	background-color: #409eff;
	cursor: pointer;
}
.machineSearch .searchBtn:hover{
	background-color: rgba(64,158,255,.8);
}
.machineGroupTable{
	box-sizing: border-box;
    border: 1px solid rgba(240,240,240);
    border-radius: 4px;
}
</style>