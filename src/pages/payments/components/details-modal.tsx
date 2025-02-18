"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FC, useState, useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { getDepositByLiquidations } from "@/features/payments/deposits/depositService";
import { deposit } from "@/types/payments/deposit";
import { Calendar, Clock, CreditCard, Wallet } from "lucide-react";

interface DepositsModalProps {
  isOpen: boolean;
  onClose: () => void;
  liquidationId: number;
}

const DepositsModal: FC<DepositsModalProps> = ({ isOpen, onClose, liquidationId }) => {
  const [deposits, setDeposits] = useState<deposit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && liquidationId) {
      fetchDeposits();
    }
  }, [isOpen, liquidationId]);

  const fetchDeposits = async () => {
    try {
      const data = await getDepositByLiquidations(liquidationId.toString());
      setDeposits(data);
    } catch (error) {
      console.error("Error fetching deposits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="p-0 max-w-4xl bg-[#faf6f1] h-[calc(100vh-80px)] flex flex-col overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-3xl font-bold text-[#582f0e]">
            <Wallet className="h-8 w-8" /> Depósitos de la Liquidación
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 p-6 flex-1 overflow-hidden">
          <ScrollArea className="flex-1 h-[60vh] overflow-auto">
            <div className="space-y-4 pr-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <span className="text-[#713f12] text-xl">Cargando depósitos...</span>
                </div>
              ) : deposits.length > 0 ? (
                deposits.map((deposit, index) => (
                  <motion.div
                    key={deposit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white shadow-lg rounded-xl border-l-4 border-[#db8935] hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#db8935] rounded-full p-2">
                          {deposit.type_payment === "efectivo" ? (
                            <Wallet className="h-6 w-6 text-white" />
                          ) : deposit.type_payment === "transferencia" ? (
                            <CreditCard className="h-6 w-6 text-white" />
                          ) : (
                            <CreditCard className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <span className="text-[#713f12] font-bold text-xl">
                          {deposit.amount.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
                        </span>
                      </div>
                      <Badge variant="outline" className="bg-[#582f0e] text-white border-none px-3 py-1 text-sm">
                        {deposit.type_payment}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[#8b7355]">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        Fecha: {new Date(deposit.date).toLocaleDateString("es-CO")}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[#8b7355]">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        Hora: {new Date(deposit.date).toLocaleTimeString("es-CO")}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex justify-center items-center h-32">
                  <span className="text-[#713f12] text-xl">No hay depósitos registrados</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositsModal;