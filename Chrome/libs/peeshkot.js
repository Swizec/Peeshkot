(function () {
    var holderSelectors = ['#allow_cookies_container', '#cookieGuardMsg', '.cc-cookies', '.cookies-header', '#huk_cookie_prefernce_panel', '#cookies', '#cookie-law-wrapper', '#avcn_wrapperInner', '#cookiesWarning', '#cookiewarning', '#cookieok_bar', '#cccwr', '#epbar', '#icanhascookie', '#cc-notification', '#boxZgodaNaCookie', '#cookieMonsterWrapper', '#cookiePolicyPopup', '#fp_cookieMessageContainer', '#WP-cookie-info', '.cookieTooltip', 'div[class^="cookie-alert"]', 'div[id="ciasteczka"]', 'div[id="cookie-info"]', 'div[id="cookieInfoMsgWrapper"]', 'div[id="cookiepolicydiv"]', 'div[class^="pea_cook_wrapper"]', 'div[id="cookies-info"]', '#cookielaw', '#cookiewarn', '#cookiesMessageBanner', '#bbccookies', '.notification.cookie', '#cookiePolicy', '#fp_cookieMessageContainer', '#cookieBar', '.divCookieWarning', '#divCookie', '#cookie-policy-container', '.footer-cookies-policy', '#cookieNotification', '#cookie-bar', '#noScriptCookies', '#block-cookie-info', '.cookie-message', '#cookieMessageWrapper', '#cookie-bar', '#bauerCookiePolicy', '#cookie-banner', '#cookielaw', '#fp_cookieMessageContainer', '#cookieBar', '#cookie-compliance', '#id_cookieconsent', '#cookiesInitialDialog', '#cookiesdirective', '.cookieBanner', '.cookieStandard', '#bauerCookiePolicy', '.optanon-alert-box-wrapper', '.identity-noticebar', '.optanon-alert-box-wrapper', '#cookies-alert', '#cow_overlay_inside', '.cookiesNotice', '#cookiePolicyCW'].join(', '),
        buttonsSelectors = ['#epb-ok', '.cc-cookie-accept', '#authoriseCookies', '.choice-agree', '#EU_OPIN_CANCEL', '#floaterAgree', '#cookieok_check', '.iAgree', '.cookieAgree', '#cookie-compliance-submit', '.cc-link', '#cctoggle', '#ichok', '.hide-bar', '.optanon-alert-box-close', '.cookies-yes', '.cc-approve-button-thissite', '.continue', 'img[src*="cookies_button"]', '#avcn_agreeButton', '#cookieTermsagree', '#btncookie_ok', '.btncookie_ok', '.agree-button', '.cookieAccept'].join(', '),
        buttonText = ['Ok', 'V redu', 'Accept', 'Razumem', 'I agree', 'Dovoli piškotke', 'Sem seznanjen', 'Shrani', 'Strinjam se', 'Se strinjam', 'Da', 'Sprejemam', 'Nadaljuj', 'Yes, I agree', 'Sprejmi', 'Dovolim piškotke', 'Nadaljuj z branjem', 'Shrani nastavitve'],
        keywords = ['cookie', 'piskot', 'piškot' ],
        buttonNodes = ['a', 'button', 'input[type="submit"]', 'input[type="button"]'],
        domainSpecific = {
            'banka-koper.si': {node: '#LoggingCookie', button: '.button'}
        ,   'bankain.si': {node: '#LoggingCookie', button: '.button'}
        ,   'bolha.com': {node: '#cookiesWarning', button: '.iAgree'}
        ,   'nepremicnine.net': {node: '#cookieWarn', button: '#cookieTermsagree'}
        ,   'mojazaposlitev.si': {node: '#cookiePolicyCW', button: '.cookieAccept'}
        ,   'delo.si': {node: '#cboxWrapper', button: '#continue'}
        ,   'val202.si': {node: '#cookies', button: 'img[src*="cookies_button"]'}
        ,   'dnevnik.si': {node: '#cc-notification', button: '.cc-set-all'}
        ,   'izklop.com': {node: '#cc-notification', button: '#cc-approve-button-thissite'}
        ,   'had.si': {node: '#cc-notification', button: '#cc-approve-button-thissite'}
        ,   'podnapisi.net': {node: '.ui-dialog', button: '.ui-button'}
        ,   'avto.net': {node: '.ui-dialog', button: '#cookieTermsagree'}
        ,   'nlb.si': {node: '#cookies-alert', button: '.cookies-yes'}
        ,   'mercator.si': {node: '#_iCD', button: '.iCD_conf'}
        ,   'vreme.zurnal24.si': {node: '#cookie', button: '#cookiebtn'}
        ,   'dogaja.se': {node: '#npm', button: 'a'}
        ,   'rtvslo.si': {node: '#cookies', button: 'img[src*="cookies_button"]'}
        ,   'abanka.si': {node: '#divCookie', button: '#btncookie_ok'}
        ,   '24ur.com': {node: '#allow_cookies_container', button: '.choice-agree'}
        ,   'vizita.si': {node: '#allow_cookies_container', button: '.btn-primary'}
        ,   'zadovoljna.si': {node: '#allow_cookies_container', button: '.btn-primary'}
        ,   'moskisvet.com': {node: '#allow_cookies_container', button: '.btn-primary'}
        ,   'slovenskenovice.si': {node: '#cboxWrapper', button: '#continue'}
        ,   'mimovrste.com': {node: '.cc-cookies', button: '.cc-cookie-accept'}
        ,   'mobitel.si': {node: '.cc-cookies', button: '.cc-cookie-accept'}
        ,   'blog.siol.net': {node: '.cc-cookies', button: '.cc-cookie-accept'}
        ,   'kulinarika.net': {node: '.cc-cookies', button: '.cc-cookie-accept'}
        ,   'bizi.si': {node: '.cc-cookies', button: '.cc-cookie-accept'}
        ,   'oskarveliki.si': {node: '.cc-cookies', button: '.cc-cookie-accept'}
        ,   'radiostudent.si': {node: '#sliding-popup', button: '.agree-button'}
        ,   'najdi.si': {node: '.cc-cookies', button: '.cc-cookie-accept'}
        ,   'shrani.najdi.si': {node: '.cc-cookies', button: '.cc-cookie-accept'}
        ,   'zurnal24.si': {node: '#cookie_law_notice_container', button: '.agree_to_cookies'}
        ,   'finance.si': {node: '#cow_overlay_inside', button: '.buttonize:first-child'}
        ,   'ringaraja.net': {node: '.cookiesNotice', button: '#okNotice'}
        ,   'google.si': {node: '#epbar', button: '#epb-ok'}
        };


    function Peeshkot() {
        this.domainSpecific(domainSpecific);
        if (!this.holder && !this.button) {
            this.findHolder(holderSelectors, keywords);
            this.findButton(buttonsSelectors, buttonNodes, buttonText);
        }
        this.handleMyCookie();
    }
    Peeshkot.prototype.domainSpecific = function (selectors) {
        var hostname = window.location.hostname.replace(/www\./gi, ''),
            elements = selectors[hostname];

        if (elements) {
            this.holder = $(elements.node);
            this.button = $(elements.button, this.holder);
        }
    };
    Peeshkot.prototype.findHolder = function (selectors, words) {
        this.holder = this.validate($(selectors), words);
    };
    Peeshkot.prototype.findButton = function (selectors, nodes, words) {
        if (!this.holder) {
            return false;
        }
        var buttonsViaSelector = $(selectors, this.holder),
            buttonsViaNodes = $(nodes, this.holder),
            button;

        if (buttonsViaSelector.length) {
            button = this.validate(buttonsViaSelector, buttonText);
        }
        if (buttonsViaNodes.length && !button) {
            button = this.validate(buttonsViaSelector, buttonText);
        }
        this.button = $.isArray(button) && button[0] || button;
    };
    Peeshkot.prototype.validate = function (elements, words) {
        if (!elements.length) {
            return false;
        }
        if (elements.length === 1) {
            return this.validateSingleElement(elements, words) && elements;
        }
        var self = this,
            validElements = $.map(elements, function (element) {
                    if (self.validateSingleElement(element, words)) {
                        return element;
                    }
                });
        return validElements.length && validElements;
    };
    Peeshkot.prototype.validateSingleElement = function (element, words) {
        element = $(element);
        var elementText = element.text() || element.val(),
            trimmedText, isValid;

        if (!elementText) {
            return false;
        }
        trimmedText = $.trim(elementText).toLowerCase(),
        isValid = $.map(words, function(word) {
            var rText = new RegExp(word, "gi");
            if (rText.test(trimmedText)) {
                return word;
            }
        });
        return !!isValid.length;
    };
    Peeshkot.prototype.handleMyCookie = function () {
        this.button && this.button.click();
        this.holder && !this.button && this.holder.hide().css({ visibility: 'hidden', display: 'none' });
    };

    $(document).ready(function () {
        new Peeshkot();
    });
}());
