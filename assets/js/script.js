"use strict";
let pBar = document.getElementsByClassName("progress-bar"),
  ui = u("main"),
  sub = u("sub-main"),
  sClose = u("sClose"),
  sOpen = u("sOpen"),
  data = [];
function res() {
  sub.style.width = 767 < window.innerWidth ? `100%` : `80%`;
}

ui.addEventListener("click",(event)=>{
  if (ui.contains(event.target) && !sub.contains(event.target)) {
    sidebarClose()
  }
})
function u(a) {
  return document.getElementById(a);
}
function sidebar() {
  (sub.style.width = `0%`),
  (sub.style.opacity = 0),
    unload(),
    (sOpen.style.transform = `rotate(90deg)`),
    setTimeout(() => {
      ui.classList.remove("d-none"),
        setTimeout(() => {
          (sub.style.width = `80%`),
          (sub.style.opacity = 1),
            (sClose.style.transform = `rotate(90deg)`),
            load();
        }, 10);
    }, 100);
}
function sidebarClose() {
  (sClose.style.transform = `rotate(-90deg)`),
    (sub.style.width = `0%`),
    setTimeout(() => {
      setTimeout(() => {
        (sOpen.style.transform = `rotate(90deg)`),
          ui.classList.add("d-none"),
          (sub.style.width = `100%`);
      }, 400);
    }, 400);
}
function unload() {
  Array.from(pBar).forEach((a) => {
    a.style.width = `0%`;
  });
}
function load() {
  Array.from(pBar).forEach((a) => {
    a.style.width = `${a.getAttribute("aria-valuenow")}%`;
  });
}
const loadProject = async (a) => {
  data = a[0];
  let width = window.innerWidth < 600
  let w = window.innerWidth < 768
  if(w){u("main").classList.remove("cstm_scrollbar")}else{u("main").classList.add("cstm_scrollbar")}
  let experice = a[3].reduce(
    (c, a) =>
      (c += `
    <div class="col-11 col-lg-6 p-2 mx-auto">
    <div class="rounded-3">
      <div class="bg-c-gray3 p-2 rounded-3 hvr-card">
        <h6 class="text-light">${a.title}</h6>
        <div class="text-c-grey c-fs-12 popThin fw-semibold text-capitalize">
          ${a.description}
        </div>
        <a href="${a.slug}" target="_blank" class="text-decoration-none text-c-warning popSemi">Visit > </a>
      </div>
    </div>
    </div>
            `),
    "");
    (u("experiences").innerHTML = experice)

  let blogList = await fetch("https://monublogapi.netlify.app/.netlify/functions/blog/").then(r=>r.json())
  let blog = blogList.slice(0,4).reduce(
    (c, a) =>
      (c += `
            <div class="col-11 col-md-4 col-lg-3 p-2 ${w?"mx-auto":""}">
            <div style="background-image: url('${a.coverImage.url}')" class="rounded-3">
              <div class="bg-c-gray3 rounded-3 hvr-card p-3" style="backdrop-filter: blur(2px);">
                <h6 class="text-light line-clamp2 overflow-hidden">${a.title}</h6>
                <p class="text-white c-fs-12 popLight fw-lighter text-capitalize line-clamp overflow-hidden">
                  ${a.brief}
                </p>
                <a href="https://desidevs.hashnode.dev/${a.slug}" target="_blank" class="text-decoration-none text-c-warning popSemi">Read More > </a>
              </div>
              </div>
              </div>
            `),
    "");

  (u("blogs").innerHTML = blog+`<div class="col-10 mx-auto my-2"><div class="col-10 col-md-6 col-lg-4 mx-auto"><a href="https://blog.desidevs.site/" target="_blank"><button class="btn btn-outline-warning rounded-pill w-100 smore">Show More </button></a></div></div>`)
  let short = a[0].slice(0,w?4:8).reduce(
    (c, a) =>
      (c += `
            <div class="col-11 col-md-4 col-lg-3 p-2 ${w?"mx-auto":""}">
              <div class="rounded-3">
                <div class="bg-c-gray3 p-2 rounded-3 hvr-card">
                  <h6 class="text-light">${a.title}</h6>
                  <p class="text-c-grey c-fs-12 popLight fw-lighter text-capitalize line-clamp overflow-hidden">
                    ${a.description}
                  </p>
                  <a href="${a.link}" target="_blank" class="text-decoration-none text-c-warning popSemi">View > </a>
                </div>
              </div>
              </div>
            `),
    ""
  );
  (u("project").innerHTML = short+`<div class="col-10 mx-auto my-2"><div class="col-10 col-md-6 col-lg-4 mx-auto"><button class="btn btn-outline-warning rounded-pill w-100 smore" onclick="showAll()">Show More </button></div></div>`),
  
    (u("bio-link").innerHTML = a[1].reduce(
      (c, a) =>
        (c += `
        <a href="${a.link}" target="_blank" class="text-decration-none text-mute col text-center"><i class="bi ${a.icon}"></i></a>
            `),
      ""
    )),
    (u("ex").innerHTML = a[2].reduce(
      (c, a) =>
        (c += `
            <div class="progress my-1">
              <div class="progress-bar bg-c-warning text-start popSemi px-2" role="progressbar" aria-label="Example with label" style="width: 00%;" aria-valuenow="${a.experience}" aria-valuemin="0" aria-valuemax="100">${a.title}</div>
            </div>
            `),
      ""
    )),
    setTimeout(() => load(), 50);
};

const showAll =()=>{
  let short = data.reduce(
    (c, a) =>
      (c += `
            <div class="col-11 col-md-4 col-lg-3 p-2">
              <div class="bg-c-gray3 p-2 rounded-3 hvr-card c-screenBreakPoint">
                <h6 class="text-light">${a.title}</h6>
                <p class="text-c-grey c-fs-12 popLight fw-bolder text-capitalize">
                  ${a.description}
                </p>
                <a href="${a.link}" target="_blank" class="text-decoration-none text-c-warning popSemi">View > </a>
              </div>
              </div>
            `),
    ""
  );
  u("project").innerHTML = short
}
const showLess =()=>{
  let short = data.slice(0,6).reduce(
    (c, a) =>
      (c += `
            <div class="col-11 col-md-4 p-2">
              <div class="bg-c-gray3 p-2 rounded-3 hvr-card c-screenBreakPoint">
                <h6 class="text-light">${a.title}</h6>
                <p class="text-c-grey c-fs-12 popLight fw-lighter text-capitalize">
                  ${a.description}
                </p>
                <a href="${a.link}" target="_blank" class="text-decoration-none text-c-warning popSemi">View > </a>
              </div>
              </div>
            `),
    ""
  );
  u("project").innerHTML = short+`<div class="col-10 col-md-6 col-lg-4 mx-auto my-2"><button class="btn btn-outline-warning rounded-pill w-100 smore" onclick="showAll()">Show More </button></div>`
}

// Show Alerts 
const TriggerMessage = (message,type)=>{
  const alertElement = document.querySelector('.alert');
    const alertMessage = document.querySelector('#alertMessage');
    alertMessage.text = message

    alertElement.classList.add(`alert-${type}`,'show');
}
const Alert ={
  success:(message)=>{
    TriggerMessage(message,'success')
  },
  error:(message)=>{
    TriggerMessage(message,'error')
  },
}

//Weather 
window.onload = function() {
  if (navigator.geolocation) {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state !== "granted") {         
    Toastify({
      text: "Allow me to give you good experience by allowing your location.",
      duration: 5000,
      className:"bg-c-gray3 text-light",
      style:{
        background:'#2d2d39b3',
        borderRadius:'10px'
      }
      }).showToast();}
    });
   
    navigator.geolocation.getCurrentPosition(showPosition, handleError);

  } else {
    // Geolocation is not supported by this browser
    handleError("Geolocation is not supported by this browser.");
  }
};

async function showPosition(position) {
  let latitude =  position.coords.latitude
  let longitude=  position.coords.longitude

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'e08ecf922a7d4742624f80d4fa6e07c8'}`);
    const data = await response.json();

    const city = data.name;
    const temperature = Math.floor(+data.main.temp-273.15);
    const description = data.weather[0].description;
    const mainWeather = data.weather[0].main;
    const pressure = data.main.pressure
    const humidity = data.main.humidity
    const speed = data.wind.speed
    const country = data.sys.country

    document.getElementById('custCard').classList.remove('d-none')
    
    setInputValueById("mainWeather", mainWeather);
    setInputValueById("temp", temperature+"°C");
    setInputValueById("pressure", pressure+" hPa");
    setInputValueById("humidity", humidity+"%");
    setInputValueById("speed", speed+" km/h");
    setInputValueById("location", `${city} , ${countryCode?.[country]?countryCode?.[country]:' '}`);
    changeWeatherIcon(data?.weather?.[0].main?data?.weather?.[0].main:'')

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function handleError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      Alert.error("User denied the request for Geolocation.");
      Toastify({
        text: "Click me to start",
        duration: 2000,
        style:{
          background:'#2d2d39b3',
          borderRadius:'10px'
        },
        onClick: function(){
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, handleError);
          }
        }
        }).showToast();

      break;
    case error.POSITION_UNAVAILABLE:
      Alert.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      Alert.error("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      Alert.error("An unknown error occurred.");
      break;
  }
}

function changeWeatherIcon(weatherCondition) {
  const weatherIconMap = {
    "clear sky": "sunny.svg",
    "clear": "sunny.svg",
      rain: "rainy.svg",
    "few clouds": "cloudy.svg",
    "clouds": "cloudy.svg",
      snow: "snow.svg",
      thunderstorm: "thunder.svg",
  };

  const weatherBackgroundMap = {
    "clear sky": "#fff8ccb9",
    "clear": "#fff8ccb9",
      rain: "lightgray",
    "few clouds": "grey",
    "clouds": "grey",
      snow: "f5f5f571",
      thunderstorm: "darkgray",
  };
  const background = weatherBackgroundMap[weatherCondition.toLowerCase()] || "lightblue";

  const icon = weatherIconMap[weatherCondition.toLowerCase()] || "sunny.svg";
  
  const imgElement = document.getElementById("weatherIcon");
  imgElement.src = "./assets/image/weather/" + icon;

  const divElement = document.getElementById("upper");
  divElement.style.backgroundColor = background;
}



function setInputValueById(id, value) {
  const inputElement = document.getElementById(id);

  if (inputElement) {
    inputElement.innerText = value;
  } else {
    console.error(`Input element with ID "${id}" not found.`);
  }
}


const countryCode = {
    "AD": "Andorra",
    "AE": "United Arab Emirates",
    "AF": "Afghanistan",
    "AG": "Antigua and Barbuda",
    "AI": "Anguilla",
    "AL": "Albania",
    "AM": "Armenia",
    "AO": "Angola",
    "AQ": "Antarctica",
    "AR": "Argentina",
    "AS": "American Samoa",
    "AT": "Austria",
    "AU": "Australia",
    "AW": "Aruba",
    "AX": "Åland Islands",
    "AZ": "Azerbaijan",
    "BA": "Bosnia and Herzegovina",
    "BB": "Barbados",
    "BD": "Bangladesh",
    "BE": "Belgium",
    "BF": "Burkina Faso",
    "BG": "Bulgaria",
    "BH": "Bahrain",
    "BI": "Burundi",
    "BJ": "Benin",
    "BL": "Saint Barthélemy",
    "BM": "Bermuda",
    "BN": "Brunei Darussalam",
    "BO": "Bolivia (Plurinational State of)",
    "BQ": "Bonaire, Sint Eustatius and Saba",
    "BR": "Brazil",
    "BS": "Bahamas",
    "BT": "Bhutan",
    "BV": "Bouvet Island",
    "BW": "Botswana",
    "BY": "Belarus",
    "BZ": "Belize",
    "CA": "Canada",
    "CC": "Cocos (Keeling) Islands",
    "CD": "Congo, the Democratic Republic of the",
    "CF": "Central African Republic",
    "CG": "Congo",
    "CH": "Switzerland",
    "CI": "Côte d'Ivoire",
    "CK": "Cook Islands",
    "CL": "Chile",
    "CM": "Cameroon",
    "CN": "China",
    "CO": "Colombia",
    "CR": "Costa Rica",
    "CU": "Cuba",
    "CV": "Cabo Verde",
    "CW": "Curaçao",
    "CX": "Christmas Island",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DE": "Germany",
    "DJ": "Djibouti",
    "DK": "Denmark",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "DZ": "Algeria",
    "EC": "Ecuador",
    "EE": "Estonia",
    "EG": "Egypt",
    "EH": "Western Sahara",
    "ER": "Eritrea",
    "ES": "Spain",
    "ET": "Ethiopia",
    "FI": "Finland",
    "FJ": "Fiji",
    "FK": "Falkland Islands (Malvinas)",
    "FM": "Micronesia (Federated States of)",
    "FO": "Faroe Islands",
    "FR": "France",
    "GA": "Gabon",
    "GB": "United Kingdom of Great Britain and Northern Ireland",
    "GD": "Grenada",
    "GE": "Georgia",
    "GF": "French Guiana",
    "GG": "Guernsey",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GL": "Greenland",
    "GM": "Gambia",
    "GN": "Guinea",
    "GP": "Guadeloupe",
    "GQ": "Equatorial Guinea",
    "GR": "Greece",
    "GS": "South Georgia and the South Sandwich Islands",
    "GT": "Guatemala",
    "GU": "Guam",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HK": "Hong Kong",
    "HN": "Honduras",
    "HR": "Croatia",
    "HT": "Haiti",
    "HU": "Hungary",
    "ID": "Indonesia",
    "IE": "Ireland",
    "IL": "Israel",
    "IM": "Isle of Man",
    "IN": "India",
    "IQ": "Iraq",
    "IR": "Iran (Islamic Republic of)",
    "IS": "Iceland",
    "IT": "Italy",
    "JE": "Jersey",
    "JM": "Jamaica",
    "JO": "Jordan",
    "JP": "Japan",
    "KE": "Kenya",
    "KG": "Kyrgyzstan",
    "KH": "Cambodia",
    "KI": "Kiribati",
    "KM": "Comoros",
    "KN": "Saint Kitts and Nevis",
    "KP": "Korea (Democratic People's Republic of)",
    "KR": "Korea, Republic of",
    "KW": "Kuwait",
    "KY": "Cayman Islands",
    "KZ": "Kazakhstan",
    "LA": "Lao People's Democratic Republic",
    "LB": "Lebanon",
    "LC": "Saint Lucia",
    "LI": "Liechtenstein",
    "LK": "Sri Lanka",
    "LR": "Liberia",
    "LS": "Lesotho",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "LV": "Latvia",
    "LY": "Libya",
    "MA": "Morocco",
    "MC": "Monaco",
    "MD": "Moldova, Republic of",
    "ME": "Montenegro",
    "MF": "Saint Martin (French part)",
    "MG": "Madagascar",
    "MH": "Marshall Islands",
    "MK": "North Macedonia",
    "ML": "Mali",
    "MM": "Myanmar",
    "MN": "Mongolia",
    "MO": "Macao",
    "MP": "Northern Mariana Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MS": "Montserrat",
    "MT": "Malta",
    "MU": "Mauritius",
    "MV": "Maldives",
    "MW": "Malawi",
    "MX": "Mexico",
    "MY": "Malaysia",
    "MZ": "Mozambique",
    "NA": "Namibia",
    "NC": "New Caledonia",
    "NE": "Niger",
    "NF": "Norfolk Island",
    "NG": "Nigeria",
    "NI": "Nicaragua",
    "NL": "Netherlands",
    "NO": "Norway",
    "NP": "Nepal",
    "NR": "Nauru",
    "NU": "Niue",
    "NZ": "New Zealand",
    "OM": "Oman",
    "PA": "Panama",
    "PE": "Peru",
    "PF": "French Polynesia",
    "PG": "Papua New Guinea",
    "PH": "Philippines",
    "PK": "Pakistan",
    "PL": "Poland",
    "PM": "Saint Pierre and Miquelon",
    "PN": "Pitcairn",
    "PR": "Puerto Rico",
    "PS": "Palestine, State of",
    "PT": "Portugal",
    "PW": "Palau",
    "PY": "Paraguay",
    "QA": "Qatar",
    "RE": "Réunion",
    "RO": "Romania",
    "RS": "Serbia",
    "RU": "Russian Federation",
    "RW": "Rwanda",
    "SA": "Saudi Arabia",
    "SB": "Solomon Islands",
    "SC": "Seychelles",
    "SD": "Sudan",
    "SE": "Sweden",
    "SG": "Singapore",
    "SH": "Saint Helena, Ascension and Tristan da Cunha",
    "SI": "Slovenia",
    "SJ": "Svalbard and Jan Mayen",
    "SK": "Slovakia",
    "SL": "Sierra Leone",
    "SM": "San Marino",
    "SN": "Senegal",
    "SO": "Somalia",
    "SR": "Suriname",
    "SS": "South Sudan",
    "ST": "Sao Tome and Principe",
    "SV": "El Salvador",
    "SX": "Sint Maarten (Dutch part)",
    "SY": "Syrian Arab Republic",
    "SZ": "Eswat",
    "TC": "Turks and Caicos Islands",
  "TD": "Chad",
  "TF": "French Southern Territories",
  "TG": "Togo",
  "TH": "Thailand",
  "TJ": "Tajikistan",
  "TK": "Tokelau",
  "TL": "Timor-Leste",
  "TM": "Turkmenistan",
  "TN": "Tunisia",
  "TO": "Tonga",
  "TR": "Turkey",
  "TT": "Trinidad and Tobago",
  "TV": "Tuvalu",
  "TW": "Taiwan, Province of China",
  "TZ": "Tanzania, United Republic of",
  "UA": "Ukraine",
  "UG": "Uganda",
  "UM": "United States Minor Outlying Islands",
  "US": "United States of America",
  "UY": "Uruguay",
  "UZ": "Uzbekistan",
  "VA": "Holy See",
  "VC": "Saint Vincent and the Grenadines",
  "VE": "Venezuela (Bolivarian Republic of)",
  "VG": "Virgin Islands (British)",
  "VI": "Virgin Islands (U.S.)",
  "VN": "Viet Nam",
  "VU": "Vanuatu",
  "WF": "Wallis and Futuna",
  "WS": "Samoa",
  "YE": "Yemen",
  "YT": "Mayotte",
  "ZA": "South Africa",
  "ZM": "Zambia",
  "ZW": "Zimbabwe"
}
const closeWeather=()=>{
  document.getElementById('custCard').classList.add('d-none')
}

//Form Data
const form = document.getElementById('contactForm');
form.addEventListener('submit', (event) => {
  event.preventDefault(); 
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const phone = document.getElementById('phone').value.trim();
const message = document.getElementById('message').value.trim();

const fdata = {
  name,
  email,
  phone,
  message
};

fetch('https://script.google.com/macros/s/AKfycbwhdHCXkgrSc9XXk4mo6qKpgV3PSPKQPzmXS4h4uOIs4zRa4R3_rXwlg78OvMMI3Z2M/exec', {
  method: 'POST',
  body: JSON.stringify(fdata)
})
.then(response => response.text())
.then(data => {
  alert('Your message has been sent successfully!');  
  form.reset()
  bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide()
})
.catch(error => {
  alert('An error occurred while sending your message. Please try again later.');
});
})
