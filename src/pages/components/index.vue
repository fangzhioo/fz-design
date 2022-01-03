<template>
  <fz-container class="my-fzui-doc">
    <fz-aside width="200px" class="my-doc-aside">
      <div class="link-item" v-for="(link, index) in data.links" :key="index">
        <router-link :to="link.path">{{ link.name }}</router-link>
      </div>
    </fz-aside>
    <fz-main>
      <router-view></router-view>
    </fz-main>
  </fz-container>
</template>

<script setup>
import ComponentList from 'packages/list.json';
import { reactive } from 'vue';

const data = reactive({
  links: ComponentList.map((item) => ({
    path: `/components/${item.compName}`,
    name: item.compZhName,
  })),
});
</script>

<style lang="less" scoped>
.my-doc-aside {
  border-right: var(--fz-border-base);
}
.link-item {
  padding: 6px 10px;
}
</style>
