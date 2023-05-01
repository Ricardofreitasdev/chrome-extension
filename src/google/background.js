import {
  clearCache,
  getStoreData,
  getStoreIntegrations,
  jsOff,
  layoutOff,
} from "./extension.js";

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const actions = {
    getStoreData,
    getStoreIntegrations,
    layoutOff,
    jsOff,
    clearCache,
  };

  const action = actions[message.action];

  if (action) {
    action(message, sendResponse);
  }

  return true;
});
