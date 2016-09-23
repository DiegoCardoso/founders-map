import React from 'react';

import GoogleApiComponent from '../../utils/GoogleApiComponent';

import Map, { Marker } from '../../components/Map';

class MapContainer extends React.Component {
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
        <Map google={google}>
          {this.props.locations.map((company, index) => (
              <Marker key={index} {...company}/>
          ))}

        </Map>
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyDoKmbcBUX7KAUaT4l9bFHqGq13U2oCSlA',
})(MapContainer);
