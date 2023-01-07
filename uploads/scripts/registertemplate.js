
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


fetch("https://data.gov.il/api/3/action/datastore_search?resource_id=1b14e41c-85b3-4c21-bdce-9fe48185ffca&limit=10000000")
  .then(response => response.json())
  .then(data => {
    // המרת הנתונים מתוך ה-API למערך שמכיל רק את city_name
 const newCities = [];
// המרת הנתונים מתוך ה-API למערך שמכיל רק את city_name
  const cities = data.result.records.map(record => {
  if (!newCities.includes(record.city_name)) {
    newCities.push(record.city_name);
    return record.city_name;
  }
  return '';
  });

    const cityInput = document.getElementById("city");
    const collator = new Intl.Collator('he');
    cities.sort(collator.compare);
    cities.forEach(city => {
      if(city.length  > 0){
      const option = document.createElement("option");
     option.value = city;
     option.text = city;
     cityInput.appendChild(option);
      }
    });
  });


   
    



      $(function() {
  // קריאה ל־autocomplete על־תיבת ה־select
  $("#city").autocomplete({
    source: cities // מערך הערים המקורי
  });
      })

    var bool1 =false;
    var bool2 = false;
     var bool3 = false;
      var bool4 = false;
var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
    bool1 = true; 
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
    bool2 = true ;
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
    bool3 = true; 
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
    bool4 = true;
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

             const  name=document.getElementById("name").value;
             const  lastname=document.getElementById("lastname").value;
              const  city=document.getElementById("city").value;
              const  address=document.getElementById("address").value;
              const  phone=document.getElementById("phone").value;
             const Email=document.getElementById("email").value;
             const password=document.getElementById("psw").value;
             
function validatePassword(){



if (bool1 && bool2 && bool3 && bool4){
   register()
}
   else {
  
    alert("validation not match");
  }
}

password.onchange = validatePassword;



  function register()
        { 
         
          var str="";
          var userip="";
           var Bdate = document.getElementById("Bdate").value;   
             const  Name=document.getElementById("name").value;
             const  Lastname=document.getElementById("lastname").value;
              var  City=document.getElementById("city").value;
              const  Address=document.getElementById("address").value;
              const  Phone=document.getElementById("phone").value;
             const Email=document.getElementById("email").value;
             const Password=document.getElementById("psw").value;
             City = City.trim();
             fetch('/user/reg',{
                    method: 'POST',
                    body:new URLSearchParams({
                    name:Name,
                    lastname:Lastname,
                    email:Email,
                    phone:Phone,
                    city:City,
                    address:Address,
                    d_of_birth:Bdate,
                    userpassword:Password
                     })
              
                }).then((res)=>{ 
                    return res.json()}).then((data)=>{ 
               
        
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            var urlencoded = new URLSearchParams();
                urlencoded.append("operation", "Register");
                urlencoded.append("request", Name+" "+Lastname+" excute registration with email : " +Email);
                urlencoded.append("deviceinfo", window.navigator.userAgent);
                urlencoded.append("response", JSON.stringify(data));
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            };

fetch("/logs/slog", requestOptions).then((res)=>{ return res.json()}).then((data)=>{ alert(data.msg)})

             if(data.msg != 1){
                alert("email already exist");
                 window.location.replace('/register');
               }
               else{
               alert("seccesfully registration");
               window.location.replace('/login');
               }
                                            
                     })

        }
  
   
 
  