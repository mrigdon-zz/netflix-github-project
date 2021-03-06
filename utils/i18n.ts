import React from "react";
import en from "../labels/en.json";
import es from "../labels/es.json";

export type Locale = "en" | "es";

export type LabelKey = keyof typeof en;

const labels = { en, es };

export function label(
  locale: Locale,
  key: LabelKey,
  attrs: { [index: string]: string } = {}
) {
  let { value } = labels[locale][key];

  Object.entries(attrs).forEach(([k, v]) => {
    value = value.replace(`%{${k}}`, v);
  });

  return value;
}

export function timestamp(locale: Locale, updatedAt: string) {
  const date = new Date(updatedAt);
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formatter.format(date);
}

export const LocaleContext = React.createContext({
  locale: "en" as Locale,
  setLocale(_locale: Locale) {},
});
