const mainData = () => {
    const renderAnimeList = (array, ganres) => {
        // console.log(array)
        // console.log(ganres)
    }
    const renderTopAnime = (array) => {
        const wrapper = document.querySelector('.filter__gallery');

        wrapper.innerHTML = '';
        array.forEach(el => {
            wrapper.insertAdjacentHTML('afterbegin',

                `<div class="product__sidebar__view__item set-bg mix day years" data-setbg="${el.image}">
                                    <div class="ep">${el.rating} /10</div>
                                    <div class="view"><i class="fa fa-eye"></i> ${el.views}</div>
                                    <h5><a href="/anime-details.html">${el.title}</a></h5>
                                </div>`

            )
        });
        wrapper.querySelectorAll('.set-bg').forEach(element => {
            element.style.backgroundImage = `url(${element.dataset.setbg})`;
        });

    }



    fetch('https://anime-f9cc3-default-rtdb.firebaseio.com/anime.json')
        .then((response) => {
            return response.json()
        })
        .then(data => {
            const ganres = new Set;
            renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));
            data.forEach(el => ganres.add(el.ganre))
            renderAnimeList(data, ganres);
        })
}

mainData();