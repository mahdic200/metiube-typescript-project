export function getUrlParameters() {
    /* method 1 */
    // let search_raw = window.location.search;
    // search_raw = search_raw.replace('?', '');
    // // console.log(search_raw);
    // let search = search_raw.split('&&');
    // // let parameters = search.map((item) => {
    // //     let [key, value] = item.split('=');
    // //     let result = {};
    // //     result[key] = value;
    // //     return result;
    // // });
    // let parameters = {};
    // search.forEach((item) => {
    //     let [key, value] = item.split('=');
    //     parameters[key] = value;
    // });
    // return parameters;
    
    /* method 2 */
    let url = window.location.href;
    let search_raw = url.split('?')[1];
    let search = search_raw.split('&&').map((item) => {
        return item.split('=');
    });
    let parameters = {};
    search.forEach(([key, value]) => {
        parameters[key] = value;
    });
    return parameters;
}

export function getIdParameter(): string {
    const parameters = getUrlParameters();
    if (parameters['id'] == undefined) {
        console.error('getUrlParameters : id in url parameters is undefined');
    }
    return parameters['id'];
}

export function loadIntoForm(form: HTMLFormElement, dataObject: any) {
    const formData = new FormData(form);
    formData.forEach((_, key) => {
        let input: HTMLInputElement = form.querySelector('[name=' + key + ']')
        input.value = dataObject[key];
    })
}

export function deleteHttpData(link: string) {
    return fetch(link, {
        method: 'DELETE'
    });
}


