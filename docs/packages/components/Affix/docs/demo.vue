<template>
  <div>
    <fz-affix :offset="120">
      <fz-button type="primary" @scroll="handleScroll">Offset top 120px</fz-button>
    </fz-affix>
  </div>
</template>

<script setup>
const handleScroll = ({ scrollTop, fixed }) => {
  console.log('scrollTop', scrollTop, 'fixed', fixed);
};
</script>
