const title = document.querySelector('#task-title');
const cont = document.querySelector('.cont');
const btn = document.querySelector('#get-res');
const prompt = document.querySelector('#prompt');

const getData = async (url, list) => {
    let res = await fetch(url);
    res = await res.json();
    res.forEach(el => list.push(el));
};

const check = (data) => {
    let stAnswers = document.querySelectorAll('.ans');
    let result = true;
    for (let i = 0; i < 5; i++){
        if (stAnswers[i].value !== data[i].answer) result = false;
    }
    if (result) {
        document.querySelector('#task').innerHTML = `
        <img src="assets/formula.PNG" class="res-img">
        `;
    }
    else {
        prompt.textContent = 'Есть неверные ответы. Проверь себя и повтори попытку';
        prompt.classList.remove('hidden');
        setTimeout(() => {
            prompt.classList.add('hidden');
        }, 3000);
    }
};

let data = [];
await getData('db/data.json', data);
let thisData = [];
let src = '';
if (document.location.search == '?d=a'){
    title.textContent = 'Отдел архитектуры';
    src = 'architect';
    thisData = data[0];
}
else if (document.location.search == '?d=d'){
    title.textContent = 'Отдел дизайна';
    src = 'design';
    thisData = data[1];
}
else {
    title.textContent = 'Отдел непонимания';
    document.querySelector('#task').innerHTML = `Мы не понимаем, куда вы пришли`;
}
console.log(data);
console.log(thisData);

let carts = '';
for (let i = 0; i < 5; i++){
    carts += `
        <div class="cart">
            <img src="assets/${src}/${thisData[i].capture}" class="cart-img">
            <label>${thisData[i].label}</label>
            <input placeholder="Введи ответ" class="ans">
        </div>
    `;
}
cont.innerHTML = carts;

btn.addEventListener('click', () => {check(thisData);});