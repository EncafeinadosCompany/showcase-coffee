import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { parse, isAfter, isBefore, isEqual } from "date-fns";
import { Sale } from "@/types/transactions/saleModel";
import { Search, Calendar, CreditCard, X } from "lucide-react";

interface SalesFiltersProps {
    sales: Sale[];
    onFilterChange: (filteredSales: Sale[]) => void;
}

export const SalesFilters = ({ sales, onFilterChange }: SalesFiltersProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("all");

    const [hasDateFilter, setHasDateFilter] = useState(false);
    const [hasPaymentFilter, setHasPaymentFilter] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const uniquePaymentMethods = Array.from(new Set(sales.map((sale) => sale.type_payment)));

    useEffect(() => {
        let result = [...sales];

        if (searchTerm) {
            result = result.filter((sale) =>
                String(sale.id).includes(searchTerm) ||
                sale.type_payment.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (paymentMethod !== "all") {
            result = result.filter(
                (sale) => sale.type_payment.toLowerCase() === paymentMethod.toLowerCase()
            );
            setHasPaymentFilter(true);
        } else {
            setHasPaymentFilter(false);
        }

        if (startDate || endDate) {
            setHasDateFilter(true);

            if (startDate) {
                const startDateObj = parse(startDate, "yyyy-MM-dd", new Date());
                result = result.filter((sale) => {
                    const saleDate = new Date(sale.date);
                    return isAfter(saleDate, startDateObj) || isEqual(saleDate, startDateObj);
                });
            }

            if (endDate) {
                const endDateObj = parse(`${endDate}T23:59:59`, "yyyy-MM-dd'T'HH:mm:ss", new Date());
                result = result.filter((sale) => {
                    const saleDate = new Date(sale.date);
                    return isBefore(saleDate, endDateObj) || isEqual(saleDate, endDateObj);
                });
            }
        } else {
            setHasDateFilter(false);
        }

        onFilterChange(result);
    }, [sales, searchTerm, startDate, endDate, paymentMethod, onFilterChange]);

    const clearAllFilters = () => {
        setSearchTerm("");
        setStartDate("");
        setEndDate("");
        setPaymentMethod("all");
    };

    const clearDateFilter = () => {
        setStartDate("");
        setEndDate("");
        setHasDateFilter(false);
        setIsPopoverOpen(false); // Cierra el popover al limpiar los filtros
    };

    const clearPaymentFilter = () => {
        setPaymentMethod("all");
    };

    const applyFilters = () => {
        setIsPopoverOpen(false);
    };

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <div className="relative flex-1 max-w-md">
                <Input
                    className="rounded-full pl-10"
                    placeholder="Buscar venta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="search" size={18} />
                {searchTerm && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setSearchTerm("")}
                    >
                        <X size={16} />
                    </Button>
                )}
            </div>

            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={hasDateFilter ? "default" : "outline"}
                        className={`flex items-center gap-2 rounded-full ${hasDateFilter ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : ""}`}
                    >
                        <Calendar size={16} />
                        <span>{hasDateFilter ? "Filtro de fecha activo" : "Filtrar por fecha"}</span>
                        {hasDateFilter && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="ml-1 h-5 w-5 p-0"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearDateFilter();
                                }}
                            >
                                <X size={14} />
                            </Button>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 rounded-xl">
                    <div className="space-y-4 p-2">
                        <h4 className="font-medium">Rango de fechas</h4>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600">Fecha inicio</label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600">Fecha fin</label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button variant="outline" className="rounded-xl" size="sm" onClick={clearDateFilter}>
                                Limpiar
                            </Button>
                            <Button
                                size="sm"
                                className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
                                onClick={applyFilters} // Llama a la función que cierra el popover
                            >
                                Aplicar
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2">
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger
                        className={`rounded-full bg-white w-[200px] ${hasPaymentFilter ? "bg-amber-100 border-amber-300" : ""}`}
                    >
                        <div className="flex items-center gap-2">
                            <CreditCard size={16} />
                            <SelectValue placeholder="Método de pago" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tipos de Pago</SelectItem>
                        {uniquePaymentMethods.map((method) => (
                            <SelectItem key={method} value={method}>{method}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasPaymentFilter && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={clearPaymentFilter}
                    >
                        <X size={16} />
                    </Button>
                )}
            </div>

            {(searchTerm || hasDateFilter || hasPaymentFilter) && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="ml-auto text-gray-600 rounded-full"
                >
                    Limpiar todos los filtros
                </Button>
            )}
        </div>
    );
};