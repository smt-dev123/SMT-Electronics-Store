<script lang="ts" setup>
import { Form as VForm, Field as VField } from "vee-validate";
import { BrandSchema } from "~/utils/schemas";

const { updateMutation } = useBrands();
const dialogVisible = ref(false);

const props = defineProps<{
  data: {
    id: string;
    name: string;
  };
}>();

const form = reactive({
  name: "",
});

watch(
  () => dialogVisible.value,
  (val) => {
    if (val) {
      form.name = props.data.name;
    }
  },
);

const onSubmit = async (values: any) => {
  try {
    await updateMutation.mutateAsync({
      id: props.data.id,
      data: values,
    });
    dialogVisible.value = false;
  } catch (error: any) {
    ElMessage.error(error);
  }
};
</script>

<template>
  <el-button type="success" size="small" @click="dialogVisible = true"
    >កែប្រែ
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="កែប្រែប្រភេទគ្រឿង"
    width="500px"
    append-to-body
  >
    <VForm
      :validation-schema="BrandSchema"
      :initial-values="form"
      @submit="onSubmit"
      v-slot="{ errors }"
    >
      <el-form label-position="top">
        <el-form-item label="ឈ្មោះប្រភេទគ្រឿង" :error="errors.name" required>
          <VField name="name" v-model="form.name">
            <el-input v-model="form.name" placeholder="បញ្ចូលឈ្មោះ..." />
          </VField>
        </el-form-item>
      </el-form>

      <div class="flex justify-end mt-4">
        <el-button @click="dialogVisible = false">បោះបង់</el-button>
        <el-button
          type="primary"
          native-type="submit"
          :loading="updateMutation.isPending.value"
        >
          រក្សាទុកការកែប្រែ
        </el-button>
      </div>
    </VForm>
  </el-dialog>
</template>
