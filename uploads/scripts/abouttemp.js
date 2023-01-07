
function contentus_ticket(){
    const fullname =document.getElementById("name").value; 
    const email =document.getElementById("email").value; 
    const subject =document.getElementById("subject_tick").value; 
    const phone =document.getElementById("phone").value; 
    const body =document.getElementById("message").value; 
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("fullname", fullname);
urlencoded.append("email", email);
urlencoded.append("subject", subject);
urlencoded.append("phone", phone);
urlencoded.append("body", body);

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: urlencoded,
redirect: 'follow'
};

fetch("/tick/ticket", requestOptions).then((res)=>{return res.json()}).then((data)=>{
if(data.msg==1){
alert("שליחת הטופס הצליחה כדי להפעיל טופס זה, הירשם בכתובת");
setTimeout(()=>{window.location.replace('/');},2000);
}
else
window.location.reload();
})

}
