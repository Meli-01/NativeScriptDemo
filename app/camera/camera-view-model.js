const observableModule = require("tns-core-modules/data/observable");
// const camera = require("nativescript-camera");
const SelectedPageService = require("../shared/selected-page-service");

function CameraViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Camera");

    const viewModel = observableModule.fromObject({});

    return viewModel;
}

module.exports = CameraViewModel;
