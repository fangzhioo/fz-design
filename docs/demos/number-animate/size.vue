<template>
  <fz-number-animate size="small" :from="0" :to="15000" />
  <fz-number-animate :from="100" :to="9999" />
  <fz-number-animate size="large" :from="100" :to="9999" />
</template>

<style scoped>
  .fz-number-animate {
    margin-bottom: 10px;
  }
</style>
