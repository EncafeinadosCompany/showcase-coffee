import { axiosInstance } from "../../../API/axiosInstance";
import { Employee } from "@/types/users/employee";

export const getEmployees = async () => {
    const response = await axiosInstance.get("/users/employees");
    return response.data;
};

export const getIdEmployee = async (id: string) => {
    const response = await axiosInstance.get(`/users/employees/${id}`);
    return response.data;
};

export const createEmployee = async (employee: Omit<Employee, "id">) => {
    const response = await axiosInstance.post("/users/employees", employee);
    return response.data;
};

export const getIdEmployeeProvider = async (id: string) => {
    const response = await axiosInstance.get(`/users/employees/provider/${id}`);
    return response.data;
}