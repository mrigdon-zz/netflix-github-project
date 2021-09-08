export function setParam(name: string, value?: string | boolean) {
  const params = new URLSearchParams(window.location.search);

  if (value) {
    params.set(name, value.toString());
  } else {
    params.delete(name);
  }

  let newUrl = window.location.pathname;
  const search = params.toString();
  if (search) newUrl += `?${search}`;

  window.history.replaceState(null, document.title, newUrl);
}
