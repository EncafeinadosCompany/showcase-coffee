import { toast } from "react-hot-toast";

export const ToastService = {

    success: (message: string) =>
        toast(message, { icon: "✅", duration: 4000, style: { background: "#198754", color: "#fff" } }),

    error: (message: string) =>
        toast(message, { icon: "❌", duration: 4000, style: { background: "#dc3545", color: "#fff" } }),

    info: (message: string) =>
        toast(message, { icon: "ℹ️", duration: 4000, style: { background: "#0dcaf0", color: "#fff" } }),

    warning: (message: string) =>
        toast(message, { icon: "⚠️", duration: 4000, style: { background: "#facc15", color: "#000" } }),
};


// toast.success("", {
//     icon: "✅",
//     duration: 4000,
//     style: {
//         background: "#FFF8E1",
//         color: "#6D4C41",
//         border: "1px solid #4E342E",
//         padding: "12px",
//         borderRadius: "8px",
//         fontWeight: "bold",
//     },
// });


// toast.error("Venta cancelada.", {
//     icon: "❌",
//     duration: 4000,
//     style: {
//         background: "#B71C1C",
//         color: "#FFEBEE",
//         border: "1px solid #7F0000",
//         padding: "12px",
//         borderRadius: "8px",
//         fontWeight: "bold",
//     },
// });