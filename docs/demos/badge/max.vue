<template>
  <fz-badge :value="200" :max="99" class="item">
    <fz-button>comments</fz-button>
  </fz-badge>
  <fz-badge :value="100" :max="10" class="item">
    <fz-button>replies</fz-button>
  </fz-badge>
</template>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
