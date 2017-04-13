// @flow

export async function getJSONFile(uri: string) {
    const res = await fetch(uri, {
        mode: 'no-cache',
        mode: 'cors'
    });
    return res.json();
}
