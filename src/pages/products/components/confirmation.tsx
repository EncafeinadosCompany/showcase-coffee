import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const confirmAction = (
  message: string,
  yes: string,
  onProceed: () => void,
  onCancel: () => void
) => {
  toast(
    (t) => (
      <div className="flex flex-col gap-2 items-center">
        <p className="text-[#b45309] text-center">{yes}</p>
        <p className="text-xs text-gray-500">{message}</p>
        <div className="flex gap-2 mt-2 items-center">
          <Button
            size="sm"
            onClick={() => {
              toast.dismiss(t.id);
              onProceed();
            }}
            className="bg-amber-700 text-white px-3 py-1 rounded-[5px] hover:bg-amber-600"
          >
            Seguir
          </Button>
          <Button
            size="sm"
            onClick={() => {
              toast.dismiss(t.id);
              onCancel();
            }}
            className="bg-black text-white px-3 py-1 rounded-[5px]"
          >
            Volver
          </Button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      className:
        "inline-flex items-center border-l-4 border-[#b45309] shadow-md rounded-[5px] p-4 bg-white",
      position: "top-center",
    }
  );
};
export default confirmAction;
