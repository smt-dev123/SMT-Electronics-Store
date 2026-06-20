import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { CategoryType } from "~/types";
import { ElMessage, ElMessageBox } from "element-plus";

export const useCategories = () => {
  const { $api } = useNuxtApp();
  const ENDPOINT = "/categories";
  const queryClient = useQueryClient();

  // --- READ ---
  const fetchData = async (): Promise<CategoryType[]> => {
    const res = await $api.get<CategoryType[]>(ENDPOINT);
    return res.data || [];
  };

  const getDataById = async (id: number | string) => {
    const res = await $api.get<CategoryType>(`${ENDPOINT}/${id}`);
    return res.data || null;
  };

  // --- CREATE ---
  const createMutation = useMutation({
    mutationFn: (newBrand: Partial<CategoryType>) =>
      $api.post(ENDPOINT, newBrand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      ElMessage.success("បង្កើតបានជោគជ័យ");
    },
    onError: (error: any) => {
      ElMessage.error(
        error.response?.data?.message || "មានបញ្ហាក្នុងការបង្កើត",
      );
    },
  });

  // --- UPDATE ---
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryType> }) =>
      $api.put(`${ENDPOINT}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      ElMessage.success("កែប្រែបានជោគជ័យ");
    },
    onError: (error: any) => {
      ElMessage.error(
        error.response?.data?.message || "មានបញ្ហាក្នុងការកែប្រែ",
      );
    },
  });

  // --- DELETE ---
  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => $api.delete(`${ENDPOINT}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      ElMessage.success("លុបបានជោគជ័យ");
    },
    onError: (error: any) => {
      ElMessage.error(error.response?.data?.message || "មិនអាចលុបបានទេ");
    },
  });

  // Confirmation Dialog
  const confirmDelete = async (id: number | string) => {
    try {
      await ElMessageBox.confirm(
        "តើអ្នកប្រាកដថាចង់លុបម៉ាកយីហោនេះមែនទេ?",
        "ការព្រមាន",
        {
          confirmButtonText: "លុប",
          cancelButtonText: "បោះបង់",
          type: "warning",
        },
      );
      await deleteMutation.mutateAsync(id);
    } catch (error: any) {
      ElMessage.error(error);
    }
  };

  return {
    fetchData,
    getDataById,
    createMutation,
    updateMutation,
    deleteMutation,
    confirmDelete,
  };
};
