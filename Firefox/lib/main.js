var pageMod = require("page-mod"),
    self = require("self"),
    tabs = require("tabs");

pageMod.PageMod({
    include: "*",
    contentScriptWhen: 'end',
    contentScriptFile: [self.data.url('zepto.min.js'), self.data.url('peeshkot.js')],
    contentURL: self.data.url('icons/peeshkot16.png'),
});
