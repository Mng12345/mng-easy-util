export const mapObject = (obj, extractor) => {
    const keys = Object.keys(obj);
    return keys.map(extractor);
};
