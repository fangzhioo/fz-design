<template>
  <div>
    <div>请滑动到底部，查看右下角</div>
    <fz-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: var(--fz-color-white, #f2f5f6);
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          text-align: center;
          line-height: 40px;
          color: var(--fz-color-primary, #5c4fd0);
        "
      >
        UP
      </div>
    </fz-backtop>
  </div>
</template>
