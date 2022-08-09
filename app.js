let latitude,longitude="";

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
}
else{
    alert("konuma erisilemiyor.");
}

function onSuccess(position){
     latitude = position.coords.latitude;
     longitude = position.coords.longitude;

     initMap();

    const api_key="8e7cf9b6d3f545f28794d1c0a8714c46";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;
    fetch(url)
        .then(response =>response.json())
        .then(result=>{
            let details=result.results[0].components;
            let{country,postcode,province}=details;

            document.getElementById("results").innerHTML = `
                <p>ülke: ${country} </p>
                <p>posta kodu: ${postcode} </p>
                <p>şehir: ${province} </p>
            `;
        });
}

function onError(error){
    if(error.code==1){
        alert("erisim izni reddedildi.");
    }
    else if(error.code==2){
        alert("konum alinamadi.");
    }
    else{
        alert("bir hata olustu.")
    }
}

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 8,
  });
}

