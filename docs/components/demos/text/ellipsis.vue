<template>
  <fz-text class="w-150px mb-2" ellipsis>
    Self element set width 100px
  </fz-text>
  <fz-row class="w-150px mb-2">
    <fz-text ellipsis>Squeezed by parent element</fz-text>
  </fz-row>
  <fz-text line-clamp="2">
    The -webkit-line-clamp CSS property<br />
    allows limiting of the contents of<br />
    a block to the specified number of lines.
  </fz-text>
</template>

<style scoped>
.w-150px {
  width: 150px;
}

.mb-2 {
  margin-bottom: 8px;
}
</style>
