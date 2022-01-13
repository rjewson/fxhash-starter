window.$fxhashFeatures = {};
import p5 from "p5";
import { addFeature, FX_Features } from "./utils/features";

const entry = (p) => {

    p.setup = () => {
        // Define a feature accessable later with 'fx_features["bgcolour"]'
        // This will be written to the console in a table for easy debugging.
        addFeature(
            // The feature name shown in FXHash
            "Background Colour",
            // Key name you use to fetch value e.g. fx_features[bgcolour];
            "bgcolour",
            // Friendly display names of the selected value, shown in FXHash
            ["Red", "Green", "Blue"],
            // Probabilities of each value.  If set to 0, the reamining probability will be equaly divided
            // In this example Red Green and Blue all have 33.33333% chance.
            // To use set to fractional percentage e.g. 50% would be 0.5
            // It best practice to define the percetages of the all the values apart from the last, leave that as 0
            // to cover the remaining range.  Bad ranges will result in exceptions.
            [0, 0, 0],
            // The aactual value you will get, and use in your code
            [p.color("#ff0000"), p.color("#00ff00"), p.color("#0000ff")]
        );

        // Write the feature to the console
        console.table(window.$fxhashFeatures);

        p.createCanvas(1000, 1000);

        console.log(`Pixel density = ${p.pixelDensity()}`);
    };

    p.draw = () => {
        // Drawing magic here...

        // Example of fetching a feature with the key "bgcolour"
        p.background(FX_Features["bgcolour"]);
    };

    p.windowResized = () => {};

};

const p5_instance = new p5(entry);
