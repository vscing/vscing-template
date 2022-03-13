<script setup lang="ts">
  import type { CSSProperties } from 'vue';
  import { computed, withDefaults, defineProps } from 'vue';

  interface Props{
    prefix?: string,
    color?: string,
    name: string,
    size?: number | string,
    spin?: boolean
  }
  const props = withDefaults(defineProps<Props>(),{
    prefix: 'icon',
    color: '',
    size: 16,
    spin: false
  })
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);

  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    let s = `${size}`;
    s = `${s.replace('px', '')}px`;
    return {
      width: s,
      height: s,
    };
  });

</script>

<template>
  <svg
    :class="[$attrs.class, spin && 'svg-icon-spin']"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style lang="less" scoped>
  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
