document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();
    fillTable(data);
    const fresh = document.querySelector('button#fresh') as HTMLElement;
    fresh.addEventListener('click', async () => {
        const tb: HTMLElement = document.querySelector('#table_body') as HTMLElement;
        tb.innerHTML = 'loading...';
        const data = await fetchData();
        fillTable(data);
    });
});

function fillTable(data: object[]) {
    const tb: HTMLElement = document.querySelector('#table_body') as HTMLElement;
    tb.innerHTML = '';
    for (const iter of data) {
        let tr = document.createElement('tr');
        for (const [key, value] of Object.entries(iter)) {
            let td = document.createElement('td');
            td.innerHTML = value;
            tr.appendChild(td);
        }
        tb.appendChild(tr);
    }
}

async function fetchData () {
    return await fetch('http://localhost:3000/category', {
        method: 'GET'
    })
    .then((res) => {
        return res.json()
    });
}