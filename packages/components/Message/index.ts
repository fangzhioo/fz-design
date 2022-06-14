import { App, Plugin } from 'vue';
import Message from './src/Message.vue';
import type { MessageType } from './src/Message';

import message from './src/MessageMethod';

export const MessagePlugin: Plugin = {
  install(app: App) {
    // app.component(Message.name, Message);
    app.config.globalProperties.$message = message;
  },
};

const FzMessage = message;

export { Message, FzMessage, MessageType };
