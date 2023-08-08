<template>
  <div class="p-5">
    <n-input-group>
      <n-input-group-label>向数据库插入一条数据</n-input-group-label>
      <n-input v-model:value="text" />
      <n-button type="primary" @click="handleSave">保存</n-button>
    </n-input-group>

    <n-card class="mt-5">
      <n-data-table :columns="columns" :data="tableDataSource" :bordered="false" />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { type DataTableColumns } from 'naive-ui';

  defineOptions({
    name: 'Layout',
  });

  const text = ref('');
  const columns: DataTableColumns<{ id: number; text: string }> = [
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: '文本内容',
      key: 'text',
    },
  ];

  const tableDataSource = ref<{ id: number; text: string }[]>([]);

  function handleSave() {
    window.ipc
      .invoke<{ text: string; id: number }[]>('create-message', { text: text.value })
      .then(res => {
        window.$message.success('保存成功');
        tableDataSource.value = res;
      })
      .catch(error => {
        console.error(error);
        window.$message.error('保存出错了');
      })
      .finally(() => {
        text.value = '';
      });
  }

  async function getData() {
    const res = await window.ipc.invoke<{ id: number; text: string }[]>('find-message');
    console.log(res);
    tableDataSource.value = res;
  }

  getData();
</script>
