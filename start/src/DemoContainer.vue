<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup () {
      const handleClick = (): void => {
        console.log('button click')
      }

      const open1 = ref (false)

      return {
        handleClick,
        open1
      }
    }
  })
</script>

<template>
  <div class="button-container">
    <fz-sticky-card :open="open1">
      <h1>Hello World！</h1>
      <h1>Hello World！</h1>
      <h1>Hello World！</h1>
      <h1>Hello World！</h1>
      <h1>Hello World！</h1>
      <h1>Hello World！</h1>
      <h1>Hello World！</h1>
      <h1>Hello World！</h1>
    </fz-sticky-card>

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

    <!-- size -->
    <div>
      <fz-button loading @click="handleClick">loading</fz-button>
      <fz-button icon="bug" @click="handleClick">icon</fz-button>

      <fz-button size="mini" @click="handleClick">mini</fz-button>
      <fz-button size="small" @click="handleClick">small</fz-button>
      <fz-button size="medium" @click="handleClick">medium</fz-button>
      <fz-button size="large" @click="handleClick">large</fz-button>
    </div>

    <!-- group -->
    <div>
      <fz-button-group type="success" size="mini">
        <fz-button>北京</fz-button>
        <fz-button>上海</fz-button>
        <fz-button>杭州</fz-button>
      </fz-button-group>
    </div>
  </div>
</template>

<style lang="scss">
  .button-container {
    .fz-button {
      margin-bottom: 20px;
    }
  }
</style>
