import React, { PropTypes } from 'react';

import Modal from '../Modal';

import './index.css';

const imageRegex = /^http[s]?:\/\/.*(\.(jpg|png|gif))$/g;
const siteRegex = /^http[s]?:\/\/.*$/g;

export class FilterTableHeader extends React.Component {

  onHeaderClick = () => {
    let {
      value,
      columnSorted,
      orderingSorted,
      sortColumn,
    } = this.props;

    if (value === columnSorted) {
      orderingSorted = orderingSorted === 'ASC' ? 'DESC' : 'ASC';
    } else {
      orderingSorted = 'ASC';
    }

    sortColumn(value, orderingSorted);
  }

  shouldComponentUpdate (nextProps) {
    return this.props.value === nextProps.columnSorted || this.props.value === this.props.columnSorted;
  }

  render () {
    console.log('RENDERED');
    const {
      value,
      label,
      columnSorted,
      orderingSorted
    } = this.props;
    return (
      <th value={value} onClick={this.onHeaderClick}>
        {label} {value === columnSorted && (orderingSorted === 'ASC' ? '▲' : '▼')}
      </th>
    );
  }
}

class FilterTableImageCell extends React.Component {

  state = {
    loading: true,
    error: false,
  }

  componentDidMount() {
    const image = new Image();
    image.onerror = () => {
      this.setState({
        error: true,
        loading: false,
      });
    }
    image.onload = () => {
      this.setState({
        loading: false,
      });
    }

    image.src = this.props.label;
  }

  render() {
    const { value } = this.props;

    if(this.state.loading) {
      return (
        <td>
          ...
        </td>
      );
    }

    if (this.state.error) {
      return (
        <td>
          no image
        </td>
      );
    }
    return (
      <td value={value}>
        <Modal
          image={this.props.label}
          imageDescription="Company's foundation">
          open image
        </Modal>
      </td>
    )
  }
};

const FilterTableLinkCell = ({value, label}) => {
  return (
    <td value={value}>
      <a href={label} target="_blank">site</a>
    </td>
  )
};

const FilterTableCell = ({value, label}) => {
  if(imageRegex.exec(label)) {
    imageRegex.exec('');
    return <FilterTableImageCell value={value} label={label}/>
  }

  if(siteRegex.exec(label)) {
    siteRegex.exec('');
    return <FilterTableLinkCell value={value} label={label}/>
  }

  return (
    <td value={value}>
      {label}
    </td>
  );
};

const FilterTableRow = ({ row, columns}) => {
  if (!columns || columns.length === 0) {
    return <tr></tr>;
  }
  return (
    <tr>
      {columns.map((column, i) => (
        <FilterTableCell key={i} value={column} label={row[column]}/>
      ))}
    </tr>
  );
};

class FilterTable extends React.Component {

  onSearchChange = (evt) => {
    const search = evt.target.value;
    this.props.filterRows(search);
  }

  render () {

    const columnsValues = React.Children.map(this.props.children, ({ props }) => {
      return props.value;
    });

    return (
      <div className="filter-table-container">
        <div className="filter-table__search">
          <input type="text" placeholder="Type to search" onChange={this.onSearchChange} className="filter-table__search-field"/>
        </div>
        <div className="filter-table__content">
          <table className="filter-table">
            <thead>
              <tr>
                {this.props.children}
              </tr>
            </thead>
            <tbody>
              {this.props.rows.map((row, i) => <FilterTableRow key={i} row={row} columns={columnsValues}/>)}
            </tbody>
          </table>
      </div>
      </div>
    )
  }
}

FilterTable.propTypes = {
  rows: PropTypes.array.isRequired,
  filterRows: PropTypes.func.isRequired,
};

export default FilterTable;
