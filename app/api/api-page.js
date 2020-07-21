const app = require("tns-core-modules/application");
const ApiRequestViewModel = require("./api-request-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new ApiRequestViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function loadData(args) {
    const page = args.object;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Bern&lang=en&units=metric&APPID=your_key")
        .then((response) => response.json())
        .then((r) => {
            page.bindingContext.set("description", `Weather: ${r.weather[0].description.toString()}`);
            page.bindingContext.set("temp", `Temperature: ${r.main.temp} °C`);
            page.bindingContext.set("humidity", `Humidity: ${r.main.humidity} %`);
            page.bindingContext.set("windSpeed", `Wind Speed: ${r.wind.speed} m/s`);
        })
        .catch((e) => console.log(e));
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.loadData = loadData;
