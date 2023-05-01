/* eslint-disable no-undef */
function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
}

function sendChromeMessage(action) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const { id: tabId, url: tabUrl } = await getActiveTab();

    chrome.runtime.sendMessage({ tabId, tabUrl, action }, (response) => {
      resolve(response);
    });
  });
}

export const getStoreData = () => sendChromeMessage("getStoreData");
export const clearCache = () => sendChromeMessage("clearCache");
export const layoutOff = () => sendChromeMessage("layoutOff");
export const jsOff = () => sendChromeMessage("jsOff");
export const getStoreIntegrations = () =>
  sendChromeMessage("getStoreIntegrations");
