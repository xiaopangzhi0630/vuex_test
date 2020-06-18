<template>
    <div class="dropTable" v-show="dropTablevisible">

        <div class="dropTable-search">
            <el-form :model="form">
                <el-form-item>
                    <el-input v-model="form.keyWords" placeholder="请输入关键字" ></el-input>
                    <i class="el-icon-search"></i>
                </el-form-item>
            </el-form>
        </div>
      <div class="dropTable-container">
        <el-table
            :data="tableDatas"
            style="width: 100%"
            :border="false"
            :height="338"
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
            v-for="(item,index) in data" :key=index
            :prop="item.prop"
            :label="item.label"
            :width="item.width">
            </el-table-column>
           
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange1"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next, jumper"
            :total="999">
        </el-pagination>
      </div>  
    </div>
</template>
<script>
export default {
    name:'DropTable',
    data:function(){
        return{
            currentPage:1,
            form:{
                keyWorlds:''
            },
            tableDatas:[],
            size:10,
        }
    },
    props:["data",'dropTablevisible'],
    mounted:function(){
        this.$emit("queryPageList",this.currentPage,this.size,JSON.stringify(this.form.keyWorlds));
    },
    methods:{
      //序列
      indexMethod(index) {
        return index+1;
      },
      //size
      handleSizeChange(val) {
       this.size=val;
       this.$emit("queryPageList",this.currentPage,this.size,JSON.stringify(this.form.keyWorlds));
      },
       //单选
      handleCurrentChange(val) {
        this.$store.commit(appManagetypes.setCurrentLineData,val);
      },
      //page
      handleCurrentChange1(val) {
        this.currentPage=val;  
        this.$emit("queryPageList",this.currentPage,this.size,JSON.stringify(this.form.keyWorlds));
      },
      queryPageList:function(appInfo){
         this.$axios.post(process.env.API_HOST+`/moduleInfo/selectByPage?page=${this.currentPage}&size=${this.pageSize}`,appInfo).then((res)=>{
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
      }
    }
}
</script>
<style scoped>
.dropTable{
    position: absolute;
    box-sizing: border-box;
	z-index: 99;
	top: 46px;
	left: 0;
	width: 710px;
    height: 460px;
    padding: 10px;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,.2);
}
.dropTable .dropTable-search{
    margin-bottom: 16px;
    height: 30px;
}

.dropTable .dropTable-container{
    box-sizing: border-box;
    border: 1px solid rgba(240,240,240);
    border-radius: 4px;
    background-color: #fff;
}
.dropTable .dropTable-container .el-pagination{
    margin-top: 12px;
}
.dropTable .el-icon-search{
    position: absolute;
    left: 10px;
    top:12px;
    font-size: 18px;
}
</style>