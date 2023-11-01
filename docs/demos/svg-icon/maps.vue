<script lang="ts" setup>
  import { FzMessage } from 'fz-design'
  import SvgIconList from '@fz-design/fz-design-icon'

  const handleClick = (icon: string): void => {
    navigator.clipboard.writeText(icon);
    FzMessage.success('复制成功: ' + icon);
  }
</script>

<template>
  <div class="icon-box">
    <div v-for="(key, i) of SvgIconList" :key="i" class="icon-list" @click="handleClick(i)">
      <fz-svg-icon :size="20">
        <component :is="key" />
      </fz-svg-icon>
      <span class="icon-name">{{ i }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .fz-svg-icon + .fz-svg-icon {
    margin-right: 10px;
  }

  .icon-box {
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));

    .icon-list {
      height: 90px;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      padding: 8px;
      box-sizing: border-box;
      transition: background-color,color 0.3s;

      &:hover {
        background-color: #eee;
        color: #333;
      }
    }

    .icon-name {
      font-size: 12px;
      color: #333;
      margin-top: 10px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      width: 80px;
    }
  }
</style>
