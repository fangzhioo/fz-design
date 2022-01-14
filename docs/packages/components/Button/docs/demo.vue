<template>
  <div class="button-container">
    <!-- default -->
    <div>
      <fz-button @click="handleClick">default</fz-button>
      <fz-button type="primary" @click="handleClick">primary</fz-button>
      <fz-button type="success" @click="handleClick">success</fz-button>
      <fz-button type="warning" @click="handleClick">warning</fz-button>
      <fz-button type="info" @click="handleClick">info</fz-button>
      <fz-button type="error" @click="handleClick">error</fz-button>
      <fz-button type="text" @click="handleClick">text</fz-button>
    </div>
    <!-- plain -->
    <div>
      <fz-button plain @click="handleClick">default</fz-button>
      <fz-button plain type="primary" @click="handleClick">primary</fz-button>
      <fz-button plain type="success" @click="handleClick">success</fz-button>
      <fz-button plain type="warning" @click="handleClick">warning</fz-button>
      <fz-button plain type="info" @click="handleClick">info</fz-button>
      <fz-button plain type="error" @click="handleClick">error</fz-button>
      <fz-button plain type="text" @click="handleClick">text</fz-button>
    </div>
    <!-- round -->
    <div>
      <fz-button round @click="handleClick">default</fz-button>
      <fz-button round type="primary" @click="handleClick">primary</fz-button>
      <fz-button round type="success" @click="handleClick">success</fz-button>
      <fz-button round type="warning" @click="handleClick">warning</fz-button>
      <fz-button round type="info" @click="handleClick">info</fz-button>
      <fz-button round type="error" @click="handleClick">error</fz-button>
      <fz-button round type="text" @click="handleClick">text</fz-button>
    </div>
    <!-- disabled -->
    <div>
      <fz-button disabled @click="handleClick">default</fz-button>
      <fz-button disabled type="primary" @click="handleClick">primary</fz-button>
      <fz-button disabled type="success" @click="handleClick">success</fz-button>
      <fz-button disabled type="warning" @click="handleClick">warning</fz-button>
      <fz-button disabled type="info" @click="handleClick">info</fz-button>
      <fz-button disabled type="error" @click="handleClick">error</fz-button>
      <fz-button disabled type="text" @click="handleClick">text</fz-button>
    </div>

    <!-- circle -->
    <div>
      <fz-button circle icon="lock"></fz-button>
      <fz-button circle icon="notification" type="primary"></fz-button>
      <fz-button circle icon="operation" type="success"></fz-button>
      <fz-button circle icon="navigation" type="warning"></fz-button>
      <fz-button circle icon="search" type="info"></fz-button>
      <fz-button circle icon="user" type="error"></fz-button>
    </div>
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

<style lang="less">
.button-container {
  .fz-button {
    margin-bottom: 20px;
  }
}
</style>
