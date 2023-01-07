
                                
function logincheck(){
                                              
const email = document.getElementById("email").value;
const pass = document.getElementById("psw").value;
                                     
 var p = pass+"";
 flag= true;

  if (p.length < 8 ||  p.search(/[a-z]/i) < 0  || p.search(/[0-9]/) < 0) {
        flag =false;
            document.getElementById("literal").innerHTML = "סיסמא חייבת להיות באורך 8 תווים ולהכיל אות גדולה אות קטנה ומספר ";
           setTimeout(()=>{window.location.reload();},2000);
      }
      if(email== ""|| pass == "" ){
        flag =false;
          document.getElementById("literal").innerHTML="שדות לא יכולות להיות ריקים או מייל לא תקין ";
          setTimeout(()=>{window.location.reload();},2000);
      }


      if(flag){
        
     
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("email", email);
urlencoded.append("userpassword", pass);

var requestOptions = {
 method: 'POST',
 headers: myHeaders,
 body: urlencoded,
 redirect: 'follow'
};

fetch("/user/log", requestOptions).then((res)=>{ return res.json()}).then((data)=>{

          var myHeaders2 = new Headers();
          myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");
          var urlencoded2 = new URLSearchParams();
              urlencoded2.append("operation", "Login");
              urlencoded2.append("request", "  excute login with email : " +email);
              urlencoded2.append("deviceinfo", window.navigator.userAgent);
              urlencoded2.append("response", JSON.stringify(data.msg));
          var requestOptions2 = {
            method: 'POST',
            headers: myHeaders2,
            body: urlencoded2,
            redirect: 'follow'
          };

fetch("/logs/slog", requestOptions2).then((res)=>{ return res.json()}).then((dt)=>{ });
  sessionStorage.setItem('uid',data.msg.userid);
  

var user_id = JSON.stringify (data.msg.userid);
var profile_id = JSON.stringify (data.msg.profileid);

if(user_id != null){
      if(profile_id.length == 2){
      window.location.replace("/cprofile");
      }

      else if(profile_id.length > 2){
        var newproid = profile_id.substring(1,profile_id.length-1);
   
        sessionStorage.setItem("proid",newproid);
        var url = `/prof/getpro/profileid=${newproid}`;
        window.location.replace(url);
      }
}else{
document.getElementById("literal").innerHTML = data.msg;
setTimeout(()=>{window.location.reload();},3000);
}


  })
     }

 }
                                    
