import withProps from 'recompose/withProps';
import {
  Table as MuiTable,
  TableBody,
  TableHeader,
  TableHeaderColumn as MuiTableHeaderColumn,
  TableRow,
  TableRowColumn as TableCell,
} from 'material-ui/Table';

export const Table = withProps(props => ({
  style: {
    background: 'transparent',
    ...props.style,
  },
}))(MuiTable);

export const TableHeaderColumn = withProps(props => ({
  style: {
    fontWeight: 'bold',
    ...props.style,
  },
}))(MuiTableHeaderColumn);

export {
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
};
