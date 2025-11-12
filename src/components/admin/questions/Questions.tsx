import { useState } from "react";
import { useCrud } from "@/hooks/useCrud";
import { Button } from "../../common/Button";
import { CrudTable } from "../../common/CrudTable";
import { Modal } from "../Modal";
import { Input } from "../Input";

interface User {
  id: number;
  name: string;
  email: string;
}

const Questions = () => {
  const { data, create, update, remove, isLoading } = useCrud<User>(
    "/api/admin/questions"
  );
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser) {
      await update({ id: editUser.id, item: form });
    } else {
      await create(form);
    }
    setForm({ name: "", email: "" });
    setEditUser(null);
    setOpen(false);
  };

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Users</h1>
        <Button onClick={() => setOpen(true)}>+ Add User</Button>
      </div>

      <CrudTable
        data={data}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
        ]}
        onEdit={(user) => {
          setEditUser(user);
          setForm({ name: user.name, email: user.email });
          setOpen(true);
        }}
        onDelete={(user) => remove(user.id)}
      />

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditUser(null);
        }}
        title={editUser ? "Edit User" : "Add User"}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{editUser ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Questions;
