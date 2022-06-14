import { SFCWithInstall } from '@fzui/utils';
import { App } from 'vue';
import MessageBoxCreator from './src/createMessageBox';

const MessageBoxPlugin = MessageBoxCreator as SFCWithInstall<typeof MessageBoxCreator>;

MessageBoxPlugin.install = (app: App) => {
  // app.component(MessageBox.name, MessageBox);
  MessageBoxPlugin._context = app._context;
  app.config.globalProperties.$msgbox = MessageBoxPlugin;
  app.config.globalProperties.$messageBox = MessageBoxPlugin;
  app.config.globalProperties.$alert = MessageBoxPlugin.alert;
  app.config.globalProperties.$confirm = MessageBoxPlugin.confirm;
  app.config.globalProperties.$prompt = MessageBoxPlugin.prompt;
};

const FzMessageBox = MessageBoxPlugin;
const MessageBox = MessageBoxPlugin;

export { MessageBox, FzMessageBox, MessageBoxPlugin };
