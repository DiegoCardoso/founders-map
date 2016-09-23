import React, { PropTypes } from 'react';

class Marker extends React.Component {

  componentDidUpdate (prevProps) {

    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
      this.renderMarker();
    }
  }

  componentDidMount () {
    if (this.props.map){
      this.renderMarker();
    }
  }

  componentWillUnmount () {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  renderMarker () {
    const {
      map,
      google,
      position,
      mapCenter,
    } = this.props;

    const pos = position || mapCenter;

    const option = {
      map,
      position: pos,
    };

    this.marker = new google.maps.Marker(option);
  }

  render () {
    return null;
  }
}

Marker.propTypes = {
  position: PropTypes.object,
  address: PropTypes.string,
  label: PropTypes.string,
  map: PropTypes.object,
}

export default Marker;
