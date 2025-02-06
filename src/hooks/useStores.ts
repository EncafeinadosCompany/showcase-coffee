import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loadStores, addNewStore, deleteStoreById } from "../features/companies/stores/storeSlice";

export const useStores = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state: RootState) => state.stores);

  useEffect(() => {
    dispatch(loadStores());
  }, [dispatch]);

  const addStore = (store: Omit<Store, "id" | "created_at" | "updated_at">) => {
    dispatch(addNewStore(store));
  };

  const deleteStore = (id: number) => {
    dispatch(deleteStoreById(id));
  };

  return { stores, loading, error, addStore, deleteStore };
};