/**
 * 在 DOMContentLoaded 事件触发时运行，首先使用 chrome.tabs.query() 函数获取当前选中的选项卡的 URL，
 * 然后将其存储到 currentUrl 变量中，并在翻译按钮的 click 事件处理程序中使用该 URL 来构造要传递给 Google 翻译页面的 URL
 */
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentUrl = tabs[0].url;
        const translateButton = document.getElementById('translate-button');

        translateButton.addEventListener('click', function () {
            const translationMethod = document.getElementById('translation-method') || {};
            const isSameTab = translationMethod.value === "same-tab";

            if (isSameTab) {
                /**
                 * 如果用户选择 "直接跳转翻译"，我们通过 chrome.tabs.executeScript() 将 Google 翻译页面注入到当前页面中。
                 * 如果直接使用'chrome.tabs.update()'方法，则无法使用浏览器后退回到原页面
                 */
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: function (currentUrl) {
                        window.location.href = 'https://translate.google.com/translate?sl=auto&tl=zh-CN&u=' + currentUrl;
                    },
                    args: [currentUrl] // 传递给 func 的参数
                }, function () {
                    window.close();// 关闭popup弹窗
                });
            } else {
                /**
                 * 如果用户选择 "新标签页翻译"，则通过 chrome.tabs.create() 创建一个新标签页并加载翻译页面。
                 */
                const translateUrl = `https://translate.google.com/translate?sl=auto&tl=zh-CN&u=${currentUrl}`;
                chrome.tabs.create({ url: translateUrl }, function () {
                    window.close(); // 关闭popup弹窗
                });
            }
        });
    });
});
