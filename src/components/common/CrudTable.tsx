import { Button } from "./Button";

interface CrudTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function CrudTable<T extends { id: string | number }>({
  data,
  columns,
  onEdit,
  onDelete,
}: CrudTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100  text-xs text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className="px-4 py-2">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-2 text-right">Ενέργειες</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id} className={i % 2 ? "bg-gray-50" : "bg-white"}>
              {columns.map((col) => (
                <td key={col.key as string} className="px-4 py-2">
                  {String(item[col.key])}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-2 flex gap-2 justify-end">
                  {onEdit && <Button onClick={() => onEdit(item)}>Edit</Button>}
                  {onDelete && (
                    <Button variant="danger" onClick={() => onDelete(item)}>
                      <i className="icon-trash-empty" />
                    </Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
