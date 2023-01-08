
function contentus_ticket(){
    const fullname =document.getElementById("name").value; 
    const email =document.getElementById("email").value; 
    const subject =document.getElementById("subject_tick").value; 
    const phone =document.getElementById("phone").value; 
    const body =document.getElementById("message").value; 

    let isFormValid = true;
    let errorMessage = '';
  
    if (fullname+"".trim() === '') {
        isFormValid = false;
        errorMessage = 'נדרש למלאות שם\n';
    }
    if (email+"".trim() === '') {
        isFormValid = false;
        errorMessage += 'נדרש למלאות מייל\n';

    } 
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email+"")) {
        isFormValid = false;
        errorMessage += 'המייל שהוזן לא תקין\n';
    }
    if (phone+"".trim() === '') {
        isFormValid = false;
        errorMessage += 'נדרש למלאות טלפון\n';
    }
     else if (!/^\d{10}$/.test(phone+"")) {
        isFormValid = false;
        errorMessage += 'מספר טלפון 10 ספרות בלבד\n';
    }
    if (body+"".trim() === '') {
        isFormValid = false;
        errorMessage += 'גוף הפנייה ריקה\n';
    }
    
    if (subject+"".trim() === '') {
        isFormValid = false;
        errorMessage += 'נושא ההודעה ריק\n';
    }


    if(isFormValid){
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
            else{
                alert(errorMessage);
            }
}
