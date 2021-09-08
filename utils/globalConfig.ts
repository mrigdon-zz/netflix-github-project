export type Locale = "en" | "es";

interface Config {
  locale: Locale;
}

let config: Config;

export function getConfig() {
  if (config) return config;
  throw new Error(`
    You did not set the global config. Please do the following:
    import { setConfig } from 'utils/globalConfig';
    setConfig({ locale: 'en' });
  `);
}

export function setConfig(value: Config) {
  config = { ...(config ? config : {}), ...value };
}
