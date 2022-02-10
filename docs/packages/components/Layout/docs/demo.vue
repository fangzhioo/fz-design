<template>
  <div class="layout-demo-container">
    <fz-row :gutter="10">
      <fz-col :span="24"><div class="grid-content bg-purple-dark"></div></fz-col>
    </fz-row>
    <fz-row :gutter="10">
      <fz-col :span="12"><div class="grid-content bg-purple"></div></fz-col>
      <fz-col :span="12"><div class="grid-content bg-purple-light"></div></fz-col>
    </fz-row>
    <fz-row :gutter="10">
      <fz-col :span="8"><div class="grid-content bg-purple"></div></fz-col>
      <fz-col :span="8"><div class="grid-content bg-purple-light"></div></fz-col>
      <fz-col :span="8"><div class="grid-content bg-purple"></div></fz-col>
    </fz-row>
    <fz-row :gutter="10">
      <fz-col :span="6"><div class="grid-content bg-purple"></div></fz-col>
      <fz-col :span="6"><div class="grid-content bg-purple-light"></div></fz-col>
      <fz-col :span="6"><div class="grid-content bg-purple"></div></fz-col>
      <fz-col :span="6"><div class="grid-content bg-purple-light"></div></fz-col>
    </fz-row>
    <fz-row :gutter="10">
      <fz-col :span="4"><div class="grid-content bg-purple"></div></fz-col>
      <fz-col :span="4"><div class="grid-content bg-purple-light"></div></fz-col>
      <fz-col :span="4"><div class="grid-content bg-purple"></div></fz-col>
      <fz-col :span="4"><div class="grid-content bg-purple-light"></div></fz-col>
      <fz-col :span="4"><div class="grid-content bg-purple"></div></fz-col>
      <fz-col :span="4"><div class="grid-content bg-purple-light"></div></fz-col>
    </fz-row>
  </div>
</template>

<style lang="less">
.layout-demo-container {
  .fz-row {
    margin-bottom: 20px;
  }
  .fz-row:last-child {
    margin-bottom: 0;
  }
  .fz-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
