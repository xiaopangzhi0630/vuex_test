// 1、保留小数位数
const tofix = function(val,acc) {
    let num = parseFloat(val);
        if (isNaN(num)) {
            num = 0;
        }
        let accuracy = parseInt(acc);
        if (isNaN(accuracy) || accuracy < 0 || accuracy > 10) {
            accuracy = 2;
        }
        return num.toFixed(accuracy);
}

//2、截取字符，并...显示
const maxLength=(value, num)=>{
    if (value) {
        if (value.split("").length > num) {
            return value.substr(0, num) + "...";
        } else {
            return value;
        }
    }
}
//3、日期格式化
const timeFormat = (value, format) => {
    let date = new Date(value);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    let result = "";
    if (format == undefined) {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${
        h < 10 ? "0" + h : h
      }:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
    }
    if (format == "yyyy-mm-dd") {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
    }
    if (format == "yyyy-mm") {
        result = `${y}-${m < 10 ? "0" + m : m}`;
    }
    if (format == "mm-dd") {
        result = ` ${mm < 10 ? "0" + mm : mm}:${ddmin < 10 ? "0" + dd : dd}`;
    }
    if (format == "hh:mm") {
        result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
    }
    if (format == "yyyy") {
        result = `${y}`;
    }
    return result;
};

 //4、秒、毫秒转时分秒显示  
 //例：65000 => 00:01:05
 //参数：isMs 是否是毫秒；dft：默认显示
const timeLongFormat=(value, isMs=false,dft = '00:00:00')=>{
    let total = parseInt(value);
    if (!isNaN(total)) {
        if (isMs) {
            total = total/1000;
        }
        let hours = parseInt(total / 3600);
        let minutes = parseInt((total % 3600) / 60);
        let seconds = parseInt((total % 3600) % 60);
        let h = hours > 9 ? hours : '0' + hours;
        let m = minutes > 9 ? minutes : '0' + minutes;
        let s = seconds > 9 ? seconds : '0' + seconds;
        return h + ':' + m + ':' + s;
    }
    else {
        return dft;
    }      
}
//5、秒、毫秒（时长）格式化为时分秒(中文)
//65000ms => 1分5秒
const timeLongFormat_zh=(value, isMs = false, dft = '--')=>{
    let total = parseInt(value);
    if (!isNaN(total)) {
        if (isMs) {
            total = total / 1000;
        }
        let hours = parseInt(total / 3600);
        let minutes = parseInt((total % 3600) / 60);
        let seconds = parseInt((total % 3600) % 60);
        let h = hours == 0 ? "" : `${hours}时`;
        let m = minutes == 0 ? "" : `${minutes}分`;
        let s = seconds == 0 ? "" : `${seconds}秒`;
        return h + m + s;
    }
    else {
        return dft;
    }
}
//6、时间戳转日期
//使用方式: timestampToTime(1557285692393, 'Y-M-D h:m:s') // 2019-05-08 11:21:32
//能识别10位/13位时间戳
const timestampToTime=(value, format)=>{
  let timestamp;
  timestamp = value.toString().length == 10 ? value*1000 : value;
  if (!format) {
    format = "Y-M-D h:m:s";
  }
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(timestamp);
  returnArr.push(date.getFullYear());
  var m = date.getMonth() + 1;
  returnArr.push(m < 10 ? ('0' + m) : m);
  var d = date.getDate();
  returnArr.push(d < 10 ? ('0' + d) : d);
  var h = date.getHours();
  returnArr.push(h < 10 ? ('0' + h) : h);
  var m = date.getMinutes();
  returnArr.push(m < 10 ? ('0' + m) : m);
  var s = date.getSeconds();
  returnArr.push(s < 10 ? ('0' + s) : s);
  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
export {
    tofix,
    timeFormat,
    maxLength, 
    timeLongFormat,
    timeLongFormat_zh,
    timestampToTime
}