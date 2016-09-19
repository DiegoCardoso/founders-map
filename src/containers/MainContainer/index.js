import React from 'react';

import './index.css'

import FoundersForm from '../../components/FoundersForm';

class MainContainer extends React.Component {

  state = {
    header: null,
    companies: [],
  }

  onFoundersFormSubmit = (header, companies) => {
    this.setState({
      header,
      companies,
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
          { this.state.header && <h2>Foi aqui</h2>}
        </div>
        <div className="map-container">

        </div>
      </div>
    );
  }
}

export default MainContainer;
