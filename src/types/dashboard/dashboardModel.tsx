export interface TotalLidations {
    totalLiquidation: number
}
export interface TotalDeposit {
    totalDeposits: number
}
export interface Earnings {
    earnings: number
}
export interface FinancialSummaryProps {
    data: {
        totalBrands: number;
        totalSalesMonth: number;
        totalSalesYear: number;
        salesCountMonth: number;
        salesCountYear: number;
    };
    isLoading: boolean;
}
export interface MainMetricCardProps {
    label: string;
    amount: number;
    color: string;
    icon: JSX.Element;
    isLoading: boolean;
    trend?: string;
    isPositive?: boolean;
}
export interface ProductData {
    total: string;
    id_variant_products: number;
    variantProduct: {
        grammage: string;
        product: {
            name: string;
            image_url: string;
        }
    }
}

export interface TopProductsChartProps {
    topProducts: ProductData[] | null;
    isLoading: boolean;
}