import React, { PropTypes } from 'react';


export const FilterTableHeader = ({value, label}) => (
  <th value={value}>
    {label}
  </th>
);

const FilterTableCell = ({value, label}) => (
  <td value={value}>
    {label}
  </td>
);

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
    console.log(columnsValues);
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
