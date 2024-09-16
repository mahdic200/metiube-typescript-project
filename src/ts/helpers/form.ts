export function formObject(form: HTMLFormElement) {
    let formData = new FormData(form);
    let formObject = {};
    for (const [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    return formObject;
}