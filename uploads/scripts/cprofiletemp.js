
const userid = sessionStorage.getItem("uid");

if(userid == null){
  alert("you must sign in first!!! ");
  window.location.replace("/login");

}
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("userid", userid);


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
      var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded2 = new URLSearchParams();
            urlencoded2.append("operation", "createprofile - stg1");
            urlencoded2.append("request", " excute create profile with user id: "+userid);
            urlencoded2.append("deviceinfo", window.navigator.userAgent);
           
        var requestOptions2 = {
          method: 'POST',
          headers: myHeaders2,
          body: urlencoded2,
          redirect: 'follow'
        };
        fetch("/prof/create", requestOptions).then((res)=>{ return res.json()}).then((data)=>{
          var profile_id = data.msg;
              sessionStorage.setItem("proid",profile_id);
          urlencoded2.append("response", JSON.stringify(data.msg)); 
        fetch("/logs/slog", requestOptions2).then((res)=>{ return res.json()}).then((data2)=>{})
        })


