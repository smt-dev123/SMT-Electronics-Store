import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { BrandType } from "~/types";
import { ElMessage, ElMessageBox } from "element-plus";

export const useBrands = () => {
  const { $api } = useNuxtApp();
  const ENDPOINT = "/brands";
  const queryClient = useQueryClient();
  interface BrandTypeResponse {
    data?: BrandType[];
    total?: number;
    total_pages?: number;
  }

  // --- READ ---
  const fetchBrands = async (): Promise<BrandType[]> => {
    const res = await $api.get<BrandTypeResponse>(ENDPOINT);
    return res.data?.data || [];
  };

  const getBrandById = async (id: number | string) => {
    const res = await $api.get<BrandTypeResponse>(`${ENDPOINT}/${id}`);
    return res.data?.data || null;
  };

  // --- CREATE ---
  const createMutation = useMutation({
    mutationFn: (newBrand: Partial<BrandType>) => $api.post(ENDPOINT, newBrand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      ElMessage.success("បង្កើតបានជោគជ័យ");
    },
    onError: (error: any) => {
      ElMessage.error(error.response?.data?.message || "មានបញ្ហាក្នុងការបង្កើត");
    },
  });

  // --- UPDATE ---
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BrandType> }) =>
      $api.put(`${ENDPOINT}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      ElMessage.success("កែប្រែបានជោគជ័យ");
    },
    onError: (error: any) => {
      ElMessage.error(error.response?.data?.message || "មានបញ្ហាក្នុងការកែប្រែ");
    },
  });

  // --- DELETE ---
  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => $api.delete(`${ENDPOINT}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
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
        'តើអ្នកប្រាកដថាចង់លុបម៉ាកយីហោនេះមែនទេ?',
        'ការព្រមាន',
        {
          confirmButtonText: 'លុប',
          cancelButtonText: 'បោះបង់',
          type: 'warning',
        }
      );
      await deleteMutation.mutateAsync(id);
    } catch(error: any) {
      ElMessage.error(error);
    }
  };

  return {
    fetchBrands,
    getBrandById,
    createMutation,
    updateMutation,
    deleteMutation,
    confirmDelete
  };
};