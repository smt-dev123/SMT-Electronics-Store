<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";

const { createMutation } = useElectronicTypes();

const dialogVisible = ref(false);

const form = reactive({
  name: "",
});

const handleClose = () => {
  form.name = "";
};

const onSubmit = async (values: any) => {
  try {
    await createMutation.mutateAsync(values);
    dialogVisible.value = false;
    handleClose();
  } catch (error: any) {
    ElMessage.error(error);
  }
};
</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">
    <el-icon class="mr-1"><Plus /></el-icon> បង្កើតប្រភេទគ្រឿង
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="បង្កើតប្រភេទគ្រឿង"
    width="500px"
    @close="handleClose"
  >
    <VForm
      :validation-schema="BrandSchema"
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
          :loading="createMutation.isPending.value"
        >
          រក្សាទុក
        </el-button>
      </div>
    </VForm>
  </el-dialog>
</template>
