chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            findNotices(handleNotices);
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
                   , '#cccwr'
                   , '#epbar'
                   , '#icanhascookie'
                   , '#cc-notification'
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
                   , '#cookie-compliance'
                   , '#id_cookieconsent'
                   , '#cookiesInitialDialog'
                   , '#cookiesdirective'
                   , '.cookieBanner'
                   , '.cookieStandard'
                   , '#bauerCookiePolicy'
                   , '.optanon-alert-box-wrapper'
                   , '.identity-noticebar'
                   , '.optanon-alert-box-wrapper'
                   ].join(','),
        keywords = [ 'cookie'
                   , 'piskot'
                   , 'piškot'
                    ].map(function(keyword) {
                        return 'div[class*="' + keyword + '"],div[id*="' + keyword + '"]';
                    }).join(',');

    callback($(selector + ',' + keywords));
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
                          , '#cookie-compliance-submit'
                          , '.cc-link'
                          , '#cctoggle'
                          , '#ichok'
                          , '.hide-bar'
                          , '.optanon-alert-box-close'
                          , '.cc-approve-button-thissite'
                          , '.continue'
                          , 'img[src*="cookies_button"]' ].join(','),
        buttonText =  [ 'Ok'
                      , 'V redu'
                      , 'Accept'
                      , 'Razumem'
                      , 'I agree'
                      , 'Dovoli piškotke'
                      , 'Sem seznanjen'
                      , 'Shrani'
                      , 'Se strinjam' ].join(' '),
        buttonNodes = [ 'a'
                      , 'button'].join(','),
        button = notices.find(buttonSelectors);

    if (button && button.length) {
        if (button.length === 1) {
            return button;
        }
        return $.map(button, function (item) {
            var $item = $(item),
                itemText = $.trim($item.text()),
                rText = new RegExp(itemText, "gi");

            if (rText.test(buttonText)) {
                return $item;
            }
        });
    }

    var nodes = notices.find(buttonNodes);
    if (!nodes || !nodes.length) {
        return [];
    }
    return $.map(nodes, function (item) {
        var $item = $(item),
            itemText = $.trim($item.text()),
            rText = new RegExp(itemText, "gi");

        if (rText.test(buttonText)) {
            return $item;
        }
    });
}

function handleNotices(notices) {
    chrome.runtime.sendMessage({foundNotices: notices.size()});

    var button = findButtons(notices);

    if (button && button.length) {
        $(button).click();
    } else {
        notices.hide()
               .css({ display: 'none' , visibility: 'hidden' });
    }
}
