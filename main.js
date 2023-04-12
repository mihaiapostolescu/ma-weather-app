let searchQuery
let cityName
let checkCityName
let timeoutId

const pictureWeatherType = document.querySelector(".picture-weather-type")
const mainTemp = document.querySelector(".temp")
const mainCityName = document.querySelector(".city-name")
const mainTime = document.querySelector(".time")
const mainDate = document.querySelector(".date")
const mainIconWeatherType = document.querySelector(".icon-weather-forecast")
const mainWeatherForecast = document.querySelector(".weather-forecast")

const primaryNav = document.querySelector(".main__navigation")
const navToggle = document.querySelector(".mobile-nav__toggle")
const inputField = document.querySelector(".search")
const searchButton = document.querySelector(".searchButton")

const forecastHour = document.querySelectorAll(".forecast-hour")
const forecastTempHour = document.querySelectorAll(".forecast-temperature-hour")
const forecastWeatherHour = document.querySelectorAll(".forecast-weather-hour")
const forecastHumidityHour = document.querySelectorAll(".forecast-humididty-hour")

const forecastDay = document.querySelectorAll(".forecast-day")
const forecastTempDay = document.querySelectorAll(".forecast-temperature-day")
const forecastTempNight = document.querySelectorAll(".forecast-temperature-night")
const forecastWeatherDay = document.querySelectorAll(".forecast-weather-day")
const forecastHumidityDay = document.querySelectorAll(".forecast-humidity-day")
const favorites = []

const handleAddFavorite = (city) => {
  const formattedCity = city.replace('%20', ' ')
  if (favorites.includes(formattedCity)) {
    alert(`"${formattedCity}" is already in the favorites list!`)
    return
  }
  favorites.push(formattedCity)
  localStorage.setItem("favorites", JSON.stringify(favorites))
  if (favorites.length <= 5) {
    renderFavorites()
  } else {
    alert("Only five Favorite Cities allowed")
  }
}

const addToFavoritesButton = document.querySelector(".add-to-favorites")
addToFavoritesButton.addEventListener("click", () => {
  handleAddFavorite(searchQuery)
})

const handleRemoveFavorite = (city) => {
  const index = favorites.indexOf(city)
  favorites.splice(index, 1)
  localStorage.setItem("favorites", JSON.stringify(favorites))
  renderFavorites()
}

const renderFavorites = () => {
  const favoritesDiv = document.querySelector(".favouritesWrapper")
  favoritesDiv.innerHTML = ""
  favorites.forEach((favorite) => {
    const favoriteDiv = document.createElement("div")
    favoriteDiv.setAttribute("class", "favoriteItem")
    const favoriteText = document.createTextNode(favorite)
    favoriteDiv.appendChild(favoriteText)
    const removeButton = document.createElement("button")
    removeButton.innerHTML = "+"
    removeButton.addEventListener("click", () => handleRemoveFavorite(favorite))
    favoriteDiv.appendChild(removeButton)
    favoritesDiv.appendChild(favoriteDiv)
  })
}

const storedFavorites = localStorage.getItem("favorites")
if (storedFavorites) {
  favorites.push(...JSON.parse(storedFavorites))
  renderFavorites()
}

const button = document.querySelector('.mobile-nav__toggle');
button.addEventListener('click', function() {
  button.classList.toggle('mobile-nav__toggle2');
});


navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible")

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true)
    navToggle.setAttribute("data-expanded", true)
    document.body.style.overflowY = "hidden"
  }
  if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false)
    navToggle.setAttribute("data-expanded", false)
    document.body.style.overflowY = "visible"
  }
})

function populateMainForecast(data, city) {
  const mainCurrentTimeStamp = data.current.dt
  const mainSunriseTimeStamp = data.current.sunrise
  const mainsunsetTimeStamp = data.current.sunset
  const mainTimeStamp = data.current.dt
  const mainDate = new Date(mainTimeStamp * 1000)
  const mainOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const mainTimeStringLong = mainDate.toLocaleString("en-US", mainOptions)
  const mainTimeString = mainDate.toLocaleString()
  let latitude = data.lat
  let longitude = data.lon
  let AtmosphereWeather = [
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Dust",
    "Ash",
    "Squall",
  ]
  let dataCurrentWeather = data.current.weather[0].main
  let dataCurrentDescription = data.current.weather[0].description

  getCityName(latitude, longitude)
  mainCityName.innerHTML = city.replace('%20', ' ')
  mainTemp.innerHTML = Math.round(data.current.temp) + "&#176;"
  mainTime.innerHTML =
    mainTimeString.split(",")[1].split(":")[0] +
    ":" +
    mainTimeString.split(",")[1].split(":")[1]
  mainDate.innerHTML =
    mainTimeStringLong.split(",")[0] + "," + mainTimeStringLong.split(",")[1]
  if (
    parseInt(mainCurrentTimeStamp) >= parseInt(mainSunriseTimeStamp) &&
    parseInt(mainCurrentTimeStamp) < parseInt(mainsunsetTimeStamp)
  ) {
    if (dataCurrentWeather === "Clear") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-clear-sky-day_yrsvbs.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206379/maweatherapp/picture-clear-sky-day_nljg6p.jpg"
    } else if (dataCurrentWeather === "Clouds") {
      if (dataCurrentDescription === "scattered clouds") {
        mainIconWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-scattered-clouds-day_psh3zf.png"
        mainWeatherForecast.innerHTML = dataCurrentDescription
      } else if (dataCurrentDescription === "few clouds") {
        mainIconWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-few-clouds-day_gw7apg.png"
        mainWeatherForecast.innerHTML = dataCurrentDescription
        pictureWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206379/maweatherapp/picture-few-clouds-day_mtbeiw.jpg"
      } else if (dataCurrentDescription === "broken clouds") {
        mainIconWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207506/maweatherapp/icon-broken-clouds-day_x3xuy8.png"
        mainWeatherForecast.innerHTML = dataCurrentDescription
        pictureWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206380/maweatherapp/picture-broken-clouds-day_kcu0lh.jpg"
      } else if (dataCurrentDescription === "overcast clouds") {
        mainIconWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207506/maweatherapp/icon-broken-clouds-day_x3xuy8.png"
        mainWeatherForecast.innerHTML = dataCurrentDescription
        pictureWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206380/maweatherapp/picture-overcast-clouds-day_g1pgye.jpg"
      }
    } else if (AtmosphereWeather.includes(dataCurrentWeather)) {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-mist-day_z33ury.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206380/maweatherapp/picture-mist-day_bzb066.jpg"
    } else if (dataCurrentWeather === "Tornado") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681156605/maweatherapp/icon-tornado-day_ackxb9.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681208929/maweatherapp/picture-tornado-day_elvxkn.jpg"
    } else if (dataCurrentWeather === "Snow") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-snow-day_ol7kgq.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206378/maweatherapp/picture-snow-day_emeopq.jpg"
    } else if (dataCurrentWeather === "Rain") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-shower-rain-day_zij6wr.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206381/maweatherapp/picture-rain-day_leusga.jpg"
    } else if (dataCurrentWeather === "Drizzle") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-drizzle-day_vmfudt.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206380/maweatherapp/picture-drizzle-day_snyp7w.jpg"
    } else if (dataCurrentWeather === "Thunderstorm") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-thunderstorm-day_svukzl.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206378/maweatherapp/picture-thunderstorm-day_n1x2iy.jpg"
    }
  } else if (
    parseInt(mainCurrentTimeStamp) < parseInt(mainSunriseTimeStamp) ||
    parseInt(mainCurrentTimeStamp) >= parseInt(mainsunsetTimeStamp)
  ) {
    if (dataCurrentWeather === "Clear") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-clear-sky-night_lhsde2.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206380/maweatherapp/picture-clear-sky-night_xpwdbv.jpg"
    } else if (dataCurrentWeather === "Clouds") {
      if (dataCurrentDescription === "scattered clouds") {
        mainIconWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-scattered-clouds-night_sbd0dj.png"
        mainWeatherForecast.innerHTML = dataCurrentDescription
        pictureWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206378/maweatherapp/picture-scattered-clouds-night_ljbkao.jpg"
      } else if (dataCurrentDescription === "few clouds") {
        mainIconWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-few-clouds-night_vwqzuv.png"
        mainWeatherForecast.innerHTML = dataCurrentDescription
        pictureWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206382/maweatherapp/picture-few-clouds-night_dl3oct.jpg"
      } else if (dataCurrentDescription === "broken clouds") {
        mainIconWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207565/maweatherapp/icon-broken-clouds-night_ypb5bq.png"
        mainWeatherForecast.innerHTML = dataCurrentDescription
        pictureWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206380/maweatherapp/picture-broken-clouds-night_w8m8rr.jpg"
      } else if (dataCurrentDescription === "overcast clouds") {
        mainIconWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207565/maweatherapp/icon-broken-clouds-night_ypb5bq.png"
        mainWeatherForecast.innerHTML = dataCurrentDescription
        pictureWeatherType.src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206380/maweatherapp/picture-overcast-clouds-night_qlvwaf.jpg"
      }
    } else if (AtmosphereWeather.includes(dataCurrentWeather)) {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-mist-night_sfsdpk.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206380/maweatherapp/picture-mist-night_lrouuz.jpg"
    } else if (dataCurrentWeather === "Tornado") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681156605/maweatherapp/icon-tornado-night_d4xb42.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681208929/maweatherapp/picture-tornado-night_wfyxwx.jpg"
    } else if (dataCurrentWeather === "Snow") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-snow-night_hbffey.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206378/maweatherapp/picture-snow-night_skjsfd.jpg"
    } else if (dataCurrentWeather === "Rain") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-shower-rain-night_bkxuwm.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206381/maweatherapp/picture-rain-night_raxypn.jpg"
    } else if (dataCurrentWeather === "Drizzle") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-drizzle-night_fiblao.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206379/maweatherapp/picture-drizzle-night_fd0asi.jpg"
    } else if (dataCurrentWeather === "Thunderstorm") {
      mainIconWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-thunderstorm-night_ltqz0k.png"
      mainWeatherForecast.innerHTML = dataCurrentDescription
      pictureWeatherType.src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681206379/maweatherapp/picture-thunderstorm-night_t71ybu.jpg"
    }
  }
}

function populateHourlyForecast(data) {
  for (let i = 0; i <= 4; i++) {
    const currentTimeStamp = data.current.dt
    const sunriseTimeStamp = data.current.sunrise
    const sunsetTimeStamp = data.current.sunset
    const hourlyTimeStamp = data.hourly[i].dt
    const hourlyDate = new Date(hourlyTimeStamp * 1000)
    const hourlyTimeString = hourlyDate.toLocaleString()
    let AtmosphereWeather = [
      "Mist",
      "Smoke",
      "Haze",
      "Dust",
      "Fog",
      "Sand",
      "Dust",
      "Ash",
      "Squall",
    ]
    let dataHourlyMain = data.hourly[i].weather[0].main
    let dataHourlyDescription = data.hourly[i].weather[0].description

    forecastHour[i].innerHTML =
      hourlyTimeString.split(",")[1].split(":")[0] + ":" + "00"
    forecastHour[0].innerHTML = "Now"
    forecastTempHour[i].innerHTML = Math.round(data.hourly[i].temp) + "&#176;"
    if (
      parseInt(currentTimeStamp) >= parseInt(sunriseTimeStamp) &&
      parseInt(currentTimeStamp) < parseInt(sunsetTimeStamp)
    ) {
      if (dataHourlyMain === "Clear") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-clear-sky-day_yrsvbs.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Clouds") {
        if (dataHourlyDescription === "scattered clouds") {
          forecastWeatherHour[i].src =
            "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-scattered-clouds-day_psh3zf.png"
          forecastWeatherHour[i].title = dataHourlyDescription
        } else if (dataHourlyDescription === "few clouds") {
          forecastWeatherHour[i].src =
            "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-few-clouds-day_gw7apg.png"
          forecastWeatherHour[i].title = dataHourlyDescription
        } else if (dataHourlyDescription === "broken clouds") {
          forecastWeatherHour[i].src =
            "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207506/maweatherapp/icon-broken-clouds-day_x3xuy8.png"
          forecastWeatherHour[i].title = dataHourlyDescription
        } else if (dataHourlyDescription === "overcast clouds") {
          forecastWeatherHour[i].src =
            "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207506/maweatherapp/icon-broken-clouds-day_x3xuy8.png"
          forecastWeatherHour[i].title = dataHourlyDescription
        }
      } else if (AtmosphereWeather.includes(dataHourlyMain)) {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-mist-day_z33ury.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Tornado") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681156605/maweatherapp/icon-tornado-day_ackxb9.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Snow") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-snow-day_ol7kgq.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Rain") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-shower-rain-day_zij6wr.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Drizzle") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-drizzle-day_vmfudt.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Thunderstorm") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-thunderstorm-day_svukzl.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      }
    } else if (
      parseInt(currentTimeStamp) < parseInt(sunriseTimeStamp) ||
      parseInt(currentTimeStamp) >= parseInt(sunsetTimeStamp)
    ) {
      if (dataHourlyMain === "Clear") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-clear-sky-night_lhsde2.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Clouds") {
        if (dataHourlyDescription === "scattered clouds") {
          forecastWeatherHour[i].src =
            "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-scattered-clouds-night_sbd0dj.png"
          forecastWeatherHour[i].title = dataHourlyDescription
        } else if (dataHourlyDescription === "few clouds") {
          forecastWeatherHour[i].src =
            "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-few-clouds-night_vwqzuv.png"
          forecastWeatherHour[i].title = dataHourlyDescription
        } else if (dataHourlyDescription === "broken clouds") {
          forecastWeatherHour[i].src =
            "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207565/maweatherapp/icon-broken-clouds-night_ypb5bq.png"
          forecastWeatherHour[i].title = dataHourlyDescription
        } else if (dataHourlyDescription === "overcast clouds") {
          forecastWeatherHour[i].src =
            "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207565/maweatherapp/icon-broken-clouds-night_ypb5bq.png"
          forecastWeatherHour[i].title = dataHourlyDescription
        }
      } else if (AtmosphereWeather.includes(dataHourlyMain)) {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-mist-night_sfsdpk.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Tornado") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681156605/maweatherapp/icon-tornado-night_d4xb42.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Snow") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-snow-night_hbffey.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Rain") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-shower-rain-night_bkxuwm.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Drizzle") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-drizzle-night_fiblao.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      } else if (dataHourlyMain === "Thunderstorm") {
        forecastWeatherHour[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-thunderstorm-night_ltqz0k.png"
        forecastWeatherHour[i].title = dataHourlyDescription
      }
    }
    forecastHumidityHour[i].innerHTML = Math.round(data.hourly[i].humidity)
  }
}

function populateDailyForecast(data) {
  for (let i = 0; i <= 4; i++) {
    const dailyTimeStamp = data.daily[i].dt
    const dailyDate = new Date(dailyTimeStamp * 1000)
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    const dailyTimeString = dailyDate.toLocaleString("en-US", options)
    let AtmosphereWeather = [
      "Mist",
      "Smoke",
      "Haze",
      "Dust",
      "Fog",
      "Sand",
      "Dust",
      "Ash",
      "Squall",
    ]
    let dataDailyMain = data.daily[i].weather[0].main
    let dataDailyDescription = data.daily[i].weather[0].description

    forecastDay[i].innerHTML = dailyTimeString.split(",")[0]
    forecastDay[0].innerHTML = "Today"
    forecastTempDay[i].innerHTML = Math.round(data.daily[i].temp.day) + "&#176;"
    forecastTempNight[i].innerHTML =
      Math.round(data.daily[i].temp.night) + "&#176;"

    if (dataDailyMain === "Clear") {
      forecastWeatherDay[i].src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-clear-sky-day_yrsvbs.png"
      forecastWeatherDay[i].title = dataDailyDescription
    } else if (dataDailyMain === "Clouds") {
      if (dataDailyDescription === "scattered clouds") {
        forecastWeatherDay[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-scattered-clouds-day_psh3zf.png"
        forecastWeatherDay[i].title = dataDailyDescription
      } else if (dataDailyDescription === "few clouds") {
        forecastWeatherDay[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-few-clouds-day_gw7apg.png"
        forecastWeatherDay[i].title = dataDailyDescription
      } else if (dataDailyDescription === "broken clouds") {
        forecastWeatherDay[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207506/maweatherapp/icon-broken-clouds-day_x3xuy8.png"
        forecastWeatherDay[i].title = dataDailyDescription
      } else if (dataDailyDescription === "overcast clouds"){
        forecastWeatherDay[i].src =
          "https://res.cloudinary.com/dewznnjqr/image/upload/v1681207506/maweatherapp/icon-broken-clouds-day_x3xuy8.png"
        forecastWeatherDay[i].title = dataDailyDescription
      }
    } else if (AtmosphereWeather.includes(dataDailyMain)) {
      forecastWeatherDay[i].src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134910/maweatherapp/icon-mist-day_z33ury.png"
      forecastWeatherDay[i].title = dataDailyDescription
    } else if (dataDailyMain === "Tornado") {
      forecastWeatherDay[i].src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681156605/maweatherapp/icon-tornado-day_ackxb9.png"
      forecastWeatherDay[i].title = dataDailyDescription
    } else if (dataDailyMain === "Snow") {
      forecastWeatherDay[i].src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-snow-day_ol7kgq.png"
      forecastWeatherDay[i].title = dataDailyDescription
    } else if (dataDailyMain === "Rain") {
      forecastWeatherDay[i].src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-shower-rain-day_zij6wr.png"
      forecastWeatherDay[i].title = dataDailyDescription
    } else if (dataDailyMain === "Drizzle") {
      forecastWeatherDay[i].src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134909/maweatherapp/icon-drizzle-day_vmfudt.png"
      forecastWeatherDay[i].title = dataDailyDescription
    } else if (dataDailyMain === "Thunderstorm") {
      forecastWeatherDay[i].src =
        "https://res.cloudinary.com/dewznnjqr/image/upload/v1681134911/maweatherapp/icon-thunderstorm-day_svukzl.png"
      forecastWeatherDay[i].title = dataDailyDescription
    }
    forecastHumidityDay[i].innerHTML = Math.round(data.daily[i].humidity)
  }
}

function getCityName(lat, lon) {
  const apiKey = import.meta.env.VITE_API_KEY
  const geoUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`

  return new Promise((resolve, reject) => {
    fetch(geoUrl)
      .then((response) => response.json())
      .then((geo) => {
        cityName = geo[0].name
        resolve(cityName)
      })
      .catch((error) => {
        console.error(error)
      })
  })
}

inputField.addEventListener("input", function (event) {
  searchQuery = encodeURIComponent(event.target.value)
})

searchButton.addEventListener("click", () => {
  if (searchQuery && searchQuery.length > 2) {
    getWeatherData(searchQuery)
    inputField.value = ""
  } else {
    alert("please type a city name")
  }
})

function verifyCity() {
  const apiKey = import.meta.env.VITE_API_KEY
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${apiKey}`
  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((check) => {
        checkCityName = check.city.name
        resolve(cityName)
      })
      .catch((error) => {
        console.error(error)
      })
  })
}

function debounce(func, delay) {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(func, delay)
}

inputField.addEventListener("keydown", (event) => {
  debounce(() => {
    verifyCity()
    if (event.key === "Enter") {
      if (searchQuery && searchQuery.length > 2) {
        if (searchQuery == checkCityName) {
          getWeatherData(searchQuery)
          inputField.value = ""
        } else {
          alert("please type a city name")
        }
      } else {
        alert("please type a city name")
      }
    }
  }, 300)
})

function getWeatherData(cityNameFromSearch) {
  const apiKey = import.meta.env.VITE_API_KEY
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityNameFromSearch}&limit=1&appid=${apiKey}`

  fetch(geoUrl)
    .then((response) => response.json())
    .then((latLon) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLon[0].lat}&lon=${latLon[0].lon}&appid=${apiKey}&units=metric`
      return fetch(apiUrl)
    })
    .then((response) => response.json())
    .then((data) => {
      populateHourlyForecast(data)
      populateDailyForecast(data)
      populateMainForecast(data, searchQuery)
    })
    .catch((error) => console.error(error))
}

const successCallback = (position) => {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const apiKey = import.meta.env.VITE_API_KEY
  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

  getCityName(latitude, longitude)
    .then((city) => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          populateHourlyForecast(data)
          populateDailyForecast(data)
          populateMainForecast(data, city)
        })
        .catch((error) => console.error(error))
    })
    .catch((error) => console.error(error))
}

const errorCallback = (error) => {
  console.log(error)
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback)


