import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchProviders, addProvider, editProvider, removeProvider } from "@/features/providers/providerSlice";

export const ProvidersPage = () => {
  const dispatch = useAppDispatch();
  const { providers, isLoading, error } = useAppSelector((state) => state.providers);

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch(editProvider({ id: editingId, provider: form }));
      setEditingId(null);
    } else {
      dispatch(addProvider(form));
    }
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Proveedores</h2>

      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Cargando...</p>}

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nombre"
          className="border p-2 m-1"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Correo"
          className="border p-2 m-1"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Teléfono"
          className="border p-2 m-1"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <ul>
        {providers.map((provider) => (
          <li key={provider.id} className="border p-2 my-2 flex justify-between">
            <span>{provider.name} - {provider.email} - {provider.phone}</span>
            <div>
              <button onClick={() => { setEditingId(provider.id); setForm(provider); }} className="bg-yellow-500 text-white p-2 rounded mx-1">
                Editar
              </button>
              <button onClick={() => dispatch(removeProvider(provider.id))} className="bg-red-500 text-white p-2 rounded">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
