<template>
  <div>
    <fz-button @click="handleClick">default</fz-button>
    <fz-button type="primary" @click="handleClick">primary</fz-button>
    <fz-button type="success" @click="handleClick">success</fz-button>
    <fz-button type="warning" @click="handleClick">warning</fz-button>
    <fz-button type="info" @click="handleClick">info</fz-button>
    <fz-button type="error" @click="handleClick">error</fz-button>
    <fz-button type="text" @click="handleClick">text</fz-button>
    <fz-button plain @click="handleClick">plain</fz-button>
    <fz-button round @click="handleClick">round</fz-button>
    <fz-button circle @click="handleClick">c</fz-button>
    <fz-button disabled @click="handleClick">disabled</fz-button>
    <fz-button loading @click="handleClick">loading</fz-button>

    <fz-button size="mini" @click="handleClick">mini</fz-button>
    <fz-button size="small" @click="handleClick">small</fz-button>
    <fz-button size="medium" @click="handleClick">medium</fz-button>
    <fz-button size="large" @click="handleClick">large</fz-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const handleClick = () => {
      console.log('button click');
    };
    return {
      handleClick,
    };
  },
});
</script>
