chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ quality: 400 });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "docs.google.com",
              schemes: ["https", "http"],
              pathPrefix: "/presentation/d",
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

console.log("Welcome to equation-slides!");
