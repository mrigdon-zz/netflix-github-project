export default function classNames(
  ...names: (string | undefined | null | boolean)[]
) {
  return names.filter(Boolean).join(" ");
}
