import { EggAppConfig, PowerPartial } from 'egg';
import { localConf } from '../db';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.mysql = {
    client: localConf,
  };
  return config;
};
