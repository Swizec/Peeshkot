window.addEvent("domready", function ()
{
    var settings = new FancySettings(i18n.get("settings"), "../../icons/peeshkot48.png");

    var desc = settings.create(
    {
        "tab": i18n.get("exception"),
        "group": i18n.get("exception"),
        "name": "myDescription",
        "type": "description",
        "text": i18n.get("exceptionDesc")
    });

    var domain = settings.create(
    {
        "tab": i18n.get("exception"),
        "group": i18n.get("exception"),
        "name": "domain",
        "type": "text",
        "label": i18n.get("domain"),
        "text": i18n.get("domain")
    });
    var domainList = settings.create(
    {
        "tab": i18n.get("exception"),
        "group": i18n.get("exception"),
        "name": "ignoreDomains",
        "type": "multiListBox",
        "label": i18n.get("excludedDomains")
    });

    var btnAdd = settings.create({
        "tab": i18n.get("exception"),
        "group": i18n.get("exception"),
        "name": "btnAdd",
        "type": "button",
        "text": i18n.get("add")
    });
    var btnRemove = settings.create({
        "tab": i18n.get("exception"),
        "group": i18n.get("exception"),
        "name": "btnRemove",
        "type": "button",
        "text": i18n.get("remove")
    });

    settings.align([
        btnAdd,
        btnRemove
    ]);

    btnAdd.addEvent("action", function () {
        var host = domain.element.value;
        if (!isValidDomain(host))
            return;

        domainList.addOption(domain.element.value);
        domain.set("", false);
    });

    btnRemove.addEvent("action", function () {
        domainList.removeSelectedOption();
    });

    function isValidDomain(domain) {
        var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
        return domain.match(re);
    }

    /*
    // Option 1: Use the manifest:
    new FancySettings.initWithManifest(function (settings) {
        settings.manifest.myButton.addEvent("action", function () {
            alert("You clicked me!");
        });
    });*/
    
    // Option 2: Do everything manually:
    /*
    var settings = new FancySettings("My Extension", "icon.png");
    
    var username = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "username",
        "type": "text",
        "label": i18n.get("username"),
        "text": i18n.get("x-characters")
    });
    
    var password = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "password",
        "type": "text",
        "label": i18n.get("password"),
        "text": i18n.get("x-characters-pw"),
        "masked": true
    });
    
    var myDescription = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "myDescription",
        "type": "description",
        "text": i18n.get("description")
    });
    
    var myButton = settings.create({
        "tab": "Information",
        "group": "Logout",
        "name": "myButton",
        "type": "button",
        "label": "Disconnect:",
        "text": "Logout"
    });
    
    // ...
    
    myButton.addEvent("action", function () {
        alert("You clicked me!");
    });
    
    settings.align([
        username,
        password
    ]);
    */
});
