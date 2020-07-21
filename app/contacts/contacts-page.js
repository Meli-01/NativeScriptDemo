const app = require("tns-core-modules/application");
const contactsLite = require("nativescript-contacts-lite");
const ContactsViewModel = require("./contacts-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new ContactsViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function loadContacts(args) {
    console.log("loadContacts tapped");
    const page = args.object;
    contactsLite.getContacts(["display_name"]).then((result) => {
        const contactList = [];
        result.forEach((item) => contactList.push({ name: item.display_name }));
        page.bindingContext.set("contactList", contactList);
    }, (e) => {
        page.bindingContext.set("errorMessage", "Error loading contacts!");
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.loadContacts = loadContacts;
