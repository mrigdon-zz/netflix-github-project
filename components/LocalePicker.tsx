import { useContext } from "react";
import { Locale, LocaleContext } from "../utils/i18n";
import { setParam } from "../utils/urlParams";

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default function LocalePicker() {
  const { locale, setLocale } = useContext(LocaleContext);
  return (
    <select
      value={locale}
      onChange={(e) => {
        setLocale(e.target.value as Locale);
        setParam("locale", e.target.value);
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
