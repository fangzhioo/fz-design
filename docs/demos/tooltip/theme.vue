<template>
  <fz-tooltip content="Top center" placement="top">
    <fz-button>Dark</fz-button>
  </fz-tooltip>
  <fz-tooltip content="Bottom center" placement="bottom" effect="light">
    <fz-button>Light</fz-button>
  </fz-tooltip>

  <fz-tooltip content="Bottom center" effect="customized">
    <fz-button>Customized theme</fz-button>
  </fz-tooltip>
</template>

<style>
.fz-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.fz-popper.is-customized .fz-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
