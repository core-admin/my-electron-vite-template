<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    namespace="mount-body-el"
    inline-theme-disabled
  >
    <NaiveProvider>
      <Layout />
    </NaiveProvider>
  </n-config-provider>
</template>
<script setup lang="ts">
  import { dateZhCN, zhCN } from 'naive-ui';
  import NaiveProvider from './components/NaiveProvider.vue';
  import Layout from './components/Layout.vue';
</script>
