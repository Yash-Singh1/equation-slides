if (
  document.querySelector(".picker-urlview") !== null &&
  (document.querySelector(".picker-urlview-convertButton") !== null &&
    document.getElementById("--equation-slides-style") !== null &&
    typeof document.querySelector(".picker-urlview-inner-input").onpaste ===
      "function") === false
) {
} else {
  document.getElementsByClassName("picker-urlview-convertButton")[0].remove();
  document.getElementById("--equation-slides-style").remove();
  document.querySelector(
    "body > div.google-url-picker.modal-dialog > div.google-url-picker.modal-dialog-content > div:nth-child(1) > div > input"
  ).onpaste = null;
}
