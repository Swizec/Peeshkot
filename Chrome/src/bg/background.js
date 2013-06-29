// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.foundNotices > 0) {
          activate_page_action(sender);
      }else{
          chrome.pageAction.hide(sender.tab.id);
      }

      sendResponse();
  });

function activate_page_action(sender) {
    chrome.pageAction.setTitle({tabId: sender.tab.id,
                                title: chrome.i18n.getMessage("warnings_slain")});
    chrome.pageAction.show(sender.tab.id);
}

function ghetto_template(html, vars) {
    $(vars).map(function (key) {
        var regex = new RegExp("\{\{"+key+"\}\}", 'g');

        html = html.replace(regex, vars[key]);
    });

    return html;
}
