// @flow

export function getJSONFile(uri: string) {
    return fetch(uri, {
        mode: 'no-cache',
        mode: 'cors'
    }).then(res => res.json());
}
