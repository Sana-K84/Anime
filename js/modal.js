const modal = () => {
    const modal = document.querySelector('.search-model');
    const modalBtn = document.querySelector('.icon_search');
    const modalClose = modal.querySelector('.search-close-switch');
    const searchInput = modal.querySelector('#search-input');
    const wrapper = modal.querySelector('.search-model-result');

    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '500px';

    const renderFunc = (items) => {

        wrapper.innerHTML = '';
        items.forEach(el => {
            wrapper.insertAdjacentHTML('afterbegin', `
            <a class="pt-2" href="/anime-details.html?itemId=${el.id}" target="_blank">${el.title}</a>
            `
            )
        })
    }

    const searchFunc = (searchStr) => {

        fetch('https://anime-f9cc3-default-rtdb.firebaseio.com/anime.json')
            .then((response) => {
                return response.json()
            })
            .then(data => {

                const filteredData = data.filter(el => {
                    return el.title.toLowerCase().includes(searchStr.toLowerCase()) || el.description.toLowerCase().includes(searchStr.toLowerCase())
                })
                renderFunc(filteredData.slice(0, 5));


            })
    }


    modalBtn.addEventListener('click', () => {
        modal.classList.add('active')
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active')
        searchInput.value = '';
        wrapper.innerHTML = '';
    });

    searchInput.addEventListener('input', (ev) => {
        searchFunc(ev.target.value)
    });
}

modal();