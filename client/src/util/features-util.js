const FEATURES = [
    'duration_ms',
    'key',
    'mode',
    'time_signature',
    'acousticness',
    'danceability',
    'energy',
    'instrumentalness',
    'liveness',
    'loudness',
    'speechiness',
    'valence',
    'tempo'
];

const cumulativeSumArray = (array, index) => {
    if (index <= 0)
        return [0];

    const prevIndexOld = array[index - 1];
    const sumArray = cumulativeSumArray(array, index - 1);

    return [...sumArray, sumArray[index - 1] + prevIndexOld];
};

const getDurationArray = audioFeatures => {
    const durationArray = audioFeatures['duration_ms'];
    return cumulativeSumArray(durationArray, durationArray.length - 1);
};

export default {
    FEATURES,
    getDurationArray,
    prepareScatterData: (audioFeatures, xType, feature) => {
        const featuresArray = audioFeatures[feature];

        if (featuresArray.length === 0)
            return [];

        if (xType === 'duration_ms') {
            const durationArray = getDurationArray(audioFeatures);
            return durationArray.map((x, index) => ({ x, y: featuresArray[index] }));
        }

        return featuresArray.map((y, x) => ({ x: x + 1, y }));
    }
};