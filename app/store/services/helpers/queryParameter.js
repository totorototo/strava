export default function updateQueryStringParameter(uri, queryParameters) {
  let buffer = uri;

  Object.keys(queryParameters).forEach(key => {
    const re = new RegExp(`([?&])${key}=.*?(&|$)`, "i");
    const separator = buffer.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      buffer.replace(re, `$1${key}=${queryParameters[key]}$2`);
    }
    buffer += `${separator + key}=${queryParameters[key]}`;
  });

  return buffer;
}
