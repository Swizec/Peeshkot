chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
	    clearInterval(readyStateCheckInterval);
            
            findNotices(handleNotices);
	}
    }, 10);
});

function findNotices(callback) {
    var selector = "#allow_cookies_container,#cookieGuardMsg,.cc-cookies";

    callback($(selector));
}

function handleNotices(notices) {
    var allowSelector = ".cc-cookie-accept,#authoriseCookies";

    // click allow buttons
    notices.find(allowSelector).click();

    //notices.css("display", "none");
}
