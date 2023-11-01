<script setup lang="ts">
  import { computed, getCurrentInstance, ref } from 'vue'
  import { useClipboard, useToggle } from '@vueuse/core'
  import { IconCode, IconCopy, IconGithub, IconChevronsUp } from '@fz-design/fz-design-icon'

  import VpCollapseTransition from './vp-collapse-transition.vue'
  import VpExample from './vp-example.vue'
  import SourceCode from './vp-source-code.vue'

  const props = defineProps<{
    demos: object
    source: string
    path: string
    rawSource: string
    description?: string
  }>()

  const vm = getCurrentInstance()!

  const { copy, isSupported } = useClipboard({
    source: decodeURIComponent(props.rawSource),
    read: false
  })

  const [sourceVisible, toggleSourceVisible] = useToggle()

  const sourceCodeRef = ref<HTMLButtonElement>()
  const formatPathDemos = computed(() => {
    const demos = {}

    Object.keys(props.demos).forEach(key => {
      demos[key.replace('../demos/', '').replace('.vue', '')] = props.demos[key].default
    })

    return demos
  })

  const decodedDescription = computed(() => decodeURIComponent(props.description!))

  const onSourceVisibleKeydown = (e: KeyboardEvent) => {
    if (['Enter', 'Space'].includes(e.code)) {
      e.preventDefault()
      toggleSourceVisible(false)
      sourceCodeRef.value?.focus()
    }
  }

  const copyCode = async () => {
    //   const { $message } = vm.appContext.config.globalProperties
    if (!isSupported) {
      // $message.error(locale.value['copy-error'])
    }
    try {
      await copy()
      // $message.success(locale.value['copy-success'])
    } catch (e: any) {
      // $message.error(e.message)
    }
  }

  const githubLink = `https://github.com/fangzhioo/fz-design/tree/master/docs/demos/${props.path}.vue`
</script>

<template>
  <template v-if="path">
    <ClientOnly>
      <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
      <p class="description" v-html="decodedDescription" />

      <div class="example">
        <VpExample :file="path" :demo="formatPathDemos[path]" />

        <div class="line"></div>

        <div class="op-btns">
          <fz-link aria-label="Github Link" class="op-btn" target="_blank" :href="githubLink">
            <fz-svg-icon :icon="IconGithub" />
          </fz-link>
          <button
            aria-label="Copy Code"
            class="op-btn"
            tabindex="0"
            role="button"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode"
          >
            <fz-svg-icon :icon="IconCopy" />
          </button>
          <button
            ref="sourceCodeRef"
            :aria-label="sourceVisible ? 'hide' : 'show'"
            class="op-btn"
            role="button"
            tabindex="0"
            @click="toggleSourceVisible()"
          >
            <fz-svg-icon :icon="IconCode" />
          </button>
        </div>

        <VpCollapseTransition>
          <SourceCode v-show="sourceVisible" :source="source" />
        </VpCollapseTransition>

        <Transition name="fz-fade-in-linear">
          <div
            v-show="sourceVisible"
            class="example-float-control"
            tabindex="0"
            role="button"
            @click="toggleSourceVisible(false)"
            @keydown="onSourceVisibleKeydown"
          >
            <fz-svg-icon :icon="IconChevronsUp" />
            <span>隐藏源代码</span>
          </div>
        </Transition>
      </div>
    </ClientOnly>
  </template>
  <div v-else class="empty">暂无示例</div>
</template>

<style scoped lang="scss">
  .empty {
    padding: 40px 10px;
    text-align: center;
    border: 1px solid var(--fz-border-color);
    border-radius: var(--fz-border-radius-base);
    font-size: var(--fz-font-size-base, 14px);
    color: var(--fz-text-color-secondary);
  }

  .description {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .example {
    border: 1px solid var(--fz-border-color);
    border-radius: var(--fz-border-radius-base);

    .line {
      height: 0.5px;
      width: 100%;
      background-color: var(--fz-border-color);
    }

    .op-btns {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 2.5rem;

      .fz-svg-icon {
        &:hover {
          color: var(--fz-text-color);
        }
      }

      .op-btn {
        margin: 0 0.5rem;
        cursor: pointer;
        color: var(--text-color-lighter);
        transition: 0.2s;

        &.github a {
          transition: 0.2s;
          color: var(--text-color-lighter);

          &:hover {
            color: var(--text-color);
          }
        }
      }
    }

    &-float-control {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid var(--fz-border-color);
      height: 44px;
      box-sizing: border-box;
      background-color: var(--fz-bg-color, #fff);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      margin-top: -1px;
      color: var(--fz-text-color-secondary);
      cursor: pointer;
      position: sticky;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      span {
        font-size: 14px;
        margin-left: 10px;
      }

      &:hover {
        color: var(--fz-color-primary);
      }
    }
  }
</style>
