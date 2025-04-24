import { useEffect, useState, useRef } from "react";
import { fetchApps, addApp, deleteApp } from "../api";

export default function Settings() {
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({ name: "", path: "", param: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchApps().then(setApps);
  }, []);

  const handleSubmit = async () => {
    await addApp(form);
    setForm({ name: "", path: "", param: "" });
    setApps(await fetchApps());
  };

  const handleDelete = async (id) => {
    await deleteApp(id);
    setApps(await fetchApps());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, path: file.path || file.name }));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <h2>Settings</h2>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="App Name"
      />
      <input
        value={form.path}
        onChange={(e) => setForm({ ...form, path: e.target.value })}
        placeholder="Path"
      />
      <button onClick={openFileDialog}>Select EXE File</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".exe"
      />
      <input
        value={form.param}
        onChange={(e) => setForm({ ...form, param: e.target.value })}
        placeholder="Param"
      />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {apps.map((app) => (
          <li key={app.id}>
            {app.name} - {app.path}
            <button onClick={() => handleDelete(app.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
