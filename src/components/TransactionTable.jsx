import { Button } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { NumericFormat } from "react-number-format";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { Box } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const TransactionsTable = ({ data }) => {
  const handleExportRows = (rows) => {
    const rowData = rows?.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        header: "Description",
        accessorKey: "description",
        size: 300,
      },

      {
        header: "Amount",
        accessorKey: "amount",
        size: 200,
        Cell: ({ renderedCellValue }) => {
          const amount = renderedCellValue;
          const color = amount < 0 ? "red" : "green";

          return (
            <span style={{ color, fontWeight: "600" }}>
              <NumericFormat
                value={Math.abs(amount)} // show absolute value without sign, since color implies sign
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </span>
          );
        },
      },
      {
        header: "Date",
        accessorKey: "date",
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <span style={{ whiteSpace: "nowrap" }}>
            {moment(renderedCellValue).format("DD MMM YYYY")}
          </span>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    initialState: {
      sorting: [
        {
          id: "date",
          desc: true,
        },
      ],
    },
    enableRowSelection: true,
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: "600px" } },
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white rounded-lg"
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white rounded-lg"
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white rounded-lg"
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white rounded-lg"
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return (
    <MaterialReactTable
      table={table}
      onRowClick={(row) => handleRowClick(row?.original)}
    />
  );
};

export default TransactionsTable;
