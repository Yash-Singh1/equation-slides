console.log('Welcome to the equation-slides popup!');
var boolInit = false;

chrome.tabs.executeScript(
  {
    code:
      '(document.querySelector(".picker-urlview") !== null) && ((document.querySelector(".picker-urlview-convertButton") !== null) && (document.getElementById("--equation-slides-style") !== null) && (typeof document.querySelector(".picker-urlview-inner-input").onpaste === "function"))',
  },
  function (results) {
    if (results[0] === true) {
      byId('already').className = 'green';
      byId('already').innerHTML = 'equation-slides has been initialized';
      boolInit = true;
    }
  }
);

function byId(id) {
  return document.getElementById(id);
}

chrome.storage.sync.get('quality', function (data) {
  byId('myRange').value = data.quality;
  byId('value').value = data.quality;
});

function removeAlready() {
  setTimeout(function () {
    byId('already').innerHTML = '';
    byId('already').className = 'already';
  }, 3000);
}

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

byId('initialize').onclick = async function () {
  if (boolInit === true) {
    byId('already').className = 'green';
    byId('already').innerHTML = 'equation-slides has already been initialized';
    removeAlready();
    return;
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: '/initialize.js',
    });
  });
  byId('already').className = 'green';
  byId('already').innerHTML = 'equation-slides has been initialized';
  removeAlready();
  boolInit = true;
};

byId('deinitialize').onclick = function () {
  if (boolInit === false) {
    byId('already').className = 'already';
    byId('already').innerHTML = 'equation-slides has not been initialized';
    removeAlready();
    return;
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: '/deinitialize.js',
    });
  });
  byId('already').className = 'green';
  byId('already').innerHTML = 'equation-slides has been deinitialized';
  removeAlready();
  boolInit = false;
};

byId('reset').onclick = function () {
  byId('value').value = 400;
  byId('myRange').value = 400;
  chrome.storage.sync.set({ quality: 400 });
};
