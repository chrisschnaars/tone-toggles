const utils = {
    getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    sortNumber(a, b) {
        return a - b;
    },

    calcDelay(bpm) {
        const delay = 60000 / bpm;
        return delay;
    },
};

export default utils;
