document.addEventListener('DOMContentLoaded', () => {
    /* creating formObject */
    const form: HTMLFormElement = document.querySelector('form')! as HTMLFormElement;
    /* handling form submit */
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let data = formObject(form);
        fetch("http://localhost:3000/category", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            if (res.ok) {
                alert(res.statusText)
            } else {
                alert(res.statusText)
            }
        })
        .catch((err) => {
            alert(err)
        })
    });
});

function formObject(form: HTMLFormElement) {
    let formData = new FormData(form);
    let formObject = {};
    for (const [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    return formObject;
}