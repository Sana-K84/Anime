const detailData = () => {
    const preloder = document.querySelector('.preloder');
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
    const renderAnimeDetails = (array, itemId) => {
        const animeObj = array.find(el => el.id == itemId);
        const imageBlock = document.querySelector('.anime__details__pic');
        const viewsBlock = imageBlock.querySelector('.view');
        const titleBlock = document.querySelector('.anime__details__title h3');
        const subTitleBlock = document.querySelector('.anime__details__title span');
        const descriptionBlock = document.querySelector('.anime__details__text p');
        const widgetList = document.querySelectorAll('.anime__details__widget ul li');
        const breadcrumb = document.querySelector('.breadcrumb__links span');
        if (animeObj) {
            // imageBlock.style.backgroundImage = `url(${animeObj.image})`;
            imageBlock.dataset.setbg = animeObj.image
            document.querySelectorAll('.set-bg').forEach(el => {
                el.style.backgroundImage = `url(${el.dataset.setbg})`
            })

            viewsBlock.insertAdjacentHTML('beforeend', `
            <i class="fa fa-eye"></i> ${animeObj.views}
            `)

            titleBlock.textContent = animeObj.title;
            subTitleBlock.textContent = animeObj['original-title'];
            descriptionBlock.textContent = animeObj.description;

            widgetList[0].insertAdjacentHTML('beforeend', `
            <span>Date aired:</span>${animeObj.date}
            `);
            widgetList[1].insertAdjacentHTML('beforeend', `
            <span>Raiting:</span>${animeObj.rating}
            `);



            widgetList[2].insertAdjacentHTML('beforeend', `
            <span>Genre:</span>${animeObj.tags.join(', ')}
            `);
            breadcrumb.textContent = animeObj.ganre


            //setTimeout(() => 
            preloder.classList.remove('active')
            //, 500);
            // отключаем preloder когда получили все данные, клас active уже в верстке

        } else {
            console.log('аниме отсутствует')
        }
    }

    fetch('https://anime-f9cc3-default-rtdb.firebaseio.com/anime.json')
        .then(response => response.json())
        .then(data => {
            const ganres = new Set;
            const ganreParams = new URLSearchParams(window.location.search).get('itemId');

            data.forEach(el => ganres.add(el.ganre))

            if (ganreParams) {
                renderAnimeDetails(data, ganreParams);
            } else {
                console.log('аниме отсутствует')
            }

            renderGanreList(ganres);
        })


}
detailData();