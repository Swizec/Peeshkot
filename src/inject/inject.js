chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            //findNotices(handleNotices);
        }
    }, 10);
});

function findNotices(callback) {
    var selector = [ '#allow_cookies_container'
                   , '#cookieGuardMsg'
                   , '.cc-cookies'
                   , '.cookies-header'
                   , '#huk_cookie_prefernce_panel'
                   , '#cookies'
                   , '#cookiesWarning'
                   , '#cookiewarning'
                   , '#cookieok_bar'
                   , '#epbar'
                   , '#cc-notification'
                   ].join(',');

    callback($(selector));
}

function findButtons(notices) {
    var buttonSelectors = [ '#epb-ok'
                        , '.cc-cookie-accept'
                        , '#authoriseCookies'
                        , '.choice-agree'
                        , '#EU_OPIN_CANCEL'
                        , '#floaterAgree'
                        , '#cookieok_check'
                        , '.iAgree'
                        , '.cookieAgree'
                        , '.cc-link'
                        , 'img[src*="cookies_button"]' ].join(','),
        buttonText =  [ 'Ok'
                      , 'V redu'
                      , 'I agree'
                      , 'Se strinjam' ].join(' '),
        buttonNodes = [ 'a',
                      , 'button'].join(','),
        button = notices.find(buttonSelectors);

        if (button.length) {
            return button;
        }

        var nodes = notices.find(buttonNodes);
        if (!nodes.length) {
            console.error('No nodes found');
        }
        $.each(nodes, function (item) {
            var item = $(item),
                itemText = $.trim(item.text()),
                rText = new RegExp(itemText);

            if (rText.test(buttonText)) {
                return item;
            }
        });
}

function handleNotices(notices) {
    var button = findButtons(notices);

    if (button.length) {
        button.click();
    } else {
        notices.hide()
               .css({ display: 'none' , visibility: 'hidden' });
    }
}
