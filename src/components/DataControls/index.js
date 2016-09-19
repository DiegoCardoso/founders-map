import React, { PropTypes } from 'react'
import Select from 'react-select';

import 'react-select/dist/react-select.css';

class DataControls extends React.Component {

  render () {
    return (
      <div className="data-controls">
        <h2>Please, associate the data</h2>
        <div className="data-controls__options">
          <div className="data-controls__option">
            <label>
              Marker label:
              <Select
                value={this.props.markerLabel}
                name="marker-label"
                onChange={this.props.onLabelChange}
                options={this.props.columns}/>
            </label>
          </div>
          <div className="data-controls__option">
            <label>
              Latitude:
              <Select
                value={this.props.latitude}
                name="latitude"
                onChange={this.props.onLatitudeChange}
                options={this.props.columns}/>
            </label>
          </div>
          <div className="data-controls__option">
            <label>
              Longitude:
              <Select
                value={this.props.longitude}
                name="longitude-info"
                onChange={this.props.onLongitudeChange}
                options={this.props.columns}/>
            </label>
          </div>
          <div className="data-controls__option">
            <label>
              Geolocation:
              <Select
                value={this.props.geolocation}
                name="geolocation"
                multi={true}
                onChange={this.props.onGeolocationChange}
                options={this.props.columns}/>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

DataControls.propTypes = {
  columns: PropTypes.array.isRequired,
  markerLabel: PropTypes.object.isRequired,
  latitude: PropTypes.object.isRequired,
  longitude: PropTypes.object.isRequired,
  geolocation: PropTypes.array.isRequired,

  onLabelChange: PropTypes.func.isRequired,
  onLatitudeChange: PropTypes.func.isRequired,
  onLongitudeChange: PropTypes.func.isRequired,
  onGeolocationChange: PropTypes.func.isRequired,
};

export default DataControls;
