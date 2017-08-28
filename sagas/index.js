import { delay } from 'redux-saga'
import { select, all, call, put, fork, takeLatest } from 'redux-saga/effects'

import { update } from '../actions'

const getWeather = id =>
  `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=${process
    .env.WEATHER_API_KEY}`

// Fetch data every 3 mins (180.000 milliseconds)
function* getTemperatures() {
  try {
    yield call(delay, 180000)
    const cities = yield select(state => state.cities)
    const responses = yield all(
      cities.map(({ id }) => call(fetch, getWeather(id)))
    )
    const temps = yield all(responses.map(res => res.json()))
    yield all(temps.map((city, index) => put(update(index, city.main.temp))))
  } catch (err) {
    return console.error(err)
  }
}

function* watchTemperatures() {
  yield takeLatest('UPDATE_TEMPERATURE', getTemperatures)
}

export default function* main() {
  yield fork(watchTemperatures)
}
