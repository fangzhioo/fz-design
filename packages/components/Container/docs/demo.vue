<template>
  <div>
    <fz-container class="my-container">
      <fz-aside class="my-aside" width="200px">Aside</fz-aside>
      <fz-container>
        <fz-header class="my-header">Header</fz-header>
        <fz-main class="my-main">Main</fz-main>
        <fz-footer class="my-footer">Footer</fz-footer>
      </fz-container>
    </fz-container>
  </div>
</template>

<style scoped>
.my-aside {
  background-color: #d3dce6;
  color: #66ccff;
  text-align: center;
  line-height: 200px;
}
.my-header,
.my-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.my-main {
  background-color: #e9eef3;
  color: #ec2e28;
  text-align: center;
  line-height: 160px;
}
</style>
