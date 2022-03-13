<template>
  <RouterView />
</template>

<script lang="ts" setup>
  import '@/assets/style/main.less';
  import { useTitle } from '@/hooks/web/useTitle';

  import 'dayjs/locale/zh-cn';

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
