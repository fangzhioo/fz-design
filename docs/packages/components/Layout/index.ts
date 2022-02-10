import { App, Plugin } from 'vue';
import Row from './src/Row.vue';
import Col from './src/Col.vue';

export const LayoutPlugin: Plugin = {
  install(app: App) {
    app.component(Row.name, Row);
    app.component(Col.name, Col);
  },
};

export { Row, Col };
