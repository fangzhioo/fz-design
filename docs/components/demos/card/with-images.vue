<script lang="ts" setup>
import { ref } from 'vue'

const currentDate = ref(new Date().toLocaleString())
</script>

<template>
  <fz-row>
    <fz-col
      v-for="(o, index) in 2"
      :key="o"
      :span="8"
      :offset="index > 0 ? 2 : 0"
    >
      <fz-card :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px">
          <span>香辣鸡腿堡</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <fz-button text class="button">购买</fz-button>
          </div>
        </div>
      </fz-card>
    </fz-col>
  </fz-row>
</template>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
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
