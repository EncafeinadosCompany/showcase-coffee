import { useAppSelector } from "@/hooks/useAppSelector";

export const HomePage = () => {
    const employee = useAppSelector((state) => state.auth.employee);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Bienvenido a Encafeinados
                </h1>
                <h6>ID DE LA TIENDA: {employee ? employee.id_store ?? "No asignado" : "No asignado"}</h6>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Aplicación moderna desarrollada con React, Vite y Tailwind CSS
                </p>
            </div>
        </div>
    );
};
