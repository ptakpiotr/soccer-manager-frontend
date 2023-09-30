import { TableCell, TableCellProps } from "@mui/material";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

interface IProps<T> extends TableCellProps {
  orderBy: keyof T;
  prop: keyof T;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof T>>;
  sortAscending: boolean;
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
}

function SortableTableCell<T>(props: IProps<T>) {
  return (
    <TableCell
      {...props}
      className="sortable-table-cell"
      onClick={() => {
        if (props.prop === props.orderBy) {
          props.setSortAscending((prev) => !prev);
        } else {
          props.setSortAscending(true);
        }

        props.setOrderBy(props.prop);
      }}
    >
      {props.prop.toString()}
      {props.orderBy === props.prop ? (
        props.sortAscending ? (
          <MdArrowUpward />
        ) : (
          <MdArrowDownward />
        )
      ) : (
        <></>
      )}
    </TableCell>
  );
}

export default SortableTableCell;
