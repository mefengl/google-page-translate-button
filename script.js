// ==UserScript==
// @name         谷歌网页翻译按钮
// @namespace    https://github.com/mefengl
// @version      1.1.2
// @description  一个按钮的事，一点都不费事
// @author       mefengl
// @match        http://*/*
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=translate.google.com
// @require      https://cdn.staticfile.org/jquery/3.6.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    $(function () {
        let origin = window.location.origin;
        // change '.' in url to '-'
        origin = origin.replace(/\./g, '-');
        // append '.translate.goog' to origin
        origin = origin + '.translate.goog';

        let pathname = window.location.pathname;
        // change '.' in pathname to '-'
        pathname = pathname.replace(/\./g, '-');
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
        $button.css({
            'position': 'fixed',
            'width': '140px',
            'top': '120px',
            'right': '-110px',
            'z-index': '999999',
            'background-color': '#4285f4',
            'color': '#fff',
            'opacity': '0.8',
            'border': 'none',
            'border-radius': '4px',
            'padding': '10px 16px',
            'font-size': '18px',
            'cursor': 'pointer'
        });
        // hover to show, and hide when not hover
        $button.hover(function () {
            $(this).stop().animate({
                right: '-10px'
            }, 200);
        }, function () {
            $(this).stop().animate({
                right: '-110px'
            }, 200);
        });
        // append button to body
        $('body').append($button);
    })
})();
