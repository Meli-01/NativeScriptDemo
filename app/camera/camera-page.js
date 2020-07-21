const app = require("tns-core-modules/application");
const camera = require("nativescript-camera");
const imagepicker = require("nativescript-imagepicker");

const CameraViewModel = require("./camera-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new CameraViewModel();
}

function onTakePictureTap(args) {
    const page = args.object;
    camera.requestPermissions().then(() => {
        camera.takePicture({
            width: 320,
            height: 240,
            keepAspectRatio: true,
            saveToGallery: false,
            allowsEditing: false
        }).then((imageAsset) => {
                page.bindingContext.set("imageSrc", imageAsset);
            },
            (err) => {
                console.log(`Error -> ${err.message}`);
            });
    }, () => page.bindingContext.set("errorMessage", "Permissions rejected."));
}

function onOpenGalleryTap(args) {
    const page = args.object;
    const context = imagepicker.create({ mode: "single" });
    context.authorize()
        .then(() => {
            page.bindingContext.set("imageSrc", null);

            return context.present(); // present image picker
        })
        .then((selection) => {
            page.bindingContext.set("imageSrc", selection.length > 0 ? selection[0] : null);
        }).catch((e) => {
        page.bindingContext.set("errorMessage", "An error occurred.");
    });
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onTakePictureTap = onTakePictureTap;
exports.onOpenGalleryTap = onOpenGalleryTap;
