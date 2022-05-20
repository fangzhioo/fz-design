<template>
  <!-- 图片 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleAddImage" :class="{ 'is-active': editor.isActive('image') }"><fz-icon name="picture" /></button>
    <template #content>
      <div>插入图片</div>
    </template>
  </fz-tooltip>

  <!-- dialog -->
  <fz-dialog v-model="dialogVisible" title="编辑图片">
    <div>
      <fz-input v-model="src" placeholder="图片地址" />
      <fz-input v-model="alt" placeholder="替代文本" />
      <fz-input v-model="title" placeholder="图片说明" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <fz-button @click="handleCancel">取消</fz-button>
        <fz-button type="primary" @click="handleConfirm">确定</fz-button>
      </span>
    </template>
  </fz-dialog>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref, reactive, toRefs, PropType } from 'vue';
import { Editor } from '@tiptap/vue-3';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY } from '@fzui/constants';
import { Icon, Tooltip, Dialog, Input } from '@fzui/components';
import { isFunction, isPromise } from '@fzui/utils';
import { ImageOptions, ImageState } from '../extensions/ImageExtension';

export default defineComponent({
  name: 'ImageMenus',
  components: {
    FzIcon: Icon,
    FzTooltip: Tooltip,
    FzDialog: Dialog,
    FzInput: Input,
  },
  props: {
    options: {
      type: Object as PropType<Partial<ImageOptions>>,
      default: () => ({}),
    },
  },
  setup(props) {
    const dialogVisible = ref(false);
    const imageState = reactive<ImageState>({
      src: '',
      alt: '',
      title: '',
    });
    const editor = inject<Ref<Editor>>(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY)!;

    const transImage = (image: ImageState) => {
      const { src, title, alt } = image;
      if (src) {
        editor.value.chain().focus().setImage({ src, title, alt }).run();
      }
    };

    const handleAddImage = () => {
      if (editor.value.isActive('image')) {
        // 当前选择的节点
        const { src, alt, title } = editor.value.getAttributes('image');
        imageState.alt = alt;
        imageState.src = src;
        imageState.title = title;
      } else {
        const { beforeInsert } = props.options;
        // 自定义的上传事件
        if (beforeInsert && isFunction(beforeInsert)) {
          const backPromise = beforeInsert();
          if (backPromise) {
            if (isPromise(backPromise)) {
              backPromise.then((image) => {
                transImage(image);
              });
            } else {
              transImage(backPromise);
            }
          }
          return;
        }
      }
      dialogVisible.value = true;
    };

    const handleCancel = () => {
      imageState.alt = '';
      imageState.src = '';
      imageState.title = '';
      dialogVisible.value = false;
    };

    const handleConfirm = () => {
      const { src, alt, title } = imageState;
      if (src) {
        editor.value.chain().focus().setImage({ src, title, alt }).run();
      }
      handleCancel();
    };

    return {
      ...toRefs(imageState),
      dialogVisible,
      editor,
      handleAddImage,
      handleConfirm,
      handleCancel,
    };
  },
});
</script>
