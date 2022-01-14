<template>
  <div>
    <fz-badge :value="2" class="item" type="success">
      <fz-icon name="notification" style="font-size: 22px" />
    </fz-badge>
    <fz-badge :value="12" class="item">
      <fz-button type="text">comments</fz-button>
    </fz-badge>
    <fz-badge :value="100" class="item" type="info">
      <fz-button type="text">replies</fz-button>
    </fz-badge>
    <fz-badge :value="1" class="item" type="primary">
      <fz-button>comments</fz-button>
    </fz-badge>
    <fz-badge :value="2" class="item" type="warning">
      <fz-button>replies</fz-button>
    </fz-badge>
  </div>
</template>

<style lang="less" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
