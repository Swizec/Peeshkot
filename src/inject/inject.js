chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
	    clearInterval(readyStateCheckInterval);
            
            findNotices(handleNotices);
	}
    }, 10);
});

function findNotices(callback) {
    var selector = "#allow_cookies_container,#cookieGuardMsg,.cc-cookies,#huk_cookie_prefernce_panel,#cookiesWarning,#cookiewarning,#cookieok_bar";

    callback($(selector));
}

function handleNotices(notices) {
    var allowSelector = ".cc-cookie-accept,#authoriseCookies,.choice-agree,#EU_OPIN_CANCEL,#floaterAgree,#cookieok_check";

    // click allow buttons
    notices.find(allowSelector).click();

    // last resort
    notices.css("display", "none");
}
