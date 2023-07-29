const bgElements = () => {
    const elements = document.querySelectorAll('.set-bg');

    elements.forEach(element => {
        element.style.backgroundImage = `url(${element.dataset.setbg})`;
    });

    // for (let i = 0; i < elements.length; i++) {
    //     const src = elements[i].dataset.setbg;

    //     // elements[i].style.backgroundImage = 'url(' + src + ')';
    //     elements[i].style.backgroundImage = `url(${src})`;
    // }
}

bgElements();