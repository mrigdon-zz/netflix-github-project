import en from "../labels/en.json";
import es from "../labels/es.json";
import { getConfig } from "./globalConfig";

type LabelKey = keyof typeof en;

const labels = { en, es };

export function label(key: LabelKey, attrs: { [index: string]: string } = {}) {
  let { value } = labels[getConfig().locale][key];

  Object.entries(attrs).forEach(([k, v]) => {
    value = value.replace(`%{${k}}`, v);
  });

  return value;
}
