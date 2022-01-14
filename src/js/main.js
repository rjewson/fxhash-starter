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
            // The actual value you will get, and use in your code
            [p.color("#ff0000"), p.color("#00ff00"), p.color("#0000ff")]
        );

        // Another example.  White has 50% chance, grey has 30% chance and black has the remainder, 20% chance
        // As you can see, you dont need to (and should not) define the probability for the last item
        addFeature(
            "Foreground Colour",
            "fgcolour",
            ["white","grey","black"],
            [0.5,0.3,0],
            [p.color(255), p.color(128), p.color(0)]
        )

        // Write the feature to the console
        console.info("FXHash features:");
        console.table(window.$fxhashFeatures);

        p.createCanvas(1000, 1000);

        // The variable DEVMODE is set to TRUE when runing in development mode.
        // When the release build is made, its set to FALSE.
        // In this example the console.log will not run when deployed to FXHash
        if (DEVMODE) {
            console.log(`Pixel density = ${p.pixelDensity()}`);
        }

        const image = new Image();
        image.src = "images/fxhash.png";
    };

    p.draw = () => {
        // Example of fetching a feature with the key "bgcolour"
        p.background(FX_Features["bgcolour"]);

        // Drawing magic here...

        
    };

    p.windowResized = () => {};

};

const p5_instance = new p5(entry);
