import { label, LabelKey, LocaleContext } from "../utils/i18n";

export default function Label({
  name,
  attrs,
}: {
  name: LabelKey;
  attrs: { [index: string]: string };
}) {
  return (
    <LocaleContext.Consumer>
      {({ locale }) => label(locale, name, attrs)}
    </LocaleContext.Consumer>
  );
}
