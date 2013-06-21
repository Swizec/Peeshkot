// I dunno why this won't work if I move it to a separate file (.js won't even load)
;(function($) {
    // adds `:attrContains("attr|value")` filter for CSS selectors
    // The filter [attr*="value"] is case sensitive, this one is not.
    // Also note, that the filter can only be used once in a selector (could not find an elegant way to untangle zepto to make it work properly).
    $.extend($.expr[':'], {
        attrContains: function(idx, _, spec) {
            var opts = spec.split('|');
            var attr = $(this).attr(opts[0]);
            if (attr != null && attr.toLowerCase().indexOf(opts[1].toLowerCase()) > -1) return this;
        }
    });

    $.fn.unique = function() {
        var that = this;
        return this.filter(function(idx) {
            return that.indexOf(this) == idx;
        });
    };
})(Zepto);

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
                   , '#cow_overlay_inside'
                   ].join(','),
        keywords = [ 'cookie'
                   , 'piskot'
                   , 'piškot'
                    ].map(function(keyword) {
                        return ['div:attrContains("id|' + keyword + '")', 'div:attrContains("class|' + keyword + '")'];
                    }),
        // Hehe, finance.si :) (this will prevent clicking on opt-out buttons)
        falsePositives = [ '#no-more-cookies' ].join(',');

    // `combined` will be a collection of elements matched by `selector` and ones matched by :attrContains("attr|value") filter
    // NB: this is a hack, because :attrContains only works once in a selector
    var combined = $(selector);
    $.map(Array.prototype.concat.apply([], keywords), function(keyword, index) {
        var gen = $(keyword);
        combined = combined.concat(gen);
    });

    callback($(combined).unique().not($(falsePositives)));
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
                          , 'img[src*="cookies_button"]'].join(','),
        buttonTextRe = new RegExp("Ok|V redu|Accept|Razumem|I agree|Dovoli|Seznanjen|Shrani|(?:se )?strinjam(?: se)?|spreje?m[ai]", "i"),
        buttonNodes = [ 'a'
                      , 'button'].join(','),
        button = notices.find(buttonSelectors);

    if (button && button.length) {
        if (button.length === 1) {
            return button;
        }
        return $.map(button, function (item) {
            var $item = $(item);
            if (buttonTextRe.test($.trim($item.text())))
                return $item;
        });
    }

    var nodes = notices.find(buttonNodes);
    if (!nodes || !nodes.length) {
        return [];
    }
    return $.map(nodes, function (item) {
        var $item = $(item);
        if (buttonTextRe.test($.trim($item.text())))
            return $item;
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
