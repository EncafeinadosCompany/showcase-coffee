import { toast } from "react-hot-toast";
import { createPortal } from "react-dom";

export const ToastService = {

    success: (message: string) =>
        toast.success(message, {
            duration: 4000,
            style: {
                background: "#fff",
                color: "#b45309", // equivale al text-amber-700
                borderRadius: "10px",
                padding: "12px",
                fontSize: "14px",
            },
        }),

    error: (message: string) =>
        toast.error(message, { duration: 4000, style: { background: "#fff", color: "#b45309" } }),

    info: (message: string) =>
        toast(message, { icon: "ℹ️", duration: 4000, style: { background: "#fff", color: "#b45309" } }),

    warning: (message: string) =>
        toast(message, { icon: "⚠️", duration: 4000, style: { background: "#fff", color: "#b45309" } }),

    
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