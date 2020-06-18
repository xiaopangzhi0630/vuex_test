<template>
    <div>
        <datable :colum="tableColumn" :table="tableDatas" :selector="selector"></datable>
    </div>
</template>
<script>
import datable from './3_'
export default {
    name:'',
    components:{
        datable
    },
    data:function(){
        return{
            tableColumn:[
				{prop:'moduleCode',label:'模块编号',width:'100'},
				{prop:'moduleName',label:'模块名称',width:'140'},
				{prop:'appName',label:'所属应用系统',width:'140'},
				{prop:'englishName',label:'模块英文名称',width:'140'},
				{prop:'appCode',label:'所属应用系统编码',width:'140'},
				{prop:'url',label:'模块Url',width:'140'},
				{prop:'status',label:'状态',width:'100'},
				{prop:'moduleServiceCode',label:'模块服务码',width:'100'},
				{prop:'remark',label:'模块概述',width:''}
            ],
            tableDatas:[{
                moduleCode:'M001',
                moduleName:'模块1',
                appName:'应用1',
                englishName:'eng',
                appCode:'A001',
                url:'http://baidu.com',
                status:'启用',
                moduleServiceCode:'S001',
                remark:'封装数据表格组件'
            }],
            selector:false
        }
    },
    methods: {

    },
}
</script>