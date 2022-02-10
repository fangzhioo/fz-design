<template>
  <div>
    <fz-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <fz-button class="button" type="text">Operation button</fz-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </fz-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
