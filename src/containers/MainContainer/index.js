import React from 'react';

import './index.css'

import FoundersForm from '../../components/FoundersForm';
import DataControls from '../../components/DataControls';
import FilterTable, { FilterTableHeader } from '../../components/FilterTable';

class MainContainer extends React.Component {

  state = {
    header: null,
    companies: [],
    markerLabel: null,
    latitude: null,
    longitude: null,
    geolocation: null,
    filteredCompanies: [],
    columnSorted: null,
    orderingSorted: 'ASC',
  }

  onFoundersFormSubmit = (header, companies) => {
    this.setState({
      header,
      companies,
      filteredCompanies: companies,
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

  filterRows = (search) => {
    const searchRegex = new RegExp(search, 'i');
    const filteredCompanies = this.state.companies.filter((company) => {
      return searchRegex.test(company.$rawContent);
    });

    this.setState({
      filteredCompanies,
    });
  }

  sortColumn = (columnSorted, orderingSorted) => {
    const filteredCompanies = this.state.filteredCompanies.sort((c1, c2) => {
      const fieldOne = String(c1[columnSorted]);
      const fieldTwo = String(c2[columnSorted]);

      const compare = fieldOne.localeCompare(fieldTwo);
      return orderingSorted === 'ASC' ? compare : -1 * compare;
    });

    this.setState({
      filteredCompanies,
      columnSorted,
      orderingSorted,
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
              <FilterTable
                rows={this.state.filteredCompanies}
                filterRows={this.filterRows}
                >
                {this.state.header.map((header, i) => (
                  <FilterTableHeader
                    key={i}
                    {...header}
                    sortColumn={this.sortColumn}
                    columnSorted={this.state.columnSorted}
                    orderingSorted={this.state.orderingSorted}
                    />
                ))}
              </FilterTable>
              <button type="button" onClick={this.onResetClick} className="button button--reset">Reset</button>
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
