<script lang="ts" setup>
  const formatter1 = (num: number): string => num.toString()

  const textCn = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const formatter2 = (num: number): string => {
    const str = num.toString();
    return str.split('').map(i => textCn[i]).join('');
  }
</script>

<template>
  <div>
    <fz-space>
      <fz-text type="info">格式化为字符串</fz-text>
      <fz-number-animate :formatter="formatter1" loop :from="0" :to="15000" />
    </fz-space>
  </div>
  <div class="mt-4">
    <fz-space>
      <fz-text type="info">格式化为中文</fz-text>
      <fz-number-animate :formatter="formatter2" loop :from="100" :to="9999" />
    </fz-space>
  </div>
</template>

<style scoped>
  .mt-4 {
    margin-top: 16px;
  }
</style>
