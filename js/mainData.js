const mainData = () => {

    fetch('https://anime-f9cc3-default-rtdb.firebaseio.com/anime.json')
        .then((response) => {
            return response.json()
        })
        .then(data => console.log(data.anime))
}

mainData();