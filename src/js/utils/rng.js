export const random = (min = 0, max = 1) => fxrand() * (max - min) + min;

export const randomInt = (min = 0, max = 1) => Math.floor(fxrand() * (max - min + 1)) + min;

// Returns a random entry for the provided array.  All choices are equal probability
export const randomChoice = (array) => array[Math.floor(random(array.length))];

export const randomChance = (percent) => random() > 1 - percent;

export const randomizeArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};