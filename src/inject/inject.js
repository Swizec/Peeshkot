chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            //findNotices(handleNotices);
        }
    }, 10);
});

function findNotices(callback) {
    // Thanks 2 https://raw.github.com/r4vi/block-the-eu-cookie-shit-list/master/filterlist.txt
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
                        , '#boxZgodaNaCookie'
                        , '#cookieMonsterWrapper'
                        , '#cookiePolicyPopup'
                        , '#fp_cookieMessageContainer'
                        , '#WP-cookie-info'
                        , '.cookieTooltip'
                        , 'div[class^="cookie-alert"]'
                        , 'div[id="ciasteczka"]'
                        , 'div[id="cookie-info"]'
                        , 'div[id="cookieInfoMsgWrapper"]'
                        , 'div[id="cookiepolicydiv"]'
                        , 'div[class^="pea_cook_wrapper"]'
                        , 'div[id="cookies-info"]'
                        , '#cookielaw'
                        , '#cookiewarn'
                        , '#cookiesMessageBanner'
                        , '#bbccookies'
                        , '.notification.cookie'
                        , '#cookiePolicy'
                        , '#fp_cookieMessageContainer'
                        , '#cookieBar'
                        , '.divCookieWarning'
                        , '#cookie-policy-container'
                        , '.footer-cookies-policy'
                        , '#cookieNotification'
                        , '#cookie-bar'
                        , '#noScriptCookies'
                        , '#block-cookie-info'
                        , '.cookie-message'
                        , '#cookieMessageWrapper'
                        , '#cookie-bar'
                        , '#bauerCookiePolicy'
                        , '#cookie-banner'
                        , '#cookielaw'
                        , '#fp_cookieMessageContainer'
                        , '#cookieBar'
                        , '#id_cookieconsent'
                        , '#cookiesInitialDialog'
                        , '#cookiesdirective'
                        , '.cookieBanner'
                        , '.cookieStandard'
                        , '#bauerCookiePolicy'
                        , 'img[src*="cookies_button"]' ].join(','),
        buttonText =  [ 'Ok'
                      , 'V redu'
                      , 'Accept'
                      , 'I agree'
                      , 'Se strinjam' ].join(' '),
        buttonNodes = [ 'a',
                      , 'button'].join(','),
        button = notices.find(buttonSelectors);

        if (button && button.length) {
            return button;
        }

        var nodes = notices.find(buttonNodes);
        if (!nodes || !nodes.length) {
            console.error('No nodes found');
            return [];
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
