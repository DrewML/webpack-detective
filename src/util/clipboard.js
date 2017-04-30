// @flow

export function copy(text: string): bool {
    const textArea = document.createElement('textarea');
    textArea.style.opacity = '0';
    textArea.style.position = 'fixed';
    textArea.value = text;

    // $FlowFixMe Never calling without a body, so don't care
    document.body.appendChild(textArea);
    textArea.select();

    const success = document.execCommand('copy');
    // $FlowFixMe Never calling without a body, so don't care
    document.body.removeChild(textArea);

    return success;
}
