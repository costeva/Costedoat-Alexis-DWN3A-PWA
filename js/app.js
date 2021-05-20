const api_key_clima = "";
const url = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key_clima}&units=metric&lang=es&q=`;
const api_key_maps = "";
const url_maps = `https://www.google.com/maps/embed/v1/place?key=${api_key_maps}&q=`;

const form = document.getElementById("contact-form");
const inputciudad = document.getElementById("inputciudad");
const contenInput = document.getElementById("contenedorInput");
if (localStorage.datos) {
  const dataJson = JSON.parse(localStorage.datos);
  inputciudad.value = dataJson.name;
  llenardatos(dataJson);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const error = document.getElementById("textError");
  if (error) {
    contenInput.removeChild(error);
  }
  if (inputciudad.value !== "") {
    buscarClima(inputciudad.value);
  } else {
    const textError = document.createElement("p");
    textError.id = "textError";
    textError.innerText = "ingrese la ciudad";
    contenInput.appendChild(textError);
  }
});

function buscarClima(ciudad) {
  console.log("ciudad", ciudad);

  const fetchPromise = fetch(`${url}${inputciudad.value}`);

  fetchPromise
    .then((Response) => {
      return Response.json();
    })
    .then((result) => {
      console.log("Datos", result);

      if (result.cod == 200) {
        localStorage.datos = JSON.stringify(result);
        llenardatos(result);
      } else {
        alert(result.message);
      }
    })
    .catch((err) => {
      console.log("seguro algo fallo", err);
    });
}

function llenardatos(data) {
  const ciudad = document.getElementById("ciudad");

  const icono = document.getElementById("icono");
  const grados = document.getElementById("grado");
  const tempMax = document.getElementById("tempMax");
  const tempMin = document.getElementById("tempMin");
  const humedad = document.getElementById("humed");
  const termica = document.getElementById("termica");
  const presion = document.getElementById("presion");
  const viento = document.getElementById("viento");
  const estado = document.getElementById("estado");
  const ubicacion = document.getElementById("ubicacion");

  ciudad.innerText = data.name;

  const imgIco = document.getElementById("imgIco");
  if (imgIco) {
    imgIco.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } else {
    const imgIco = document.createElement("img");
    imgIco.id = "imgIco";
    imgIco.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    icono.appendChild(imgIco);
  }

  grados.innerText = data.main.temp + " " + "°C";

  tempMax.innerText = data.main.temp_max + " " + "°C";
  tempMin.innerText = data.main.temp_min + " " + "°C";
  humedad.innerText = data.main.humidity + " " + "%";
  termica.innerText = data.main.feels_like + " " + "°";
  presion.innerText = data.main.pressure + " " + "hPa";
  viento.innerText = data.wind.speed + " " + "km/h";
  estado.innerText = data.weather[0].description;
  ubicacion.src = `${url_maps}${data.name}`;
}
