const categoriesData = () => {
    // dropdown menu
    const renderGanreList = (ganres) => {
        const dropdownBlock = document.querySelector('.header__menu .dropdown');

        ganres.forEach(ganre => {
            dropdownBlock.insertAdjacentHTML('beforeend', `
            <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
            `)

        });
    }
    // список
    const renderAnimeList = (array, ganres) => {
        const wrapper = document.querySelector('.product-page .col-lg-8');

        ganres.forEach(ganre => {
            const productBlock = document.createElement('div');
            const listBlock = document.createElement('div');
            const list = array.filter(item => item.tags.includes(ganre));
            listBlock.classList.add('row');
            productBlock.classList.add('mb-5')
            wrapper.append(productBlock);
            productBlock.insertAdjacentHTML('beforeend', `
            <div class="trending__product">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8">
                        <div class="section-title">
                            <h4>${ganre}</h4>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="btn__all">
                            <a href="/categories.html?ganre=${ganre}" class="primary-btn">View All<span class="arrow_right"></span></a>
                        </div>
                    </div>
            </div>`);
            list.forEach(item => {
                const tagsBlock = document.createElement('ul');
                item.tags.forEach(el => {
                    tagsBlock.insertAdjacentHTML('beforeend', `<li>${el}</li>`)
                })

                listBlock.insertAdjacentHTML('beforeend', `
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                        <a href="/anime-details.html?itemId=${item.id}">
                            <div class="product__item__pic set-bg" data-setbg="${item.image}">
                                <div class="ep">${item.rating} / 10</div>
                                <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                            </div>
                            <div class="product__item__text">
                                ${tagsBlock.outerHTML}
                                <h5>${item.title}</h5>
                            </div>
                        </a>
                    </div>
                </div>`)
            })
            productBlock.append(listBlock);
            wrapper.append(productBlock);
            wrapper.querySelectorAll('.set-bg').forEach(element => {
                element.style.backgroundImage = `url(${element.dataset.setbg})`;
            });
        })

    }

    const renderTopAnime = (array) => {
        const wrapper = document.querySelector('.filter__gallery');

        array.forEach(el => {
            wrapper.insertAdjacentHTML('beforeend',
                `
                <a href="/anime-details.html?itemId=${el.id}">
                    <div class="product__sidebar__view__item set-bg mix day years" data-setbg="${el.image}">
                        <div class="ep">${el.rating} /10</div>
                        <div class="view"><i class="fa fa-eye"></i> ${el.views}</div>
                        <h5>${el.title}</h5>
                    </div>
                </a>
                `
            )
        });
        wrapper.querySelectorAll('.set-bg').forEach(element => {
            element.style.backgroundImage = `url(${element.dataset.setbg})`;
        });
    }



    fetch('https://anime-f9cc3-default-rtdb.firebaseio.com/anime.json')
        .then(response => response.json())
        .then(data => {
            const ganres = new Set;
            const ganreParams = new URLSearchParams(window.location.search).get('ganre');

            data.forEach(el => ganres.add(el.ganre))

            renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));
            if (ganreParams) {
                renderAnimeList(data, [ganreParams]);
            } else {
                renderAnimeList(data, ganres);
            }

            renderGanreList(ganres);
        })

}
categoriesData();