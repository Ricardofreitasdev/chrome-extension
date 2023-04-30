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
    const tab = await getActiveTab();
    const tabId = tab.id;
    const tabUrl = tab.url;

    chrome.runtime.sendMessage({ tabId, tabUrl, action }, (response) => {
      resolve(response);
    });
  });
}

export function getStoreData() {
  return sendChromeMessage("getStoreData");
}

export function getStoreIntegrations() {
  return sendChromeMessage("getStoreIntegrations");
}

export function getStorePerformance() {
  return sendChromeMessage("getStorePerformance");
}

export function clearCache() {
  return sendChromeMessage("clearCache");
}

export function layoutOff() {
  return sendChromeMessage("layoutOff");
}

export function jsOff() {
  return sendChromeMessage("jsOff");
}
