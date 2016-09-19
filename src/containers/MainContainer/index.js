import React from 'react';

import './index.css'

import FoundersForm from '../../components/FoundersForm';
import DataControls from '../../components/DataControls';

class MainContainer extends React.Component {

  state = {
    header: null,
    companies: [],
    markerLabel: {},
    latitude: {},
    longitude: {},
    geolocation: [],
  }

  onFoundersFormSubmit = (header, companies) => {
    this.setState({
      header,
      companies,
    });
  }

  onLabelChange = (markerLabel) => {
    this.setState({
      markerLabel,
    });
  }

  onLatitudeChange = (latitude) => {
    this.setState({
      latitude
    })
  }

  onLongitudeChange = (longitude) => {
    this.setState({
      longitude
    })
  }

  onGeolocationChange = (geolocation) => {
    this.setState({
      geolocation,
    });
  }

  onResetClick = (evt) => {
    evt.preventDefault();
    this.setState({
      header: null,
      companies: [],
    });
  }

  render () {
    return (
      <div className="main-container">
        <div className="controls-container">
          <header className="controls-container__header">
            <h1>
              Founder's Map
            </h1>
          </header>
          { !this.state.header && <FoundersForm onFoundersFormSubmit={this.onFoundersFormSubmit}/>}
          { this.state.header && (
            <div>
              <DataControls
                columns={this.state.header}
                {...this.state}
                onLabelChange={this.onLabelChange}
                onLatitudeChange={this.onLatitudeChange}
                onLongitudeChange={this.onLongitudeChange}
                onGeolocationChange={this.onGeolocationChange}
                />
              <button type="button" onClick={this.onResetClick}>Reset</button>
            </div>
          )}
        </div>
        <div className="map-container">

        </div>
      </div>
    );
  }
}

export default MainContainer;
