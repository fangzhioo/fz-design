<template>
  <div>
    <fz-carousel :interval="5000" arrow="always">
      <fz-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </fz-carousel-item>
    </fz-carousel>
  </div>
</template>

<style scoped>
.fz-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.fz-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.fz-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
