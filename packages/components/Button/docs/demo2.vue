<template>
  <div>
    <fz-button loading @click="handleClick">loading</fz-button>
    <fz-button icon="modular" @click="handleClick">icon</fz-button>

    <fz-button size="mini" @click="handleClick">mini</fz-button>
    <fz-button size="small" @click="handleClick">small</fz-button>
    <fz-button size="medium" @click="handleClick">medium</fz-button>
    <fz-button size="large" @click="handleClick">large</fz-button>
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('click');
};
</script>
