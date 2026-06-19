import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { TypeElectronicType } from "~/types";
import { ElMessage, ElMessageBox } from "element-plus";

export const useElectronicTypes = () => {
  const { $api } = useNuxtApp();
  const ENDPOINT = "/types";
  const queryClient = useQueryClient();

  interface TypeElectronicTypeResponse {
    data?: TypeElectronicType[];
  }

  // --- READ ---
  const fetchData = async (): Promise<TypeElectronicType[]> => {
    const res = await $api.get<TypeElectronicTypeResponse>(ENDPOINT);
    return res.data?.data || [];
  };

  const getDataById = async (id: number | string) => {
    const res = await $api.get<TypeElectronicTypeResponse>(`${ENDPOINT}/${id}`);
    return res.data?.data || null;
  };

  // --- CREATE ---
  const createMutation = useMutation({
    mutationFn: (newBrand: Partial<TypeElectronicType>) =>
      $api.post(ENDPOINT, newBrand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electronic_types"] });
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
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<TypeElectronicType>;
    }) => $api.put(`${ENDPOINT}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electronic_types"] });
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
      queryClient.invalidateQueries({ queryKey: ["electronic_types"] });
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
