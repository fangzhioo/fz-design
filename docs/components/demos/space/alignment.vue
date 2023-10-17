<template>
  <div class="alignment-container">
    <fz-space>
      string
      <fz-button> button </fz-button>
      <fz-card>
        <template #header> header </template>
        body
      </fz-card>
    </fz-space>
  </div>
  <div class="alignment-container">
    <fz-space alignment="flex-start">
      string
      <fz-button> button </fz-button>
      <fz-card>
        <template #header> header </template>
        body
      </fz-card>
    </fz-space>
  </div>
  <div class="alignment-container">
    <fz-space alignment="flex-end">
      string
      <fz-button> button </fz-button>
      <fz-card>
        <template #header> header </template>
        body
      </fz-card>
    </fz-space>
  </div>
</template>

<style>
.alignment-container {
  width: 240px;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid var(--fz-border-color);
}
</style>
