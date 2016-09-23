import React from 'react';

import './index.css'

import MapContainer from '../MapContainer';

import FoundersForm from '../../components/FoundersForm';
import DataControls from '../../components/DataControls';
import FilterTable, { FilterTableHeader, FilterTableControlHeader } from '../../components/FilterTable';

class MainContainer extends React.Component {

  state = {
    header: null,
    companies: [],
    markerLabel: null,
    latitude: null,
    longitude: null,
    geolocation: null,
    filteredCompanies: [],
    searchQuery: '',
    columnSorted: null,
    orderingSorted: 'ASC',
  }

  onFoundersFormSubmit = (header, companies) => {
    companies = companies.map(company => {
      return Object.assign({}, company, { visible: true })
    });
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
      searchQuery: search,
      filteredCompanies,
    });
  }

  onHideShowClick = (row, rowLine) => {

    const rowUpdated = Object.assign({}, row, { visible: !row.visible });
    const companiesUpdated = [
      ...this.state.companies.slice(0, rowLine),
      rowUpdated,
      ...this.state.companies.slice(rowLine + 1),
    ];
    console.log(companiesUpdated);
    this.setState({
      companies: companiesUpdated,
    });

    setTimeout(() => {
      this.filterRows(this.state.searchQuery);
    }, 0);
  }

  sortColumn = (columnSorted, orderingSorted) => {
    const filteredCompanies = this.state.filteredCompanies.sort((c1, c2) => {
      const fieldOne = String(c1[columnSorted]);
      const fieldTwo = String(c2[columnSorted]);

      const compare = fieldOne.localeCompare(fieldTwo);
      return orderingSorted === 'ASC' ? compare : -1 * compare;
    });

    this.setState({
      companies: filteredCompanies,
      filteredCompanies,
      columnSorted,
      orderingSorted,
    });
  }

  renderMap = () => {
    if (this.state.companies.length === 0
      || !((this.state.latitude && this.state.longitude)
            || (this.state.geolocation && this.state.geolocation.length))
        ) {
      return (
        <div className="no-map-available">
          <h1>
            The map will show here.
          </h1>
        </div>
      );
    }

    const companies = this.state.companies
      .filter(company => company.visible)
      .map(company => {
        let companyFormatted = {}
        if (this.state.latitude && this.state.longitude) {
          companyFormatted.position = {
            lat: company[this.state.latitude.value],
            lng: company[this.state.longitude.value],
          };
        }

        if (this.state.geolocation) {
          companyFormatted.address = this.state.geolocation.reduce((address, field) => {
            return `${address}${company[field.value]}`;
          }, '');
        }

        if (this.state.markerLabel) {
          companyFormatted.label = company[this.state.markerLabel.value];
        }

        return companyFormatted;
      });

    return <MapContainer locations={companies}/>;
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
                <FilterTableControlHeader
                  label="Show/hide"
                  render={(row) => {
                    return row.visible ? 'Hide' : 'Show';
                  }}
                  onClick={this.onHideShowClick}
                />
              </FilterTable>
              <button type="button" onClick={this.onResetClick} className="button button--reset">Reset</button>
            </div>
          )}
        </div>
        <div className="map-container">
          {this.renderMap()}
        </div>
      </div>
    );
  }
}

export default MainContainer;
