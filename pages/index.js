import AppBar from 'material-ui/AppBar'
import fetch from 'isomorphic-fetch'
import IconButton from 'material-ui/IconButton'
import React, { Component } from 'react'
import Sun from 'material-ui/svg-icons/device/brightness-high'
import ThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps'

import cities from '../data'
import countries from '../data/countries'
import { popScale } from '../other/scale'
import { container, wrapper, map, text } from '../other/styles'

const POLLING_TIME_MS = 180000 // 3 min (3 * 60 * 1000)

const getWeather = id =>
  `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=${process
    .env.WEATHER_API_KEY}`

export default class extends Component {
  state = { cities }

  async getTemperatures() {
    const responses = await Promise.all(
      this.state.cities.map(({ id }) => fetch(getWeather(id)))
    )
    const cities = await Promise.all(responses.map(res => res.json()))
    const temps = cities.map(({ main }) => main.temp)
    this.setState(({ cities }) => ({
      cities: cities.map((c, index) => ({ ...c, temp: temps[index] })),
    }))
  }

  componentWillMount() {
    this.getTemperatures()
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getTemperatures(), POLLING_TIME_MS)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render = () => (
    <ThemeProvider>
      <div style={wrapper}>
        <AppBar
          title="OpenWeatherMap"
          iconElementLeft={
            <IconButton>
              <Sun />
            </IconButton>
          }
        />
        <ComposableMap
          projectionConfig={{ scale: 800 }}
          width={1000}
          height={1000}
          style={container}
        >
          <ZoomableGroup center={[-60, -25]} disablePanning>
            <Geographies geographyUrl="/static/world-50m.json">
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    countries.includes(geography.id) && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={map}
                      />
                    )
                )}
            </Geographies>
            <Markers>
              {this.state.cities.map((city, i) => (
                <Marker
                  key={i}
                  marker={city}
                  style={{
                    default: { fill: popScale(city.temp) },
                    hover: { fill: popScale(city.temp) },
                    pressed: { fill: popScale(city.temp) },
                  }}
                >
                  <circle cx={0} cy={0} r={20} />
                  <text textAnchor="middle" y={city.offset} style={text}>
                    {city.name} ({city.temp} ºC)
                  </text>
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </ThemeProvider>
  )
}
