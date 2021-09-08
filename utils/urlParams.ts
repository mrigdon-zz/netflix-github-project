export function setParam(name: string, value?: string) {
  const params = new URLSearchParams(window.location.search);

  if (value) {
    params.set(name, value);
  } else {
    params.delete(name);
  }

  let newUrl = window.location.pathname;
  const search = params.toString();
  if (search) newUrl += `?${search}`;

  window.history.replaceState(null, document.title, newUrl);
}
