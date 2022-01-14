<template>
  <div class="affix-container">
    <fz-affix target=".affix-container" :offset="80">
      <fz-button type="primary">Target container</fz-button>
    </fz-affix>
  </div>
</template>

<style>
.affix-container {
  background-color: #ccc;
  height: 600px;
  text-align: center;
}
</style>
