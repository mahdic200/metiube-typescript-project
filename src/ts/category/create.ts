document.addEventListener('DOMContentLoaded', () => {
    /* creating formObject */
    const form: HTMLFormElement = document.querySelector('form')! as HTMLFormElement;
    let formData = new FormData(form);
    let formObject = {};
    for (const [key, value] of formData.entries()) {
        formObject[key] = value;
    }

    /* handling form submit */
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/category", {
            method: "POST",
            body: JSON.stringify(formObject),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            if (res.ok) {
                console.log(res.statusText)
            } else {
                console.error(res.statusText)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    });
});