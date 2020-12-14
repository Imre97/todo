const weatherInput = document.querySelector('.city-input')
const weatherButton = document.querySelector('.weather-button')

weatherButton.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(weatherInput.value)
    .fetch(`api.openweathermap.org/data/2.5/weather?q=London&appid=6e93c561fc999601868b5e103fa58d8e`)
    .then( result => result.json())
    .then( data => {
        document.querySelector('.weather-container').innerHTML = JSON.stringify(data)
    })

})


