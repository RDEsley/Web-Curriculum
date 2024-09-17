const backgrounds = ['background1.jpg', 'background2.jpg', 'background3.jpg'];
let currentIndex = 0;

setInterval(() => {
    document.body.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
    currentIndex = (currentIndex + 1) % backgrounds.length;
}, 5000); // Altera o background a cada 5 segundos
