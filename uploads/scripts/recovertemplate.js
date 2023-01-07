
function ValidateEmail() 
{
const email=document.getElementById('email').value;
if (email.includes("@"))
{
recover();
}
else
{
alert("You have entered an invalid email address!");
}

}

function recover()
{ 

    const email=document.getElementById('email').value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("operation", "recover password");
        urlencoded.append("request", email +" excute recover with email : " +email);
        urlencoded.append("deviceinfo", window.navigator.userAgent);
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };


    fetch('user/rec',{ method:'POST',body:new URLSearchParams({email})}).then((res)=>{return res.json()}).then((data)=>{
         urlencoded.append("response", JSON.stringify(data));
         fetch("/logs/slog", requestOptions).then((res)=>{ return res.json()}).then((data)=>{ })
    })

     setTimeout(()=>{window.location.replace('/reset');},1000);
}



