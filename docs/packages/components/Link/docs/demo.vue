<template>
  <div>
    <div>
      <fz-link href="https://fangzhioo.github.io/fz-ui" target="_blank">default</fz-link>
      <fz-link type="primary">primary</fz-link>
      <fz-link type="success">success</fz-link>
      <fz-link type="warning">warning</fz-link>
      <fz-link type="danger">danger</fz-link>
      <fz-link type="info">info</fz-link>
    </div>

    <div>
      <fz-link disabled>default</fz-link>
      <fz-link type="primary" disabled>primary</fz-link>
      <fz-link type="success" disabled>success</fz-link>
      <fz-link type="warning" disabled>warning</fz-link>
      <fz-link type="danger" disabled>danger</fz-link>
      <fz-link type="info" disabled>info</fz-link>
    </div>
  </div>
</template>
<style scoped>
.fz-link {
  margin-right: 8px;
}
.fz-link .fz-icon--right.fz-icon {
  vertical-align: text-bottom;
}
</style>
