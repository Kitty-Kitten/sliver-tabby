import { EggAppConfig, PowerPartial } from 'egg';
import { localConf } from '../db';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    mysql: {
      client: localConf,
    },
  };
  return config;
};
