import { FC, ReactNode } from "react";
import { Column, useTable } from "react-table";
import styled from "styled-components";

interface YSTableColumn<T extends object = {}> {
  title: string;
  dataIndex: keyof T;
  key?: string;
  render?: (value: any, row: T, index: number) => ReactNode;
}

interface Props<T extends object = {}> {
  columns: YSTableColumn<T>[];
  data: T[];
  width?: string | number;
}

const converseColumns = <T extends object = {}>(
  columns: YSTableColumn<T>[]
): Column<T>[] => {
  return columns.map((c) => ({
    ...c,
    Header: c.title,
    accessor: c.dataIndex,
    _render: c.render,
  }));
};

const YSTablePro: FC<Props> = ({ columns, data, width }) => {
  const tableInstance = useTable({ columns: converseColumns(columns), data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const gerCellView = (cell: any, index: number) => {
    if (cell.column._render) {
      return cell.column._render(cell.value, cell.row, index);
    }
    return cell.render("Cell");
  };

  return (
    <Styles width={width}>
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, index) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            gerCellView(cell, index)
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </Styles>
  );
};

export default YSTablePro;

interface StyleProps {
  width?: string | number;
}

const Styles = styled.div<StyleProps>`
  padding: 1rem;

  table {
    width: ${(props) => props.width || "100%"};
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
