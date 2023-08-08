const categoriesDataLogin = () => {
    const renderGanreList = (ganres) => {
        const dropdownBlock = document.querySelector('.header__menu .dropdown');

        ganres.forEach(ganre => {
            dropdownBlock.insertAdjacentHTML('beforeend', `
            <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
            `)

        });
    }

    fetch('https://anime-f9cc3-default-rtdb.firebaseio.com/anime.json')
        .then(response => response.json())
        .then(data => {
            const ganres = new Set;
            data.forEach(el => ganres.add(el.ganre))
            renderGanreList(ganres);
        })

}
categoriesDataLogin();
