var pageMod = require("sdk/page-mod"),
    self = require("sdk/self"),
    tabs = require("sdk/tabs");

pageMod.PageMod({
    include: "*",
    contentScriptWhen: 'end',
    contentScriptFile: [self.data.url('zepto.min.js'), self.data.url('peeshkot.js')],
    contentURL: self.data.url('icons/peeshkot16.png'),
});
