import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const confirmAction = (
  message: string,
  yes: string,
  onProceed: () => void,
  onCancel: () => void,
  timeoutSeconds: number = 5
) => {
  toast(
    (t) => {
      const [timeLeft, setTimeLeft] = useState(timeoutSeconds);
      
      useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              toast.dismiss(t.id);
              onCancel();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      }, []);
      
      return (
        <div className="flex flex-col gap-4 items-center rounded-lg max-w-md w-full">
          <p className="text-xl font-bold text-[#b45309] text-center">{yes}</p>
          <p className="text-sm text-gray-700 text-center">{message}</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div 
              className="bg-[#b45309] h-2 rounded-full transition-all duration-1000"
              style={{width: `${(timeLeft / timeoutSeconds) * 100}%`}}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            Redirigiendo en {timeLeft} segundos...
          </p>
          <div className="flex gap-4 mt-2 w-full justify-center">
            <Button
              size="lg"
              onClick={() => {
                toast.dismiss(t.id);
                onProceed();
              }}
              className="bg-amber-700 text-white px-6 py-3 rounded-xl hover:bg-amber-600 font-medium text-lg"
            >
              Sí
            </Button>
            <Button
              size="lg"
              onClick={() => {
                toast.dismiss(t.id);
                onCancel();
              }}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 font-medium text-lg"
            >
              No
            </Button>
          </div>
        </div>
      );
    },
    {
      duration: Infinity,
      className:
        "flex justify-center items-center p-6 bg-white border-l-4 border-[#b45309] shadow-lg rounded-lg w-full max-w-md mx-auto",
      position: "top-center",
    }
  );
};

export default confirmAction;