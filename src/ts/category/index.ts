import { deleteHttpData } from '../helpers/http.js';

document.addEventListener('DOMContentLoaded', async () => {
    await freshData();
    const fresh = document.querySelector('button#fresh') as HTMLElement;
    fresh.addEventListener('click', async () => {
        await freshData();
    });
});

async function freshData() {
    const tb: HTMLElement = document.querySelector('#table_body') as HTMLElement;
    tb.innerHTML = 'loading...';
    const data = await fetchData();
    fillTable(data);
}

function fillTable(data: CategoryInterface[]) {
    const tb: HTMLElement = document.querySelector('#table_body') as HTMLElement;
    tb.innerHTML = '';
    data.forEach((category) => {
        let tr = document.createElement('tr');
        ['id', 'name', 'description', 'status'].forEach((key) => {
            let td = document.createElement('td');
            td.innerHTML = category[key];
            tr.appendChild(td);
        });
            let td = document.createElement('td');
            /* start edit button */
            let a = document.createElement('a');
            a.href = '/category/edit/?id='+category.id;
            a.innerHTML = 'ویرایش';
            td.appendChild(a);
            /* end edit button */
            /* start edit button */
            let del = document.createElement('button');
            del.className = 'delete_button';
            del.setAttribute('data-link', 'http://localhost:3000/category/'+category.id);
            del.addEventListener('click', () => {
                deleteHttpData(del.getAttribute('data-link'))
                .then((res) => {
                    res.ok ? alert('پاک شد !') : alert('خطایی رخ داد !');
                    freshData();
                });
            });
            del.innerHTML = 'حذف';
            td.appendChild(del);
            /* end edit button */
            /* add virtual td to tr */
            tr.appendChild(td);
        tb.appendChild(tr);
    });
    // for (const iter of data) {
    //     let tr = document.createElement('tr');
    //     for (const [key, value] of Object.entries(iter)) {
    //         let td = document.createElement('td');
    //         td.innerHTML = value;
    //         tr.appendChild(td);
    //     }
    //     tb.appendChild(tr);
    // }
}

interface CategoryInterface {
    id: string;
    name: string;
    status: string;
    description: string;
}

async function fetchData(): Promise<CategoryInterface[]> {
    return await fetch('http://localhost:3000/category', {
        method: 'GET'
    })
    .then((res) => {
        return res.json()
    });
    // const res = await fetch('http://localhost:3000', {
    //     method: 'GET'
    // });
    // const data: CategoryInterface[] = await res.json();
    // return data;
}