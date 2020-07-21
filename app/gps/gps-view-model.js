const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");

function GpsViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Gps");

    const viewModel = observableModule.fromObject({});

    return viewModel;
}

module.exports = GpsViewModel;
