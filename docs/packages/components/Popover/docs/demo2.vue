<template>
  <div>
    <fz-popover v-model:visible="visible" trigger="manual" @show="handleShow" @hide="handleHide">
      <template #reference>
        <fz-button @click="handleToggle">手动触发</fz-button>
      </template>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo et enim excepturi laboriosam praesentium magni labore ullam minus dolorem, repellat cumque
        omnis repudiandae nobis, iure, dignissimos aperiam officiis quos totam?
      </div>
    </fz-popover>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);

const handleToggle = () => {
  visible.value = !visible.value;
};

const handleShow = () => {
  console.log('show');
};

const handleHide = () => {
  console.log('hide');
};
</script>
