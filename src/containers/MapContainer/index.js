import React from 'react';

import GoogleApiComponent from '../../utils/GoogleApiComponent';

import Map, { Marker, InfoWindow } from '../../components/Map';

class MapContainer extends React.Component {
  state = {
    markerActive: {},
    infoWindowVisible: false,
    selectedPlace: {},
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      infoWindowVisible: true,
      markerActive: marker,
      selectedPlace: props,
    });
  }

  onMapClick = () => {
    this.setState({
      infoWindowVisible: false,
      markerActive: {},
      selectedPlace: {},
    });
  }

  onInfoWindowClose = () => {
    this.setState({
      infoWindowVisible: false,
      markerActive: {},
      selectedPlace: {},
    });
  }

  render () {
    const { loaded, google } = this.props;

    const style = {
      height: '100vh',
      width: '100%',
    }

    if (!loaded) {
      return (
        <div style={style}>
          Loading...
        </div>
      );
    }

    return (
      <div style={style}>
        <Map
          google={google}
          onClick={this.onMapClick}>
          {this.props.locations.map((company, index) => (
              <Marker key={index} {...company} onClick={this.onMarkerClick}/>
          ))}
          <InfoWindow
            marker={this.state.markerActive}
            visible={this.state.infoWindowVisible}
            onClose={this.onInfoWindowClose}>
            <div>
              <h1>
                {this.state.selectedPlace.label}
              </h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyDoKmbcBUX7KAUaT4l9bFHqGq13U2oCSlA',
})(MapContainer);
