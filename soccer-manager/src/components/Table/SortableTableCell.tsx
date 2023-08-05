import { TableCell, TableCellProps } from "@mui/material";
import { ITableTeamInfo } from "../../Types";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

interface IProps extends TableCellProps {
  orderBy: keyof ITableTeamInfo;
  prop: keyof ITableTeamInfo;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof ITableTeamInfo>>;
  sortAscending: boolean;
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
}

function SortableTableCell(props: IProps) {
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
      {props.prop}
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
