import React, { PropTypes } from 'react';

import { camelize } from '../../utils';

class Marker extends React.Component {
  evtNames = ['click', 'onmouseover']

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

    this.evtNames.forEach(event => (
      this.marker.addListener(event, this.handleEvent(event))
    ));
  }

  handleEvent (event) {
    return (e) => {

      const evtName = `on${camelize(event)}`;

      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    };
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
