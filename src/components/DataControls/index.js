import React, { PropTypes } from 'react'
import Select from 'react-select';

import 'react-select/dist/react-select.css';
import './index.css';

const SelectControl = ({label, name, value, onChange, multi, columns}) => (
    <div className="data-controls__option">
      <label>
        {label}
        <Select
          value={value}
          name={name}
          onChange={onChange}
          options={columns}
          multi={multi}
        />
      </label>
    </div>
);

class DataControls extends React.Component {

  render () {
    return (
      <div className="data-controls">
        <h2>Please, associate the data</h2>
        <div className="data-controls__options">
          <SelectControl
            label="Marker label"
            name="marker-label"
            value={this.props.markerLabel}
            onChange={this.props.onLabelChange}
            columns={this.props.columns}
          />
          <SelectControl
            label="Latitude"
            name="latitude"
            value={this.props.latitude}
            onChange={this.props.onLatitudeChange}
            columns={this.props.columns}
          />
          <SelectControl
            label="Longitude"
            name="longitude"
            value={this.props.longitude}
            onChange={this.props.onLongitudeChange}
            columns={this.props.columns}
          />
          <SelectControl
            label="Geolocation"
            name="geolocation"
            value={this.props.geolocation}
            onChange={this.props.onGeolocationChange}
            multi={true}
            columns={this.props.columns}
          />
        </div>
      </div>
    )
  }
}

DataControls.propTypes = {
  columns: PropTypes.array.isRequired,
  markerLabel: PropTypes.object,
  latitude: PropTypes.object,
  longitude: PropTypes.object,
  geolocation: PropTypes.array,

  onLabelChange: PropTypes.func.isRequired,
  onLatitudeChange: PropTypes.func.isRequired,
  onLongitudeChange: PropTypes.func.isRequired,
  onGeolocationChange: PropTypes.func.isRequired,
};

export default DataControls;
