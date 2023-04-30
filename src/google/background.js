/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'getStoreData') {
    chrome.scripting.executeScript(
      {
        target: { tabId: message.tabId },
        func: () => {
          const trayCopy = document.querySelector('meta[name="copyright"]')
          const html = document.querySelector('html')

          const id =
            html.getAttribute('data-store') ||
            html.getAttribute('data-checkout-store_id')

          const session =
            html.getAttribute('data-session') ||
            html.getAttribute('data-checkout-session_id')

          const isTray = trayCopy
            ? trayCopy.getAttribute('content') === 'Tray Tecnologia'
            : false

          const isPageviewScriptPresent = !!document.querySelector(
            'script#pageview-script'
          )

          const store = {
            id: id,
            session: session,
            title: document.title || '',
            url: window.location.origin,
            currentUrl: window.location.href,
            isTray: isTray || isPageviewScriptPresent,
          }

          return store
        },
      },
      function (result) {
        sendResponse(result[0].result)
      }
    )
  }

  if (message.action === 'getStoreIntegrations') {
    chrome.scripting.executeScript(
      {
        target: { tabId: message.tabId },
        func: () => {
          const gtmCode =
            document
              .querySelector('script[src*="googletagmanager.com/gtm.js?id="]')
              ?.getAttribute('src')
              ?.match(/id=([^&]*)/)[1] ?? ''

          const ga4Id =
            document
              .querySelector(
                'script[src*="googletagmanager.com/gtag/js?id=G-"]'
              )
              ?.getAttribute('src')
              ?.match(/id=(.*?)&/)[1] ?? ''

          const UA =
            document
              .querySelector(
                'script[src*="googletagmanager.com/gtag/js?id=UA-"]'
              )
              ?.getAttribute('src')
              ?.match(/id=(UA-\w+-\d+)/)?.[1] ?? ''

          const fbPixelId =
            document
              .querySelector('script[src*="facebook-conversion.js?pixel="]')
              ?.getAttribute('src')
              ?.match(/pixel=(\d+)/)[1] ?? ''

          const integrations = {
            gtm: gtmCode,
            analyticsGa4: ga4Id,
            analyticsUa: UA,
            facebookPixel: fbPixelId,
          }

          return integrations
        },
      },
      function (result) {
        sendResponse(result[0].result)
      }
    )
  }

  if (message.action === 'getStorePerformance') {
    chrome.scripting.executeScript(
      {
        target: { tabId: message.tabId },
        func: () => {},
      },
      function (result) {
        sendResponse(result[0].result)
      }
    )
  }

  if (message.action === 'clearCache') {
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
        sendResponse('Cache limpo com sucesso!')
      }
    )
  }

  if (message.action === 'layoutOff') {
    const { tabId, tabUrl } = message

    const param = 'layoutOff=1'

    if (tabUrl.includes('my-account') || tabUrl.includes('checkout')) {
      return sendResponse(`Essa pagina não é um tema`)
    }

    if (tabUrl.includes('layoutOff')) {
      sendResponse(`Essa pagina já esta sem o tema`)
      return
    }

    const newUrl = tabUrl.includes('?')
      ? `${tabUrl}&${param}`
      : `${tabUrl}?${param}`

    chrome.tabs.update(tabId, { url: newUrl }, function () {
      sendResponse(`Tema removido com sucesso`)
    })
  }

  if (message.action === 'jsOff') {
    const { tabId, tabUrl } = message

    let param = 'jsOff=1'

    if (tabUrl.includes('my-account') || tabUrl.includes('checkout')) {
      param = 'js=0'
    }

    if (tabUrl.includes('jsOff=1') || tabUrl.includes('js=0')) {
      sendResponse(`Essa pagina já esta sem o javascript externo`)
      return
    }

    const hashIndex = tabUrl.indexOf('#')
    const urlWithoutHash =
      hashIndex >= 0 ? tabUrl.substring(0, hashIndex) : tabUrl

    let newUrl = urlWithoutHash.includes('?')
      ? `${urlWithoutHash}&${param}`
      : `${urlWithoutHash}?${param}`

    if (hashIndex >= 0) {
      newUrl = `${newUrl}${tabUrl.substring(hashIndex)}`
    }

    chrome.tabs.update(tabId, { url: newUrl }, function () {
      sendResponse(`javascript externo removido com sucesso`)
    })
  }

  return true
})
