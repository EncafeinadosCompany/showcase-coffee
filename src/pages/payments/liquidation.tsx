import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';

type LiquidationType = {
    id: number;
    id_shopping: number;
    current_debt: number;
    status: boolean;
    created_at: string;
};

const Liquidation = () => {
    const [liquidations, setLiquidations] = useState<LiquidationType[]>([]);
    const [newLiquidation, setNewLiquidation] = useState({
        id_shopping: '',
        current_debt: '',
        status: 'enviada'
    });

    const fetchLiquidations = async () => {
        try {
            const response = await fetch('/api/liquidations');
            const data = await response.json();
            setLiquidations(data);
        } catch (error) {
            console.error('Error fetching liquidations:', error);
        }
    };

    const handleCreateLiquidation = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/liquidations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLiquidation),
            });
            if (response.ok) {
                fetchLiquidations();
                setNewLiquidation({
                    id_shopping: '',
                    current_debt: '',
                    status: 'enviada'
                });
            }
        } catch (error) {
            console.error('Error creating liquidation:', error);
        }
    };

    const handlePayment = async (id: number) => {
        try {
            // Aquí irá la lógica para procesar el pago
            console.log('Procesando pago para la liquidación:', id);
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    useEffect(() => {
        fetchLiquidations();
    }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto ">
            <h1 className="text-2xl font-semibold mb-8">Liquidaciones</h1>
            
            <div className="grid grid-cols-2 gap-8">
                {/* Formulario de creación */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium mb-6">Crear liquidación</h2>
                    <form onSubmit={handleCreateLiquidation} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="id_liquidacion">Id de liquidación</Label>
                            <Input
                                id="id_liquidacion"
                                type="text"
                                disabled
                                placeholder="Autogenerado"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="id_compra">Id de compra</Label>
                            <Input
                                id="id_compra"
                                type="text"
                                value={newLiquidation.id_shopping}
                                onChange={(e) => setNewLiquidation({
                                    ...newLiquidation,
                                    id_shopping: e.target.value
                                })}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="deuda_actual">Deuda actual</Label>
                            <Input
                                id="deuda_actual"
                                type="number"
                                value={newLiquidation.current_debt}
                                onChange={(e) => setNewLiquidation({
                                    ...newLiquidation,
                                    current_debt: e.target.value
                                })}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Estado</Label>
                            <RadioGroup
                              value={newLiquidation.status}
                              onValueChange={(value: string) => setNewLiquidation({
                                ...newLiquidation,
                                status: value
                              })}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="enviada" id="enviada" />
                                <Label htmlFor="enviada">Enviada</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pendiente" id="pendiente" />
                                <Label htmlFor="pendiente">Pendiente</Label>
                              </div>
                            </RadioGroup>
                        </div>

                        <Button 
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        >
                            Crear liquidación
                        </Button>
                    </form>
                </div>

                {/* Lista de liquidaciones */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium mb-6">Liquidaciones</h2>
                    <div className="border rounded-lg">
                        <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-50">
                            <div className="font-medium">Id de liquidación</div>
                            <div className="font-medium">Id de compra</div>
                            <div className="font-medium">Deuda actual</div>
                            <div className="font-medium">Acciones</div>
                        </div>
                        <div className="divide-y">
                            {liquidations.map((liquidation) => (
                                <div 
                                    key={liquidation.id} 
                                    className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 items-center"
                                >
                                    <div>#{liquidation.id}</div>
                                    <div>#{liquidation.id_shopping}</div>
                                    <div>${liquidation.current_debt}</div>
                                    <div>
                                        <Button
                                            onClick={() => handlePayment(liquidation.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            size="sm"
                                        >
                                            <DollarSign className="h-4 w-4 mr-1" />
                                            Pagar
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Liquidation;