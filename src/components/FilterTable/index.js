import React, { PropTypes } from 'react';

import Modal from '../Modal';

import './index.css';


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

    const {
      value,
      label,
      columnSorted,
      orderingSorted
    } = this.props;
    return (
      <th value={value} onClick={this.onHeaderClick}>
        <div className="filter-table__header">
          <span>
            {label}
          </span>
          <span>
            {value === columnSorted && (orderingSorted === 'ASC' ? '▼' : '▲')}
          </span>
        </div>
      </th>
    );
  }
}

class FilterTableImageCell extends React.Component {

  state = {
    loading: true,
    error: false,
  }

  componentDidMount () {
    this.loadImage(this.props.label);
  }

  componentWillUpdate (nextProps) {
    if (nextProps.label !== this.props.label) {
      this.loadImage(nextProps.label);
    }
  }

  loadImage (source) {
    const image = new Image();

    this.setState({
      loading: true,
      error: false,
    });

    image.onerror = () => {
      this.setState({
        error: true,
        loading: false,
      });
    }
    image.onload = () => {
      this.setState({
        loading: false,
        error: false,
      });
    }

    image.src = source;
  }

  render () {
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

export class FilterTableControlHeader extends React.Component {
  render () {
    return (
      <th>
        {this.props.label}
      </th>
    )
  }
}

const FilterTableCell = ({value, label}) => {

  const imageRegex = /^http[s]?:\/\/.*(\.(jpg|png|gif))$/g;
  const siteRegex = /^http[s]?:\/\/.*$/g;

  if(imageRegex.test(label)) {
    return <FilterTableImageCell value={value} label={label}/>
  }

  if(siteRegex.test(label)) {
    return <FilterTableLinkCell value={value} label={label}/>
  }

  return (
    <td value={value}>
      {label}
    </td>
  );
};

const FilterTableRow = ({ row, rowLine, columns, controlsColumns }) => {
  if (!columns || columns.length === 0) {
    return <tr></tr>;
  }
  return (
    <tr>
      {columns.map((column, i) => (
        <FilterTableCell key={i} value={column} label={row[column]}/>
      ))}
      {controlsColumns.map(({props}, i) => {
        return (
          <td key={i}>
            <button onClick={e => props.onClick(row, rowLine)}>
              {props.render(row)}
            </button>
          </td>
        )
      })}
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

    const controlsColumns = React.Children.map(this.props.children, (child, index) => {
      if (child.type === FilterTableControlHeader) {
        return child;
      }
      return;
    });

    return (
      <div className="filter-table-container">
        <h2>
          Founder's table
        </h2>
        <div className="filter-table__content">
          <table className="filter-table">
            <thead>
              <tr>
                {this.props.children}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={React.Children.count(this.props.children)}>
                  <div className="filter-table__search">
                    <input type="text" placeholder="Type to search" onChange={this.onSearchChange} className="filter-table__search-field"/>
                  </div>
                </td>
              </tr>
              {this.props.rows.map((row, i) => <FilterTableRow key={i} rowLine={i} row={row} columns={columnsValues} controlsColumns={controlsColumns}/>)}
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
