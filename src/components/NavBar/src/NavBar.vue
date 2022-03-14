<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { withDefaults, defineProps } from 'vue';
  import { NavBar as VantNavBar } from 'vant';

  interface Props{
    title?: string
  }
  const props = withDefaults(defineProps<Props>(),{
    title: ''
  })
  // const emit = defineEmits<{
  //   (e: 'onClickLeft', obj: any): void
  // }>()

  const router = useRouter();
  const onClickLeft = () => {
    router.go(-1);
  }

</script>

<template>
  <VantNavBar
    :title="props.title"
    left-arrow
    @click-left="onClickLeft"
    safe-area-inset-top
  />
</template>

<style lang="less" scoped>
  :deep(.van-nav-bar) {
    .van-icon {
      color: #000000;
    }
    .van-nav-bar__title {
      color: #000000;
    }
  }
</style>
