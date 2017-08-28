import AppBar from 'material-ui/AppBar'
import fetch from 'isomorphic-fetch'
import IconButton from 'material-ui/IconButton'
import React from 'react'
import Sun from 'material-ui/svg-icons/device/brightness-high'
import ThemeProvider from 'material-ui/styles/MuiThemeProvider'
import withRedux from 'next-redux-wrapper'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps'

import { update } from '../actions'
import { initStore } from '../store'
import countries from '../data/countries'
import { popScale } from '../other/scale'
import { wrapperStyles, mapStyles, textStyle } from '../other/styles'

class Map extends React.Component {
  static getInitialProps({ store }) {
    // Initial dispatch
    store.dispatch(update(0, 10))
    return { ...store.getState() }
  }

  render = () =>
    <ThemeProvider>
      <div style={wrapperStyles}>
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
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup center={[-60, -25]} disablePanning>
            <Geographies geographyUrl="/static/world-50m.json">
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    countries.includes(geography.id) &&
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={mapStyles}
                    />
                )}
            </Geographies>
            <Markers>
              {(this.props.cities || []).map((city, i) =>
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
                  <text textAnchor="middle" y={city.offset} style={textStyle}>
                    {city.name} ({city.temp} ºC)
                  </text>
                </Marker>
              )}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </ThemeProvider>
}

const mapStateToProps = ({ cities }) => ({ cities })

export default withRedux(initStore, mapStateToProps)(Map)
