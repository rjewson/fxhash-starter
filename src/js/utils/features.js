import { random } from "./rng";

export const FX_Features = {};

export function addFeature(featureDescription, featureKeyName, featureDisplayValues, propabilities, values, report = true) {
    let totalPropabilities = 0;
    let undefinedProbabilities = [];

    propabilities.forEach((p, i) => {
        if (p > 0) {
            // Sum up the total for the defined probabilities
            totalPropabilities += p;
        } else {
            // If no probabilitiy is defined (0) the add it to the bucket to be evenly distributed
            undefinedProbabilities.push(i);
        }
    });

    if (totalPropabilities > 1) {
        throw "Sum of propabilities exceeds 100%.";
    }

    if (totalPropabilities < 0.9999999) {
        // 0.9999999 to avoid rounding errors
        if (undefinedProbabilities.length === 0) {
            throw "Cannot cover all propabilities.";
        }
        // Distribute the unallocated probability evenly across the undefined feature values
        const remainingPropShare = (1 - totalPropabilities) / undefinedProbabilities.length;
        undefinedProbabilities.forEach((i) => {
            propabilities[i] = remainingPropShare;
        });
    }

    const chance = random(0, 1);
    let startPercent = 0;
    let choice = -1;
    for (let i = 0; i < propabilities.length; i++) {
        const endPercent = startPercent + propabilities[i];
        if (chance >= startPercent && chance < endPercent) {
            choice = i;
            break;
        }
        startPercent = endPercent;
    }
    if (report && window.$fxhashFeatures) {
        window.$fxhashFeatures[featureDescription] = featureDisplayValues[choice];
    }

    // Save the feature (code) value to the features object for easy retrieval
    FX_Features[featureKeyName] = values[choice];

    // Return the value to direct use
    return values[choice];
}
