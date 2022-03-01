<template>
  <div class="fzui-preview">
    <section class="preview-container">
      <slot></slot>
    </section>

    <transition name="demo-collapse-transition">
      <div v-show="codeVisible" class="source-code">
        <div v-if="loading" style="padding: 50px; text-align: center">加载中……</div>
        <pre class="language-html"><code class="language-html">{{ previewSourceCode }}</code></pre>
      </div>
    </transition>

    <div class="preview-bottom">
      <span name="Code" @click="showSourceCode">{{ codeVisible ? '收起代码' : '查看代码' }}</span>
    </div>
  </div>
</template>

<script>
import Prism from 'prismjs';

const isDev = import.meta.env.MODE === 'development';

export default {
  props: {
    /** 组件名称 与 packages下的文件夹名字对应 */
    compName: {
      type: String,
      default: '',
      require: true,
    },
    /** 要显示代码的组件 */
    demoName: {
      type: String,
      default: '',
      require: true,
    },
  },
  data() {
    return {
      sourceCode: '',
      codeVisible: false,
      loading: false,
    };
  },
  computed: {
    previewSourceCode() {
      return this.sourceCode;
    },
  },
  methods: {
    async copyCode() {
      // this.$copyText(this.sourceCode);
    },
    async showSourceCode() {
      if (!this.sourceCode) {
        await this.getSourceCode();
      }
      this.codeVisible = !this.codeVisible;
    },
    async getSourceCode() {
      if (this.loading) {
        return;
      }
      if (this.compName && this.demoName) {
        this.loading = true;
        if (isDev) {
          this.sourceCode = (await import(/* @vite-ignore */ `../../packages/components/${this.compName}/docs/${this.demoName}.vue?raw`)).default;
        } else {
          this.sourceCode = await fetch(`/fz-ui/packages/components/${this.compName}/docs/${this.demoName}.vue`).then((res) => res.text());
        }
      }
      this.$nextTick(() => {
        Prism.highlightAll();
      });
      this.loading = false;
    },
  },
};
</script>
<style lang="less">
.demo-collapse-transition-leave-active,
.demo-collapse-transition-enter-active {
  transition: 0.35s height ease-in-out;
}

.fzui-preview {
  border: 4px;
  border: 1px dashed #e7e7e7;
  padding: 10px;
  border-bottom: 1px dashed #e7e7e7;
  .preview-container {
    margin: 15px;
  }
}

.language-html {
  margin: 0;
  padding: 0 15px;
  box-sizing: border-box;
}
.preview-bottom {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px dashed #e7e7e7;
  cursor: pointer;
}
</style>
