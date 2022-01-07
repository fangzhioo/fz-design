<template>
  <div>
    <fz-popover trigger="hover" :title="title" :content="content">
      <template #reference>
        <fz-button>hover触发</fz-button>
      </template>
    </fz-popover>

    <fz-popover trigger="click" :title="title" :content="content">
      <template #reference>
        <fz-button>click触发</fz-button>
      </template>
    </fz-popover>

    <fz-popover trigger="focus" :title="title" :content="content">
      <template #reference>
        <fz-button>focus触发</fz-button>
      </template>
    </fz-popover>

    <fz-popover v-model:visible="visible" trigger="manual" :title="title" :content="content">
      <template #reference>
        <fz-button @click="handleToggle">manual触发</fz-button>
      </template>
    </fz-popover>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const title = ref('Title');
const content = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit.');

const handleToggle = () => {
  visible.value = !visible.value;
};
</script>
