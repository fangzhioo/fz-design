import { App, Plugin } from 'vue';
import Carousel from './src/Carousel.vue';
import CarouselItem from './src/CarouselItem.vue';

export const CarouselPlugin: Plugin = {
  install(app: App) {
    app.component(Carousel.name, Carousel);
    app.component(CarouselItem.name, CarouselItem);
  },
};

export { Carousel, CarouselItem };
