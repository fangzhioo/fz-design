<template>
  <fz-badge :value="1" class="item" type="primary">
    <fz-button>primary</fz-button>
  </fz-badge>
  <fz-badge :value="12" class="item" type="info">
    <fz-button>info</fz-button>
  </fz-badge>
  <fz-badge :value="3" class="item" type="success">
    <fz-button>success</fz-button>
  </fz-badge>
  <fz-badge :value="2" class="item" type="warning">
    <fz-button>warning</fz-button>
  </fz-badge>
  <fz-badge :value="200" class="item" type="error">
    <fz-button>error</fz-button>
  </fz-badge>
</template>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
