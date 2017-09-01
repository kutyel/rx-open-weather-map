import AppBar from 'material-ui/AppBar'
import fetch from 'isomorphic-fetch'
import IconButton from 'material-ui/IconButton'
import React, { Component } from 'react'
import Sun from 'material-ui/svg-icons/device/brightness-high'
import ThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { scaleLinear } from 'd3-scale'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps'

const POLLING_TIME_MS = 180000 // 3 min (3 * 60 * 1000)
const SOUTH_AMERICA = [
  'ARG',
  'BOL',
  'BRA',
  'CHL',
  'COL',
  'ECU',
  'GUY',
  'PRY',
  'PER',
  'SUR',
  'URY',
  'VEN',
]

const cities = [
  {
    id: 3871336,
    offset: -35,
    name: 'Santiago',
    temp: 6,
    history: [],
    coordinates: [-70.6693, -33.4489],
  },
  {
    id: 3435910,
    offset: 50,
    name: 'Buenos Aires',
    temp: 16,
    history: [],
    coordinates: [-58.3816, -34.6037],
  },
  {
    id: 3936456,
    offset: 40,
    name: 'Lima',
    temp: 10.7,
    history: [],
    coordinates: [-77.1278664, -12.0266034],
  },
  {
    id: 3448439,
    offset: -25,
    name: 'São Paulo',
    temp: 13.82,
    history: [],
    coordinates: [-46.875494, -23.6821604],
  },
]

const popScale = scaleLinear()
  .domain([-20, -10, 0, 10, 20, 30, 40, 50, 60])
  .range([
    '#2c7bb6',
    '#00a6ca',
    '#00ccbc',
    '#90eb9d',
    '#ffff8c',
    '#f9d057',
    '#f29e2e',
    '#e76818',
    '#d7191c',
  ])

const getWeather = id =>
  `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=${process
    .env.WEATHER_API_KEY}`

export default class extends Component {
  state = { cities }

  async getTemperatures() {
    try {
      const responses = await Promise.all(
        this.state.cities.map(({ id }) => fetch(getWeather(id)))
      )
      const cities = await Promise.all(responses.map(res => res.json()))
      const temps = cities.map(({ main }) => main.temp)
      await this.setState(({ cities }) => ({
        cities: cities.map((c, index) => ({ ...c, temp: temps[index] })),
      }))
    } catch (err) {
      console.error(err)
    }
  }

  componentWillMount = () => this.getTemperatures()

  componentDidMount = () =>
    (this.timer = setInterval(() => this.getTemperatures(), POLLING_TIME_MS))

  componentWillUnmount = () => clearInterval(this.timer)

  render = () => (
    <div
      style={{
        width: '100%',
        maxWidth: 980,
        margin: '0 auto',
      }}
    >
      <ThemeProvider>
        <AppBar
          title="OpenWeatherMap"
          iconElementLeft={
            <IconButton>
              <Sun />
            </IconButton>
          }
        />
      </ThemeProvider>
      <ComposableMap
        projectionConfig={{ scale: 800 }}
        width={1000}
        height={1000}
      >
        <ZoomableGroup center={[-60, -25]} disablePanning>
          <Geographies geographyUrl="/static/world-50m.json">
            {(geographies, projection) =>
              geographies.map(
                (geography, i) =>
                  SOUTH_AMERICA.includes(geography.id) && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: '#ECEFF1',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill: '#00bcd4',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#00bcd4',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
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
                <text
                  textAnchor="middle"
                  y={city.offset}
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fill: '#607D8B',
                  }}
                >
                  {city.name} ({city.temp} ºC)
                </text>
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
