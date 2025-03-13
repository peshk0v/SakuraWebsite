// Функция для добавления анимации элементу
function animate(element, animation, delay = 0) {
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.animation = animation;
    }, delay);
}

// Функция для анимации новостей
function animateNewsItem(item, index) {
    const delay = index * 200;
    
    // Анимация карточки новости
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.animation = 'scaleIn 0.5s ease-out forwards';
        
        // Анимация внутренних элементов
        const title = item.querySelector('.news-title');
        const date = item.querySelector('.news-date');
        const text = item.querySelector('.news-text');
        const image = item.querySelector('.news-image');

        if (title) animate(title, 'slideInFromLeft 0.5s ease-out forwards');
        if (date) animate(date, 'slideInFromRight 0.5s ease-out forwards');
        if (text) animate(text, 'fadeIn 0.5s ease-out forwards', 300);
        if (image) animate(image, 'scaleIn 0.8s ease-out forwards', 500);
    }, delay);
}

// Функция для запуска всех анимаций
function startAnimations() {
    const header = document.querySelector('.main-header');
    const logo = document.querySelector('.logo');
    const menuItems = document.querySelectorAll('.main-nav ul li');
    const newsSection = document.querySelector('.news-section');
    const htmlSection = document.querySelector('.html-section');
    const newsItems = document.querySelectorAll('.news-item');
    const homeTitle = document.querySelector('#homePage h1');
    const homeText = document.querySelector('#homePage p');

    // Анимация шапки
    animate(header, 'slideInFromTop 1s ease-out');
    
    // Анимация логотипа
    animate(logo, 'fadeIn 1.5s ease-out');

    // Анимация пунктов меню
    menuItems.forEach((item, index) => {
        animate(item, `fadeIn 0.5s ease-out forwards`, 1200 + index * 200);
    });

    // Анимация основных секций
    animate(newsSection, 'slideInFromLeft 1s ease-out, glowPulse 3s infinite');
    animate(htmlSection, 'slideInFromRight 1s ease-out, glowPulse 3s infinite');

    // Анимация новостей
    newsItems.forEach(animateNewsItem);

    // Анимация контента главной страницы
    if (homeTitle) animate(homeTitle, 'slideInFromTop 1s ease-out forwards', 800);
    if (homeText) animate(homeText, 'fadeIn 1s ease-out forwards', 1200);
}

// Основной код загрузки
document.addEventListener('DOMContentLoaded', () => {
    // Скрываем весь контент
    const content = document.querySelector('.content');
    const header = document.querySelector('.main-header');
    
    content.style.display = 'none';
    header.style.display = 'none';

    // Инициализация начального состояния
    document.querySelectorAll('.news-item, .main-nav ul li, .news-title, .news-date, .news-text, .news-image')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.animation = 'none';
        });

    // Запускаем процесс загрузки
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        
        // Показываем контент
        content.style.display = 'flex';
        header.style.display = 'block';

        // Скрываем экран загрузки
        loading.classList.add('hidden');

        // Запускаем анимации
        setTimeout(startAnimations, 100);

        // Удаляем экран загрузки
        setTimeout(() => loading.remove(), 500);
    }, 1000);
});