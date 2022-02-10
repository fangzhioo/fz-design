<template>
  <div>
    <fz-card :body-style="{ padding: '0px' }" class="my-card" shadow="hover">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" />
      <div style="padding: 14px">
        <span>Yummy hamburger</span>
        <div class="bottom">
          <time class="time">{{ currentDate }}</time>
          <fz-button type="text" class="button">Operating</fz-button>
        </div>
      </div>
    </fz-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentDate = ref(new Date().toLocaleDateString());
</script>

<style scoped>
.my-card {
  width: 280px;
}
.time {
  font-size: 13px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
