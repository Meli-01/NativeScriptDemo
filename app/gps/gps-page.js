const app = require("tns-core-modules/application");
const fromObject = require("tns-core-modules/data/observable").fromObject;
const geolocation = require("nativescript-geolocation");

function onNavigatingTo(args) {
    let errorMessage = "";

    const page = args.object;
    page.bindingContext = fromObject({
        buttonGetLocationTap: () => {
            geolocation.enableLocationRequest().then(() => {
                geolocation.getCurrentLocation({
                    desiredAccuracy: 3,
                    updateDistance: 10,
                    maximumAge: 20000,
                    timeout: 20000
                }).then((loc) => {
                    if (loc !== null) {
                        page.bindingContext.set("lat", loc.latitude.toString());
                        page.bindingContext.set("lon", loc.longitude.toString());
                        page.bindingContext.set("errorMessage", "");
                    }
                }, () => {
                    errorMessage = "Unable to load the data.";
                    page.bindingContext.set("errorMessage", errorMessage);
                });
            }, () => {
                errorMessage = "Requires permission to load the data.";
                page.bindingContext.set("errorMessage", errorMessage);
            });
        },
        lat: "",
        lon: "",
        errorMessage: ""
    });
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
