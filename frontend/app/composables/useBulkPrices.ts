import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { BulkPriceType } from "~/types";
import { ElMessage, ElMessageBox } from "element-plus";

export const useBulkPrices = () => {
  const { $api } = useNuxtApp();
  const ENDPOINT = "/bulk-prices";
  const queryClient = useQueryClient();

  // --- READ ---
  const fetchData = async () => {
    const res = await $api.get<BulkPriceType[]>(ENDPOINT);
    return res.data;
  };

  const getDataById = async (id: number | string) => {
    const res = await $api.get<BulkPriceType>(`${ENDPOINT}/${id}`);
    return res.data;
  };

  // --- CREATE ---
  const createMutation = useMutation({
    mutationFn: (newData: Partial<BulkPriceType>) =>
      $api.post(ENDPOINT, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulk-prices"] });
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
    mutationFn: ({ id, data }: { id: string; data: Partial<BulkPriceType> }) =>
      $api.put(`${ENDPOINT}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulk-prices"] });
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
      queryClient.invalidateQueries({ queryKey: ["bulk-prices"] });
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
        "តើអ្នកប្រាកដថាចង់លុបទិន្នន័យនេះមែនទេ?",
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
