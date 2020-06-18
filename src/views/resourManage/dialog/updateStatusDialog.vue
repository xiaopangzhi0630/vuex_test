<template>
	<div>
		<el-dialog 
		title="服务器状态变更" 
		width="880px"
		:visible="dialogUpdateStatusVisible"
		:close-on-click-modal=false
		:append-to-body=true
		@close="close"
		>
		  <el-form :model="lineData" class="clearfix" label-width="140px">
		  	<div class="formBlock">
			    <el-form-item label="服务器编码" >
			      <el-input v-model="lineData.machineCode" autocomplete="off"  disabled></el-input>
			    </el-form-item>
			    <el-form-item label="服务器名称">
			       <el-input v-model="lineData.machineName" autocomplete="off"  disabled></el-input>
			    </el-form-item>
				<el-form-item label="服务器IP">
				  <el-input v-model="lineData.machineIp" autocomplete="off" disabled></el-input>
				</el-form-item>
			    <el-form-item label="服务器状态">
		            <el-select v-model="lineData.status_" placeholder="请选择">
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
			type:true,
            dropTablevisible:false,
            currentLineData:{},
		}
    },
	computed:{
		 ...mapGetters('resourManage',['dialogUpdateStatusVisible','lineData']),
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
		submit:function(){
             this.$axios.get(process.env.API_HOST+`/machineInfo/updateStatus/${this.lineData.machineCode}?status=${this.lineData.status_}`)
             .then((res)=>{
                 this.$store.commit('resourManage/setDialogUpdateStatusVisible',false);
                 let status_=this.lineData.status_,status=this.lineData.status;
                 status_== 1 ? this.lineData.status="使用中"
                        : status_== 2 ? this.lineData.status="待分配" 
                        : status_== 3 ? this.lineData.status="待回收" 
                        : status_== 4 ? this.lineData.status="重新分配" 
                        : status_== 5 ? this.lineData.status="已报废" 
                        : status_== 6 ? this.lineData.status="已关机" : this.lineData.status="";
                this.$message({
                    showClose:false,
                    type:'success',
                    message:'恭喜，服务器状态修改成功！',
                    center:'center',
                    offset:this.fullHeight/2,
			    })
             })
             .catch((res)=>{
                this.$message({
                    showClose:false,
                    type:'success',
                    message:'服务器状态修改失败！',
                    center:'center',
                    offset:this.fullHeight/2,
			    })
             })
		},
		close:function(){
            this.$store.commit('resourManage/setDialogUpdateStatusVisible',false)
		},
		cancel:function(){
            this.$store.commit('resourManage/setDialogUpdateStatusVisible',false)
			this.$message({
				showClose:false,
				type:'success',
				message:'操作已取消',
				center:'center',
				offset:this.fullHeight/2,
			})
        },
        reset:function(){
             this.$store.commit('resourManage/setDialogUpdateStatusVisible',false);
             this.$message({
				showClose:false,
				type:'success',
				message:'操作已取消',
				center:'center',
				offset:this.fullHeight/2,
			})
        }
		
	}
}
</script>