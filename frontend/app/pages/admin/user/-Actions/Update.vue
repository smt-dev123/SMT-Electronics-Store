<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";
import { UserSchema } from "~/utils/schemas";
import type { UserType } from "~/types";
import { ElMessage } from "element-plus";

const props = defineProps<{
  data: UserType;
}>();

const { updateMutation } = useUsers();
const dialogVisible = ref(false);

const form = reactive({
  username: "",
  email: "",
  phone: "",
  password: "",
  role: "USER",
  profile: "",
});

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      form.username = newData.username;
      form.email = newData.email;
      form.phone = newData.phone || "";
      form.password = newData.password; // Note: usually password is not passed back, or requires separate handling
      form.role = newData.role;
      form.profile = newData.profile || "";
    }
  },
  { immediate: true, deep: true }
);

const handleClose = () => {
  form.username = props.data.username;
  form.email = props.data.email;
  form.phone = props.data.phone || "";
  form.password = props.data.password;
  form.role = props.data.role;
  form.profile = props.data.profile || "";
};

const onSubmit = async (values: any) => {
  try {
    const payload = { ...values };
    if (!payload.password) delete payload.password; // if left blank during update, maybe don't update
    await updateMutation.mutateAsync({
      id: props.data.id!,
      data: payload,
    });
    dialogVisible.value = false;
  } catch (error: any) {
    ElMessage.error(error.message || "មានបញ្ហា");
  }
};
</script>

<template>
  <el-button
    type="primary"
    size="small"
    class="mr-2"
    @click="dialogVisible = true"
  >
    <el-icon><Edit /></el-icon>
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="កែប្រែអ្នកប្រើប្រាស់"
    width="500px"
    @close="handleClose"
  >
    <VForm
      :validation-schema="UserSchema"
      @submit="onSubmit"
      v-slot="{ errors }"
    >
      <el-form label-position="top">
        <el-form-item label="ឈ្មោះ" :error="errors.username" required>
          <VField name="username" v-model="form.username">
            <el-input v-model="form.username" placeholder="បញ្ចូលឈ្មោះ..." />
          </VField>
        </el-form-item>

        <el-form-item label="អ៊ីមែល" :error="errors.email" required>
          <VField name="email" v-model="form.email">
            <el-input v-model="form.email" placeholder="បញ្ចូលអ៊ីមែល..." type="email" />
          </VField>
        </el-form-item>

        <el-form-item label="លេខទូរស័ព្ទ" :error="errors.phone">
          <VField name="phone" v-model="form.phone">
            <el-input v-model="form.phone" placeholder="បញ្ចូលលេខទូរស័ព្ទ..." />
          </VField>
        </el-form-item>

        <el-form-item label="ពាក្យសម្ងាត់ថ្មី" :error="errors.password">
          <VField name="password" v-model="form.password">
            <el-input v-model="form.password" type="password" show-password placeholder="បញ្ចូលពាក្យសម្ងាត់បើចង់ប្តូរ..." />
          </VField>
        </el-form-item>

        <el-form-item label="តួនាទី (Role)" :error="errors.role" required>
          <VField name="role" v-model="form.role">
            <el-select v-model="form.role" class="w-full">
              <el-option label="USER" value="USER" />
              <el-option label="ADMIN" value="ADMIN" />
              <el-option label="CUSTOMER" value="CUSTOMER" />
              <el-option label="MANAGER" value="MANAGER" />
            </el-select>
          </VField>
        </el-form-item>
        
        <el-form-item label="ប្រវត្តិរូប (Profile URL)" :error="errors.profile">
          <VField name="profile" v-model="form.profile">
            <el-input v-model="form.profile" placeholder="បញ្ចូល URL ទីតាំងរូបភាព..." />
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
          រក្សាទុក
        </el-button>
      </div>
    </VForm>
  </el-dialog>
</template>
