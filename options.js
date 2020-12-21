chrome.storage.sync.get('quality', function (data) {
  byId('myRange').value = data.quality;
  byId('value').value = data.quality;
});

byId('myRange').oninput = function () {
  byId('value').value = byId('myRange').value;
  chrome.storage.sync.set({ quality: byId('myRange').value });
};

byId('value').onchange = function () {
  if (byId('value').value > 1000 || byId('value').value < 100) {
    return;
  }
  let newQuality;
  try {
    newQuality = parseInt(newQuality);
  } catch {
    return;
  }
  byId('myRange').value = byId('value').value;
  chrome.storage.sync.set({ quality: byId('value').value });
};

byId('reset').onclick = function () {
  byId('value').value = 400;
  byId('myRange').value = 400;
  chrome.storage.sync.set({ quality: 400 });
};
