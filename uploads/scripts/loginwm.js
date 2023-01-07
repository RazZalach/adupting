
    function login(){
       
        const email = document.getElementById("email").value;
        const pass =  document.getElementById("pass").value;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("pass", pass);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("/manager/login", requestOptions).then((res)=>{ return res.json()}).then((data)=>{ 
           var token =  JSON.stringify(data.msg);
           token = token.substring(1,token.length-1);
        
           console.log(token);
            fetch('/wm', {
                headers: {
                Authorization:`${token}`,
                },
             }).then((response) => {
            if (response.ok) {
            return response.text();
            } 
            throw new Error('Request failed');})
            .then((html) => {document.body.innerHTML = html;})
            .catch((error) => {console.log(error.message);});
        });


 
    }
