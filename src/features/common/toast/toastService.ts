import { toast } from "react-hot-toast";

export const ToastService = {

    success: (message: string) =>
        toast.success(message, {
            duration: 2000,
            style: {
                background: "#fff",
                color: "#92400E", // equivale al text-amber-800
                borderRadius: "10px",
                padding: "12px",
                fontSize: "14px",
            },
        }),

    error: (message: string) =>
        toast.error(message, { duration: 2000, style: { background: "#fff", color: "#92400E" } }),

    info: (message: string) =>
        toast(message, { icon: "ℹ️", duration: 4000, style: { background: "#fff", color: "#92400E" } }),

    warning: (message: string) =>
        toast(message, { icon: "⚠️", duration: 4000, style: { background: "#fff", color: "#92400E" } }),

};
