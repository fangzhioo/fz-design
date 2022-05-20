<template>
  <div>
    <fz-rich-editor v-model="content" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const beforeInsert = () => {
  return new Promise((resolve) => {
    console.log('图片上传！！！');

    setTimeout(() => {
      console.log('图片上传成功！！！');

      resolve({
        src: 'https://source.unsplash.com/8xznAGy4HcY/800x400',
        alt: '加载失败',
        title: '这是一张图片',
      });
    }, 1000);
  });
};

const options = {
  image: {
    beforeInsert,
  },
};

const content = ref(`
        <h2>
          Image
        </h2>
        <p>
          This is a basic example of implementing images. Drag to re-order.
        </p>
        <p>
          <img src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt title="This is a cat!!" />
        </p>
`);
</script>
