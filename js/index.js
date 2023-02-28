const title = document.querySelector('#task-title');
const cont = document.querySelector('.cont');
const btn = document.querySelector('#get-res');
const prompt = document.querySelector('#prompt');

const check = (data) => {
    let stAnswers = document.querySelectorAll('.ans');
    let result = true;
    for (let i = 0; i < 5; i++){
        if (stAnswers[i].value !== data[i].answer) result = false;
    }
    if (result) {
        document.querySelector('#task').innerHTML = `
        <div class="img-box"><img src="assets/formula.PNG" class="res-img"></div>
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

const main = async () => {
    let res = await fetch('db/data.json');
    let data = await res.json();
    let thisData = [];
    let src = '';
    if (document.location.search == '?d=ld'){
        title.textContent = 'Отдел ландшафтного дизайна';
        src = 'land';
        thisData = data[0];
    }
    else if (document.location.search == '?d=di'){
        title.textContent = 'Отдел дизайна интерьера';
        src = 'flat';
        thisData = data[1];
    }
    else {
        title.textContent = 'Отдел непонимания';
        document.querySelector('#task').innerHTML = `Мы не понимаем, куда вы пришли`;
    }

    let carts = '';
    for (let i = 0; i < 6; i++){
        carts += `
            <div class="cart">
                <div class="img-box">
                    <img src="assets/${src}/${thisData[i].capture}" class="cart-img">
                </div>
                <div class="box">
                    <label>${thisData[i].label}</label>
                    <input placeholder="Введи ответ" class="ans">
                </div>
            </div>
        `;
    }
    cont.innerHTML = carts;

    btn.addEventListener('click', () => {check(thisData);});
};
main();