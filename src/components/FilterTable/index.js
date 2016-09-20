import React, { PropTypes } from 'react';

const imageRegex = /^http[s]?:\/\/.*(\.(jpg|png|gif))$/g;
const siteRegex = /^http[s]?:\/\/.*$/g;

export const FilterTableHeader = ({value, label}) => (
  <th value={value}>
    {label}
  </th>
);

class FilterTableImageCell extends React.Component {

  state = {
    loading: true,
    error: false,
    source: '',
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
        source: this.props.label,
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
        <img width="100px" src={this.state.source} alt="Company's foundation"/>
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
  render () {

    const columnsValues = React.Children.map(this.props.children, ({ props }) => {
      return props.value;
    });

    return (
      <table>
        <thead>
          <tr>
            {this.props.children}
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map((row, i) => <FilterTableRow key={i} row={row} columns={columnsValues}/>)}
        </tbody>
      </table>
    )
  }
}

FilterTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default FilterTable;
