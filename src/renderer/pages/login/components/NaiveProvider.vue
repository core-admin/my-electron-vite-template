<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <slot></slot>
          <naive-provider-content />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui';

  defineOptions({
    name: 'NaiveProvider',
  });

  const route = useRoute();
  const router = useRouter();

  // 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
  function registerNaiveTools() {
    window.$loadingBar = useLoadingBar();
    window.$dialog = useDialog();
    window.$message = useMessage();
    window.$notification = useNotification();
  }

  function registerRouterTools() {
    window.$route = route;
    window.$router = router;
  }

  const NaiveProviderContent = defineComponent({
    name: 'NaiveProviderContent',
    setup() {
      registerNaiveTools();
      registerRouterTools();
    },
    render() {
      return null;
    },
  });
</script>
