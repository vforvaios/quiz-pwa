import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

interface CrudTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  pagination: any;
  handlePageChange: any;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function CrudTable<T extends { id: string | number }>({
  data,
  columns,
  pagination,
  handlePageChange,
  onEdit,
  onDelete,
}: CrudTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key as string} className="px-4 py-2">
                {col.label}
              </TableCell>
            ))}
            {(onEdit || onDelete) && (
              <TableCell align="right" className="px-4 py-2 text-right">
                Ενέργειες
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => (
            <TableRow
              key={item.id}
              className={i % 2 ? "bg-gray-50" : "bg-white"}
            >
              {columns.map((col) => (
                <TableCell key={col.key as string} className="px-4 py-2">
                  {String(item[col.key])}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell className="px-4 py-2 flex gap-2 justify-end">
                  {onEdit && <Button onClick={() => onEdit(item)}>Edit</Button>}
                  {onDelete && (
                    <Button onClick={() => onDelete(item)}>
                      <i className="icon-trash-empty" />
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={100}
        page={pagination.page}
        onPageChange={handlePageChange}
        rowsPerPage={10}
        onRowsPerPageChange={() => {}}
      />
    </div>
  );
}
