<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <fz-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start">
        <fz-button>top-start</fz-button>
      </fz-tooltip>
      <fz-tooltip class="box-item" effect="dark" content="Top Center prompts info" placement="top">
        <fz-button>top</fz-button>
      </fz-tooltip>
      <fz-tooltip class="box-item" effect="dark" content="Top Right prompts info" placement="top-end">
        <fz-button>top-end</fz-button>
      </fz-tooltip>
    </div>
    <div class="row">
      <fz-tooltip class="box-item" effect="dark" content="Left Top prompts info" placement="left-start">
        <fz-button>left-start</fz-button>
      </fz-tooltip>
      <fz-tooltip class="box-item" effect="dark" content="Right Top prompts info" placement="right-start">
        <fz-button>right-start</fz-button>
      </fz-tooltip>
    </div>
    <div class="row">
      <fz-tooltip class="box-item" effect="dark" content="Left Center prompts info" placement="left">
        <fz-button class="mt-3 mb-3">left</fz-button>
      </fz-tooltip>
      <fz-tooltip class="box-item" effect="dark" content="Right Center prompts info" placement="right">
        <fz-button>right</fz-button>
      </fz-tooltip>
    </div>
    <div class="row">
      <fz-tooltip class="box-item" effect="dark" content="Left Bottom prompts info" placement="left-end">
        <fz-button>left-end</fz-button>
      </fz-tooltip>
      <fz-tooltip class="box-item" effect="dark" content="Right Bottom prompts info" placement="right-end">
        <fz-button>right-end</fz-button>
      </fz-tooltip>
    </div>
    <div class="row center">
      <fz-tooltip class="box-item" effect="dark" content="Bottom Left prompts info" placement="bottom-start">
        <fz-button>bottom-start</fz-button>
      </fz-tooltip>
      <fz-tooltip class="box-item" effect="dark" content="Bottom Center prompts info" placement="bottom">
        <fz-button>bottom</fz-button>
      </fz-tooltip>
      <fz-tooltip class="box-item" effect="dark" content="Bottom Right prompts info" placement="bottom-end">
        <fz-button>bottom-end</fz-button>
      </fz-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
