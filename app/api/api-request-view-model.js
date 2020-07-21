const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function ApiRequestViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("API");

    const viewModel = observableModule.fromObject({
        description: "Weather: ",
        temp: "Temperature: ",
        humidity: "Humidity: ",
        windSpeed: "Wind Speed: "
    });

    return viewModel;
}

module.exports = ApiRequestViewModel;
