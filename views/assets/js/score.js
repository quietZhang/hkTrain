/**
 * Created by "zhangHeng" on 2018/1/30 0030.
 */
var pageNow=1;
var pageSum;
var pagesize=10;
getSroreList();
//分页查询日志
function getSroreList() {
    var settings = {
        "url":"getRecord",
        "method": "POST",
        "async":"false",
        "data":{
            user:readData('USER_KEY').name,
            token:readData('USER_KEY').token,
            card_id:150011,
            page:pageNow,
            pageSize:pagesize,
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.code==0){
            var data=response.data;
            var html='';
            for(var i = 0;i<data.length;i++){
                if(pageNow==1){
                    var k=i+1;
                }else{
                    var k = parseInt((pageNow-1)*pagesize+i+1);
                }
                html+="<tr>"
                html+="<td style='font-size:14px;width: 4%;'>"+k+"</td><td style='font-size:14px;width: 5%'>"+data[i].unit_first+"</td>" +
                    "<td style='font-size:14px;width: 5%;'>"+data[i].unit_second+"</td><td style='font-size:14px;width: 15%;'>"+data[i].project+"</td>" +
                    "<td style='font-size:14px;width: 10%;'>"+data[i].subject+"</td><td style='font-size:14px;width: 7%;'>"+data[i].card_id+"</td>" +
                    "<td style='font-size:14px;width: 7%;'>"+data[i].name+"</td><td style='font-size:14px;width: 7%;'>"+data[i].achievement+"</td>" +
                    "<td style='font-size:14px;width: 7%;'>"+data[i].evaluation+"</td><td style='font-size:14px;width: 15%;'>"+getMyDate(data[i].check_time)+"</td>" +
                    "<td style='font-size:14px;width: 10%;'>"+data[i].remark+"</td>" +
                    "<td style='font-size:14px;'><span class='label label-info' style='cursor: pointer;margin-right: 10px' onclick='bianji(" + data[i].id + ")''><i class='glyphicon glyphicon-edit'>&nbsp;</i>编辑</span>" +
                    "<span class='label label-danger' style='cursor: pointer;' onclick='shanchu(" + data[i].id + ")''><i class='glyphicon glyphicon-remove'>&nbsp;</i>删除</span></td>"
                html+="</tr>"
            }
            if(pagesize != data.length){
                for(var j = 0;j<pagesize-data.length;j++){
                    html+="<tr style='height:37px;'></tr>";
                }
            }
            $('#scoreList').html(html);
            $('#tiaoshu').text(response.total)
            pageSum=response.total/pagesize;
            pageSum=Math.ceil(pageSum);
            var pageInSum=pageNow+"/"+pageSum
            $('#pageNum').text(pageInSum);
        } else {
            win.alert('提示',response.msg);
        }
    });
}

//初始化为第一页 获取日志列表
getSroreList();
//第一页
function first(){
    if(pageNow==1){
        win.alert("提示","已是第一页");
        return;
    }
    pageNow=1;
    getSroreList();
}
//上一页
function prevpage(){
    if(pageNow==1){
        win.alert("提示","已是第一页");
        return
    }
    pageNow--;
    getSroreList();
}
//下一页
function nextpage(){
    if(pageNow==pageSum){
        win.alert("提示","已是最后一页");
        return;
    }
    pageNow++;
    getSroreList();
}
//最后一页
function last(){
    if(pageNow==pageSum){
        win.alert("提示","已是最后一页");
        return;
    }
    pageNow=pageSum;
    getSroreList();
}
//按页数查询
function selectByPage(){
    if($('#ty').val()==''){
        pageNow=1;
        getSroreList();
        return;
    }else if($('#ty').val()<1||$('#ty').val()>pageSum){
        win.alert('提示','输入页数为正数且不能大于'+pageSum);
        $('#ty').val('');
        return;
    }else{
        pageNow=$('#ty').val();
        getSroreList();
        return;
    }

}
//转换时间
function getMyDate(timeStamp) {
    var newDate = new Date();
    newDate.setTime(timeStamp);
    Date.prototype.pattern=function(fmt) {
        var o = {
            "M+" : this.getMonth()+1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours(), //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S" : this.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }

    return newDate.pattern("yyyy-MM-dd hh:mm:ss");
};
//选中默认每页条数查询
function selectPageSize(){
    for(var i=0;i<$('#pagesize option').length;i++){
        if($('#pagesize option').eq(i).is(':selected') == true){
            pagesize = $('#pagesize option').eq(i).val();
            selectByPage();
        }
    }
}

function add(){
    $('.box').css('display','block');
}


//新增窗口关闭
function close1(){
    $("#box").hide()
}