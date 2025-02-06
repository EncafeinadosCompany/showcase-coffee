import { getEmployees, getIdEmployee, createEmployee } from "./employeeService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Employee } from "@/types/users/employee";

interface EmployeeState {
    employees: Employee[];
    isLoading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    isLoading: false,
    error: null,
};

export const fetchEmployees = createAsyncThunk("employees/fetchAll", async (_, { rejectWithValue }) => {
    try {
        return await getEmployees();
    } catch (error: unknown) {
        return rejectWithValue(error instanceof Error ? error.message : "Error al obtener los empleados");
    }
});

export const fetchEmployeeById = createAsyncThunk("employees/fetchById", async (id: string, { rejectWithValue }) => {
    try {
        return await getIdEmployee(id);
    } catch (error: unknown) {
        return rejectWithValue(error instanceof Error ? error.message : "Error al obtener el empleado por ID");
    }
});

export const addEmployee = createAsyncThunk("employees/add", async (employee: Omit<Employee, "id">, { rejectWithValue }) => {
    try {
        return await createEmployee(employee);
    } catch (error: unknown) {
        return rejectWithValue(error instanceof Error ? error.message : "Error al agregar el empleado");
    }
});

const EmployeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchEmployeeById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employees = [action.payload];
            })
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(addEmployee.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employees.push(action.payload);
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default EmployeeSlice.reducer;