import React, { PropTypes } from 'react';

import './index.css';

class FoundersForm extends React.Component {

  state = {
    error: null,
  }

  separators = [
    {
      value: 'comma',
      label: 'Comma',
      regex: /,/g,
      isChecked: true,
    },
    {
      value: 'semicolon',
      label: 'Semicolon',
      regex: /;/g,
      isChecked: false,
    },
    {
      value: 'tab',
      label: 'Tab',
      regex: /\t/g,
      isChecked: false,
    },
  ]

  renderSeparators = () => {
    return this.separators.map((separator, i) => (
      <label key={i}>
        <input type="radio" name="separator" value={separator.value} defaultChecked={separator.isChecked}/>
        {separator.label}
      </label>
    ))
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const { separator, foundersData } = evt.target;

    const separatorRegex = this.separators.find((sep) => sep.value === separator.value);

    const lines = foundersData.value.split(/\n/g);

    const head = lines[0].split(separatorRegex.regex).map((header) => ({
        label: header,
        value: header.replace(/[ ]/g, ''),
    }));
    const companies = lines.slice(1).map((line) => {
      return line.split(separatorRegex.regex).reduce((company, detail, index) => {
        company[head[index].value] = detail;
        return company;
      }, {});
    });

    if(companies.length === 0) {
      return this.setState({
        error: 'Please, verify if you have inserted valid data and selected the correct separator and try again.',
      });
    }

    this.setState({
      error: null,
    });
    this.props.onFoundersFormSubmit(head, companies);
  }
  render () {
    return (
      <form className="founders-form" onSubmit={this.onSubmit}>
        {this.state.error && (
          <div className="founders-form__error">{this.state.error}</div>
        )}
        <div className="founders-form__control">
            <label>
              Add founder's data in CSV format
              <textarea name="foundersData"></textarea>
            </label>
        </div>
        <div className="founders-form__control">
            {this.renderSeparators()}
        </div>
        <button type="submit" className="founders-form__button">Show founders</button>
      </form>
    );
  }
}

FoundersForm.propTypes = {
  onFoundersFormSubmit: PropTypes.func.isRequired,
}

export default FoundersForm;
