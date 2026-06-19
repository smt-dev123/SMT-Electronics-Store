<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";
import { UserSchema } from "~/utils/schemas";
import { ElMessage } from "element-plus";

const { createMutation } = useUsers();

const dialogVisible = ref(false);

const form = reactive({
  username: "",
  email: "",
  phone: "",
  password: "",
  role: "USER",
  profile: "",
});

const handleClose = () => {
  form.username = "";
  form.email = "";
  form.phone = "";
  form.password = "";
  form.role = "USER";
  form.profile = "";
};

const onSubmit = async (values: any) => {
  try {
    await createMutation.mutateAsync(values);
    dialogVisible.value = false;
    handleClose();
  } catch (error: any) {
    ElMessage.error(error.message || "មានបញ្ហា");
  }
};
</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">
    <el-icon class="mr-1"><Plus /></el-icon> បង្កើតអ្នកប្រើប្រាស់
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="បង្កើតអ្នកប្រើប្រាស់"
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

        <el-form-item label="ពាក្យសម្ងាត់" :error="errors.password" required>
          <VField name="password" v-model="form.password">
            <el-input v-model="form.password" type="password" show-password placeholder="បញ្ចូលពាក្យសម្ងាត់..." />
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
          :loading="createMutation.isPending.value"
        >
          រក្សាទុក
        </el-button>
      </div>
    </VForm>
  </el-dialog>
</template>
