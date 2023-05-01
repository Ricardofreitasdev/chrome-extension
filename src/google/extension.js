import {
  removeExternalJsFromUrl,
  removeLayoutByParam,
  storeDataByHtml,
  storeIntegrationsByHtml,
} from "./actions/scripts.js";

/* eslint-disable no-undef */
export const getStoreData = (message, sendResponse) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: message.tabId },
      func: storeDataByHtml,
    },
    function (result) {
      sendResponse(result[0].result);
    }
  );
};

export const getStoreIntegrations = (message, sendResponse) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: message.tabId },
      func: storeIntegrationsByHtml,
    },
    function (result) {
      sendResponse(result[0].result);
    }
  );
};

export const layoutOff = (message, sendResponse) => {
  const { tabId, tabUrl } = message;
  const response = removeLayoutByParam(tabUrl);

  if (response.message.error) {
    sendResponse(response.message.error);
    return;
  }

  chrome.tabs.update(tabId, { url: response.newUrl }, function () {
    sendResponse(response.message.success);
  });
};

export const jsOff = (message, sendResponse) => {
  const { tabId, tabUrl } = message;
  const response = removeExternalJsFromUrl(tabUrl);

  if (response.message.error) {
    sendResponse(response.message.error);
    return;
  }

  chrome.tabs.update(tabId, { url: response.newUrl }, function () {
    sendResponse(response.message.success);
  });
};

export const clearCache = (message, sendResponse) => {
  chrome.browsingData.remove(
    {
      originTypes: {
        protectedWeb: true,
        unprotectedWeb: true,
        extension: true,
      },
    },
    {
      cacheStorage: true,
      cookies: true,
      fileSystems: true,
      indexedDB: true,
      localStorage: true,
    },
    function () {
      sendResponse("Cache limpo com sucesso!");
    }
  );
};
