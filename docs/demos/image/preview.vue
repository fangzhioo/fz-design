<script lang="ts" setup>
  const url = 'https://pic2.zhimg.com/80/v2-fc5251c9a88b62bd7d2de6dd0706bce1_1440w.webp'
  const srcList = [
    'https://pic2.zhimg.com/80/v2-fc5251c9a88b62bd7d2de6dd0706bce1_1440w.webp',
    'https://pic3.zhimg.com/80/v2-cea87b3d83d24e0dd550f57446b4bc06_1440w.webp',
    'https://pic2.zhimg.com/80/v2-e30dce18f800f8836a0a17a9057084ad_1440w.webp',
    'https://pic4.zhimg.com/80/v2-1b3d0de324b13c2161760036c5641e33_1440w.webp',
    'https://pic3.zhimg.com/80/v2-79500087812de7ae188a44a3b6097ed2_1440w.webp',
    'https://pic3.zhimg.com/80/v2-45feb9cc46c8bb8bb52cd6ec3f89c0f2_1440w.webp',
    'https://pic1.zhimg.com/80/v2-1f6a2bf7b07cb09c272570b8b3b0c228_1440w.webp',
    'https://pic2.zhimg.com/80/v2-578aa5b2d99e1ba42e075ad50a3560d1_1440w.webp',
    'https://pic4.zhimg.com/80/v2-3d3a557a8d1c41dc7353255073b94ecb_1440w.webp'
  ]
</script>

<template>
  <div class="demo-image__preview">
    <fz-image
      style="width: 100px; height: 100px"
      :src="url"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="srcList"
      :initial-index="4"
      fit="cover"
    />
  </div>
</template>

<style scoped>
  .demo-image__error .image-slot {
    font-size: 30px;
  }
  .demo-image__error .image-slot .fz-icon {
    font-size: 30px;
  }
  .demo-image__error .fz-image {
    width: 100%;
    height: 200px;
  }
</style>
