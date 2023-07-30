const modal = () => {
    const modal = document.querySelector('.search-model');
    const modalBtn = document.querySelector('.icon_search');
    const modalClose = modal.querySelector('.search-close-switch');
    const searchInput = modal.querySelector('#search-input');

    modalBtn.addEventListener('click', () => {
        // modal.style.display = 'block'
        modal.classList.add('active')
    })

    modalClose.addEventListener('click', () => {
        // modal.style.display = 'none'
        modal.classList.remove('active')
    })

    searchInput.addEventListener('input', (ev) => {
        console.log(ev.target.value)
    })
}

modal();