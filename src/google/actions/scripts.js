/* eslint-disable no-undef */
export const removeExternalJsFromUrl = (url) => {
  let param = "jsOff=1";
  const message = {
    error: "",
    success: "javascript externo removido com sucesso!",
  };

  if (url.includes("my-account") || url.includes("checkout")) {
    param = "js=0";
  }

  if (url.includes(param)) {
    message.error = "Essa pagina já esta sem o javascript externo";
    return { newUrl: null, message };
  }

  const hashIndex = url.indexOf("#");
  const urlWithoutHash = hashIndex >= 0 ? url.substring(0, hashIndex) : url;

  let newUrl = addParamToUrl(urlWithoutHash, param);

  if (hashIndex >= 0) {
    newUrl = `${newUrl}${url.substring(hashIndex)}`;
  }

  return { newUrl, message };
};

export const removeLayoutByParam = (url) => {
  const param = "layoutOff=1";

  const message = {
    error: "",
    success: "Tema removido com sucesso!",
  };

  if (url.includes("my-account") || url.includes("checkout")) {
    message.error = `Essa pagina não é um tema`;
    return { newUrl: null, message };
  }

  if (url.includes("layoutOff")) {
    message.error = `Essa pagina já esta sem o tema`;
    return { newUrl: null, message };
  }

  const newUrl = addParamToUrl(url, param);

  return { newUrl, message };
};

export const storeDataByHtml = () => {
  const trayCopy = document.querySelector('meta[name="copyright"]');
  const html = document.querySelector("html");

  const id =
    html.getAttribute("data-store") ||
    html.getAttribute("data-checkout-store_id");

  const session =
    html.getAttribute("data-session") ||
    html.getAttribute("data-checkout-session_id");

  const isTray = trayCopy
    ? trayCopy.getAttribute("content") === "Tray Tecnologia"
    : false;

  const isPageviewScriptPresent = !!document.querySelector(
    "script#pageview-script"
  );

  const store = {
    id: id,
    session: session,
    title: document.title || "",
    url: window.location.origin,
    currentUrl: window.location.href,
    isTray: isTray || isPageviewScriptPresent,
  };

  return store;
};

export const storeIntegrationsByHtml = () => {
  const gtmCode =
    document
      .querySelector('script[src*="googletagmanager.com/gtm.js?id="]')
      ?.getAttribute("src")
      ?.match(/id=([^&]*)/)[1] ?? "";

  const ga4Id =
    document
      .querySelector('script[src*="googletagmanager.com/gtag/js?id=G-"]')
      ?.getAttribute("src")
      ?.match(/id=(.*?)&/)[1] ?? "";

  const UA =
    document
      .querySelector('script[src*="googletagmanager.com/gtag/js?id=UA-"]')
      ?.getAttribute("src")
      ?.match(/id=(UA-\w+-\d+)/)?.[1] ?? "";

  const fbPixelId =
    document
      .querySelector('script[src*="facebook-conversion.js?pixel="]')
      ?.getAttribute("src")
      ?.match(/pixel=(\d+)/)[1] ?? "";

  const integrations = {
    gtm: gtmCode,
    analyticsGa4: ga4Id,
    analyticsUa: UA,
    facebookPixel: fbPixelId,
  };

  return integrations;
};

function addParamToUrl(url, param) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${param}`;
}
