import { getIdParameter, loadIntoForm } from '../helpers/http.js';
import { formObject } from '../helpers/form.js';

document.addEventListener('DOMContentLoaded', async () => {
    const id = getIdParameter();
    const category = await fetchCategory(id);
    const form = document.querySelector('form');
    loadIntoForm(form, category);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = formObject(form);
        formData['id'] = id;
        const data = JSON.stringify(formData);
        updateCategory(id, data);
    })
});



interface CategoryInterface {
    id: string;
    name: string;
    status: string;
    description: string;
}

async function fetchCategory(id: string): Promise<CategoryInterface> {
    return await fetch('http://localhost:3000/category/' + id, {
        method: 'GET'
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        alert('خطای سرور ، موردی یافت نشد !')
    });
}

function updateCategory(id: string, data: string) {
    fetch('http://localhost:3000/category/' + id, {
        method: 'PUT',
        body: data
    })
    .then((res) => {
        if (res.ok) {
            alert('با موفقیت ویرایش شد !');
        } else {
            alert('خطا ، عملیات انجام نشد !')
        }
    });
}


