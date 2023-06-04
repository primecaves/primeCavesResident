import _startCase from 'lodash/startCase';
export const getKeyValuePair = (data) => {
    const output = Object.entries(data).map(([key, value]) => ({ key, value: _startCase(value), title: _startCase(key) }));

    return output;
};
