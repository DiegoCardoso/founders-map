import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import Marker from './Marker';

class Map extends React.Component {

  state = {
    currentLocation: this.props.initialCenter,
    map: null,
    positions: [],
  }

  componentDidMount () {
    this.loadMap();
    this.populateMarkersPositions();
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }

    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentLocation === this.state.currentLocation) {
      return false;
    }

    return true;
  }

  async populateMarkersPositions () {
    const { google } = this.props;

    const positions = await Promise.all(React.Children.map(this.props.children, async c => {
      const { position, address } = c.props;

      if (position) {
        return new google.maps.LatLng(position.lat, position.lng);
      }

      return await this.getPositionFromAddress(google, address);
    }));

    const bounds = new google.maps.LatLngBounds();

    positions.forEach(position => bounds.extend(position));

    this.setState({
      positions,
      currentLocation: bounds,
    });
  }

  loadMap () {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const {map : mapRef} = this.refs;
      const node = findDOMNode(mapRef);

      const { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;

      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center,
        zoom,
      });

      this.map = new maps.Map(node, mapConfig);
      this.setState({
        map: this.map,
      });
    }
  }

  recenterMap () {
    const map = this.map;
    let { currentLocation : curr} = this.state;
    const { maps } = this.props.google;

    if (map) {
      if (curr instanceof maps.LatLngBounds) {
        return map.fitBounds(curr);
      }
      if (!(curr instanceof maps.LatLng)) {
        curr = new maps.LatLng(curr.lat, curr.lng);
        return map.panTo(curr);
      }
      map.panTo(curr);
    }

  }

  renderChildren () {
    const { children } = this.props;

    if (!children || !this.state.map) {
      return;
    }
    return React.Children.map(children, (c, index) => {
      const position = this.state.positions[index];

      return React.cloneElement(c, {
        position,
        map: this.state.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }

  getPositionFromAddress = (google, address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address
      }, ([result]) => {
        if (!result || !result.geometry) {
          reject();
        }
        resolve(result.geometry.location);
      });
    });

  }

  render () {
    const container = {
      position: 'relative',
      width: '100%',
      height: '100%'
    }
    const map = {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    };

    return (
      <div style={container}>
        <div ref="map" style={map}>
          Loading map...
          { this.renderChildren() }
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  google: PropTypes.object.isRequired,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
};

Map.defaultProps = {
  zoom: 11,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416,
  },
};

export default Map;

export { Marker };
