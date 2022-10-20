// ==UserScript==
// @name         谷歌网页翻译
// @namespace    https://github.com/mefengl
// @version      1.3.3
// @description  🍓 一个按钮的事，一点都不费事
// @author       mefengl
// @match        http://*/*
// @match        https://*/*
// @match        https://translate.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=translate.google.com
// @require      https://cdn.staticfile.org/jquery/3.6.1/jquery.min.js
// @grant        none
// @license MIT
// ==/UserScript==

(function () {
    'use strict';
    $(function () {
        let origin = window.location.origin;
        // if origin end with '.translate.goog'
        // then return
        if (origin.endsWith('.translate.goog')) {
            // TODO: This should be an option that can be turned on
            // move down the body and header
            $("body").css({ "padding-top": "56px" });
            $("header").css({ position: "fixed", top: 56 });
            // TODO: Auto hide the header
            // scroll down to hide the header
            // scroll up to show the header
            // because two header is too much...
            return;
        }
        // change '-' in origin to '--'
        origin = origin.replace(/-/g, '--');
        // change '.' in origin to '-'
        origin = origin.replace(/\./g, '-');
        // append '.translate.goog' to origin
        origin = origin + '.translate.goog';

        const pathname = window.location.pathname;

        let search = window.location.search;
        // combine '?_x_tr_sl=auto&_x_tr_tl=zh-CN' and search
        if (search) {
            search = search + '&_x_tr_sl=auto&_x_tr_tl=zh-CN';
        } else {
            search = '?_x_tr_sl=auto&_x_tr_tl=zh-CN';
        }

        // combine origin, pathname and search
        let url = origin + pathname + search;

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
