import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { ProductType } from "~/types";
import { ElMessage, ElMessageBox } from "element-plus";

export const useProducts = () => {
  const { $api } = useNuxtApp();
  const ENDPOINT = "/products";
  const queryClient = useQueryClient();

  interface PaginatedResponse<T> {
    data: T[];
    meta: {
      total: number;
      page: number;
      lastPage: number;
      limit: number;
    };
  }
  // --- READ ---
  const fetchData = async (page: number = 1, search: string = "") => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const res = await $api.get<PaginatedResponse<ProductType>>(ENDPOINT, {
      params: {
        skip,
        limit,
        search: search || undefined,
      },
    });
    return res.data;
  };

  const getDataById = async (id: number | string) => {
    const res = await $api.get<ProductType>(`${ENDPOINT}/${id}`);
    return res.data;
  };

  // --- CREATE ---
  const createMutation = useMutation({
    mutationFn: (newData: Partial<ProductType>) => $api.post(ENDPOINT, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
    mutationFn: ({ slug, data }: { slug: string; data: Partial<ProductType> }) =>
      $api.put(`${ENDPOINT}/${slug}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
    mutationFn: (slug: string) => $api.delete(`${ENDPOINT}/${slug}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ElMessage.success("លុបបានជោគជ័យ");
    },
    onError: (error: any) => {
      ElMessage.error(error.response?.data?.message || "មិនអាចលុបបានទេ");
    },
  });

  // Confirmation Dialog
  const confirmDelete = async (slug: string) => {
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
      await deleteMutation.mutateAsync(slug);
    } catch (error: any) {
      if (error !== 'cancel') {
        ElMessage.error(error);
      }
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
