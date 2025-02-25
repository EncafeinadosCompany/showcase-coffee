import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const confirmAction = (message: string, onProceed: () => void, onCancel: () => void) => {

    toast(
      (t) => (
        <div>
          <p className = "text-[#b45309] text-center">{message}</p>
          <div className="flex gap-2 mt-2 items-center">
            <Button
              size = "sm"
              onClick={() => {
                toast.dismiss(t.id);
                onProceed();
              }}
              className="bg-amber-700 text-white px-3 py-1 rounded-[5px] hover:bg-amber-600"
            >
              Seguir
            </Button>
            <Button
              size = "sm"
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
      { duration: Infinity , 
        className:"inline-flex items-center border-l-4 border-[#b45309]"
      }
    );
  }
  export default confirmAction;