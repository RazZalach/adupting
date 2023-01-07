
function checkFile(name) {
  if (document.getElementById(name).value == "") {
      alert("נא לבחור קובץ להעלאה");
      return false;
  }
}

var proid = sessionStorage.getItem("proid");
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
var urlencoded = new URLSearchParams();
urlencoded.append("profileid", proid);
var requestOptions = {
method: 'POST',
headers: myHeaders,
body: urlencoded,
redirect: 'follow'
};

fetch("/prof/getbyid", requestOptions).then((res)=>{ return res.json()}).then((data)=>{ 

sessionStorage.setItem("status",data.msg.status );
if(data.msg.status == 1){

document.getElementById("stage1").style.display = "block";
}
if(data.msg.status == 2){
document.getElementById("stage2").style.display = "block";
}
if(data.msg.status == 3){
document.getElementById("stage3").style.display = "block";
}
if(data.msg.status == 4){
document.getElementById("stage4").style.display = "block";
}
if(data.msg.status == 5){
document.getElementById("stage5").style.display = "block";
}
if(data.msg.status == 6){
document.getElementById("stage6").style.display = "block";
}

});




function save_salary(){
var myHeaders1 = new Headers();
myHeaders1.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded1 = new URLSearchParams();
var options = document.getElementsByName("salary");
for (i = 0; i < options.length; i++) {
if (options[i].checked) {
urlencoded1.append("salary",options[i].value);
break;
}
}

urlencoded1.append("profileid", sessionStorage.getItem("proid"));

var requestOptions1 = {
method: 'POST',
headers: myHeaders1,
body: urlencoded1,
redirect: 'follow'
};

fetch("/prof/salary", requestOptions1).then((res)=>{ return res.json()}).then((data)=>{ 

});
rundecision(); 

}

function save_region(){
const region = document.getElementById("region").value;
var myHeaders2 = new Headers();
myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded2 = new URLSearchParams();
urlencoded2.append("region", region);
urlencoded2.append("profileid", sessionStorage.getItem("proid"));

var requestOptions2 = {
method: 'POST',
headers: myHeaders2,
body: urlencoded2,
redirect: 'follow'
};


fetch("/prof/region", requestOptions2).then((res)=>{ return res.json()}).then((data)=>{ 

});
rundecision();


}


function rundecision(){

var myHeaders3 = new Headers();
myHeaders3.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded3 = new URLSearchParams();
urlencoded3.append("decisionid", "sr4hhz4");
urlencoded3.append("profileid", sessionStorage.getItem("proid"));

var requestOptions3 = {
method: 'POST',
headers: myHeaders3,
body: urlencoded3,
redirect: 'follow'
};

fetch("/decision/run_manualy", requestOptions3).then((res)=>{ return res.json()}).then((data)=>{

     var myHeaders4 = new Headers();
myHeaders4.append("Content-Type", "application/x-www-form-urlencoded");
var urlencoded4 = new URLSearchParams();
urlencoded4.append("operation", "machine-decision: sr4hhz4 --change status to profile ");
urlencoded4.append("request", `from status: ${sessionStorage.getItem("status")} excute status change with profile id : ` +sessionStorage.getItem("proid"));
urlencoded4.append("deviceinfo", window.navigator.userAgent);
urlencoded4.append("response", JSON.stringify(data.msg));
var requestOptions4 = {
method: 'POST',
headers: myHeaders4,
body: urlencoded4,
redirect: 'follow'
};
fetch("/logs/slog", requestOptions4).then((res)=>{ return res.json()}).then((datalog)=>{ })
})
if(sessionStorage.getItem("status") != 4){
setTimeout(()=>{window.location.reload();},1000);
}


}

$(document).ready(function() {


var readURL = function(input) {
if (input.files && input.files[0]) {
var reader = new FileReader();

reader.onload = function (e) {
//mycode!!
$('.avatar').attr('src', e.target.result);
}

reader.readAsDataURL(input.files[0]);
}
}


$(".file-upload").on('change', function(){
readURL(this);
});
});
 