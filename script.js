// ==UserScript==
// @name         谷歌网页翻译
// @namespace    https://github.com/mefengl
// @version      1.2.9
// @description  🍓 一个按钮的事，一点都不费事
// @author       mefengl
// @match        http://*/*
// @match        https://*/*
// @match        https://translate.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=translate.google.com
// @require      https://cdn.staticfile.org/jquery/3.6.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    $(function () {
        let origin = window.location.origin;
        // if origin end with '.translate.goog', then return
        if (origin.endsWith('.translate.goog')) {
            return;
        }
        // change '.' in url to '-'
        origin = origin.replace(/\./g, '-');
        // append '.translate.goog' to origin
        origin = origin + '.translate.goog';

        let pathname = window.location.pathname;
        // append '?_x_tr_sl=auto&_x_tr_tl=zh-CN' to pathname
        pathname = pathname + '?_x_tr_sl=auto&_x_tr_tl=zh-CN';

        // combine origin and pathname
        let url = origin + pathname;

        // create a button
        const $button = $('<button>翻译网页</button>');
        // click to change url
        $button.click(function () {
            window.location.href = url;
        });
        // set button style
        let hide_right = "-120px";
        // if title contains Chinese, then make button less visible
        if (document.title.match(/[\u4e00-\u9fa5]/)) {
            hide_right = "-130px";
        }
        $button.css({
            'position': 'fixed',
            'width': '140px',
            'top': '120px',
            'right': hide_right,
            'z-index': '999999',
            'background-color': '#4285f4',
            'color': '#fff',
            'opacity': '0.8',
            'border': 'none',
            'border-radius': '4px',
            'padding': '10px 16px',
            'font-size': '18px',
            'cursor': 'pointer',
            "textShadow": "1px 1px 2px black",
        });
        // hover to show, and hide when not hover
        $button.hover(function () {
            $(this).stop().animate({
                right: '-10px'
            }, 200);
        }, function () {
            $(this).stop().animate({
                right: hide_right
            }, 200);
        });
        // append button to body
        $('body').append($button);
    })
})();
