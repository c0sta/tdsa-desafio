import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

export default function PostsTable(props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {props.tableHeaderTitles.map((title, index) => (
              <TableCell key={index}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{props.children}</TableBody>
      </Table>
    </TableContainer>
  );
}
