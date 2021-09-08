import { Locale, LocaleContext } from "../utils/i18n";

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default function LocalePicker() {
  return (
    <LocaleContext.Consumer>
      {({ locale, setLocale }) => (
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </LocaleContext.Consumer>
  );
}
