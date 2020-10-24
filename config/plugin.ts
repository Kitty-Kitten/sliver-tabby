import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};

export default plugin;
