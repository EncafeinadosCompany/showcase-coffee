import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CreditCard, Banknote, AlertCircle, ChevronLeft, CircleDollarSign } from "lucide-react";

interface PaymentSectionProps {
    total: number;
    onCompleteSale: (paymentMethod: string) => void;
    onCancelSale: () => void;
}

export default function Payment({ total, onCompleteSale, onCancelSale }: PaymentSectionProps) {
    const [paymentMethod, setPaymentMethod] = useState("efectivo");
    const [receivedAmount, setReceivedAmount] = useState("");
    const change = paymentMethod === "efectivo" ?
        Number(receivedAmount) - total : 0;

    const handleCompleteSale = () => {
        if (paymentMethod === "efectivo" && Number(receivedAmount) < total) {
            console.error("Monto insuficiente.");
            return;
        }
        onCompleteSale(paymentMethod);
        setReceivedAmount("");
    };

    const handleCancelSale = () => {
        onCancelSale();
        setReceivedAmount("");
    };

    return (
        <Card className="bg-white shadow-lg h-[calc(100vh-120px)] overflow-hidden">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#4A3728] flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Método de Pago
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <RadioGroup
                    defaultValue="efectivo"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                >
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-amber-50 cursor-pointer">
                        <RadioGroupItem value="efectivo" id="efectivo" />
                        <Label htmlFor="efectivo" className="flex items-center gap-2 cursor-pointer">
                            <Banknote className="h-4 w-4 text-amber-700" />
                            Efectivo
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-amber-50 cursor-pointer">
                        <RadioGroupItem value="transferencia" id="transferencia" />
                        <Label htmlFor="transferencia" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-4 w-4 text-amber-700" />
                            Transferencia
                        </Label>
                    </div>
                </RadioGroup>

                {paymentMethod === "efectivo" && (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="received">Monto Recibido</Label>
                            <Input
                                id="received"
                                type="currency"
                                value={receivedAmount}
                                onChange={(e) => setReceivedAmount(e.target.value)}
                                className="mt-1"
                                placeholder="Ingrese el monto recibido"
                            />
                        </div>
                        <div className="flex justify-between items-center bg-amber-50 p-3 rounded-lg">
                            <span className="text-amber-800">Cambio:</span>
                            <span className="text-lg font-semibold text-amber-800">
                                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(Math.max(0, change))}
                            </span>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">

                <Button
                    className="flex grap-2 w-full bg-[#db8935] hover:bg-[#966637] text-black rounded-2xl"
                    onClick={handleCompleteSale}
                    disabled={
                        paymentMethod === "efectivo" &&
                        (Number(receivedAmount) < total || !receivedAmount)
                    }
                >
                    <CircleDollarSign />
                    Completar Venta
                </Button>

                <AlertDialog>

                    <AlertDialogTrigger asChild>
                        <Button className="flex grap-2 w-full bg-[#dbdbdb] hover:bg-[#f1f1f1] text-black rounded-2xl border-[1px]">
                            <ChevronLeft />
                            Cancelar Venta
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                Confirmar Cancelación
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                ¿Estás seguro que deseas cancelar esta venta? Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Volver</AlertDialogCancel>
                            <AlertDialogAction onClick={handleCancelSale} className="bg-red-500 hover:bg-red-500">
                                Sí, cancelar venta
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardFooter>
        </Card>
    );
}