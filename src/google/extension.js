import {
  changeUrl,
  getHistory,
  removeExternalJsFromUrl,
  removeLayoutByParam,
  setHistory,
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
    async function (result) {
      const response = result[0].result;

      if (response.isTray) {
        await setHistory(response);
      }

      sendResponse(response);
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

export const getStoreHistory = async (message, sendResponse) => {
  const response = await getHistory();
  sendResponse(response);
};

export const changeEnvironment = async (message, sendResponse) => {
  const { tabId } = message;
  const response = changeUrl(message.data);

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
      cacheStorage: false,
      cookies: true,
      fileSystems: false,
      indexedDB: false,
      localStorage: true,
    },
    function () {
      sendResponse("Storage limpo com sucesso!");
    }
  );
};
