(() => {
let getFromStorage = (keys) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(keys, (result) => resolve(result))
  );

let style = document.createElement("style");

style.id = "--equation-slides-style";
style.innerHTML = `.picker-urlview-convertButton { --docs-material-font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; --docs-material-font-weight-normal: 400; --docs-material-font-weight-bold: 500; --docs-material-font-size-normal: 14px; --docs-material-font-size-9: 9px; --docs-material-font-size-11: 11px; --docs-material-font-size-12: 12px; --docs-material-font-size-22: 22px; --docs-material-header-font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif; margin-right: 24px; text-transform: uppercase; background-image: none; border-radius: 4px; box-shadow: none; box-sizing: border-box; font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-weight: 500; font-size: 14px; height: 36px; letter-spacing: 0.25px; line-height: 16px; padding: 9px 24px 11px 24px; background: white; border: 1px solid #dadce0!important; color: #202124; cursor: pointer; }`;
var ref = document.querySelector("script");
ref.parentNode.insertBefore(style, ref);
let btn = document.createElement("button");
btn.className = "picker-urlview-convertButton";
btn.innerHTML = "Equationify";
btn.onclick = async function () {
  let input = document.querySelector(".picker-urlview-inner-input");
  input.value =
    "https://latex.codecogs.com/png.latex?%5Cdpi{" +
    (await getFromStorage("quality")).quality +
    "}&space;" +
    encodeURI(input.value);
};
document
  .querySelector(
    "body > div.google-url-picker.modal-dialog > div.picker-urlview-actionbar > button.picker-urlview-cancelbutton"
  )
  .parentNode.insertBefore(
    btn,
    document.querySelector(
      "body > div.google-url-picker.modal-dialog > div.picker-urlview-actionbar > button.picker-urlview-cancelbutton"
    )
  );
document.querySelector(".picker-urlview-inner-input").onpaste = async function (
  event
) {
  let input = document.querySelector(".picker-urlview-inner-input");
  if (
    (input.value[0] === "`" && input.value[input.value.length - 1] === "`") ||
    (input.value[0] === "$" && input.value[input.value.length - 1] === "$")
  ) {
    event.preventDefault();
    input.value =
      "https://latex.codecogs.com/png.latex?%5Cdpi{" +
      (await getFromStorage("quality")).quality +
      "}&space;" +
      encodeURI(input.value.substring(1, input.value.length - 1));
    document.getElementsByClassName(
      "picker-urlview-error-container"
    )[0].innerHTML = "";
  }
};})()
