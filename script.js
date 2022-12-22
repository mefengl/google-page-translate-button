// ==UserScript==
// @name         谷歌网页翻译
// @namespace    https://github.com/mefengl
// @version      2.0.0
// @description  🍓 一个按钮的事，一点都不费事
// @author       mefengl
// @match        http://*/*
// @match        https://*/*
// @exclude      https://edition.cnn.com/
// @exclude      https://www.baidu.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=translate.google.com
// @require      https://cdn.staticfile.org/jquery/3.6.1/jquery.min.js
// @grant        none
// @license MIT
// ==/UserScript==

(function () {
  "use strict";
  $(function () {
    // if origin end with '.translate.goog', then return
    if (window.location.origin.endsWith(".translate.goog")) return;

    // if title contains Chinese, then make button less visible
    const hide_right = document.title.match(/[\u4e00-\u9fa5]/)
      ? "-130px"
      : "-120px";
    // create the button
    $("<button>翻译网页</button>")
      .click(function () {
        window.location.href = `https://translate.google.com/translate?sl=auto&tl=zh-CN&u=${window.location.href}`;
      })
      .css({ position: "fixed", width: "140px", top: "120px", right: hide_right, "z-index": "999999", "background-color": "#4285f4", color: "#fff", opacity: "0.8", border: "none", "border-radius": "4px", padding: "10px 16px", "font-size": "18px", cursor: "pointer", })
      .hover(
        // hover to show, and hide when not hover
        function () { $(this).stop().animate({ right: "-10px", }, 400); },
        function () { $(this).stop().animate({ right: hide_right, }, 400); }
      )
      .appendTo("body");
  });
})();
