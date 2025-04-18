function setDefaultPage() {
    showPage('homePage');
}

async function showPage(pageId) {
    // Получаем текущую активную страницу
    const currentPage = document.querySelector('.tab-content.active');
    
    // Если есть активная страница, анимируем её исчезновение
    if (currentPage) {
        currentPage.style.animation = 'fadeOut 0.3s ease-out forwards';
        await new Promise(resolve => setTimeout(resolve, 300));
        currentPage.classList.remove('active');
        currentPage.style.animation = '';
    }
    
    // Показываем и анимируем новую страницу
    const newPage = document.getElementById(pageId);
    newPage.classList.add('active');
    newPage.style.opacity = '0';
    
    // Применяем разные анимации в зависимости от страницы
    switch(pageId) {
        case 'homePage':
            animateHomePage(newPage);
            break;
        case 'downloadPage':
            animateDownloadPage(newPage);
            break;
        case 'contactPage':
            animateContactPage(newPage);
            break;
    }
}

function animateHomePage(page) {
    page.style.animation = 'fadeIn 0.5s ease-out forwards';
    
    const title = page.querySelector('h1');
    const text = page.querySelector('p');
    
    if (title) {
        title.style.opacity = '0';
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.animation = 'slideInFromTop 0.8s ease-out forwards';
        }, 100);
    }
    
    if (text) {
        text.style.opacity = '0';
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.animation = 'fadeIn 0.8s ease-out forwards';
        }, 400);
    }
}

function animateDownloadPage(page) {
    page.style.animation = 'slideInFromRight 0.5s ease-out forwards';
    
    const elements = page.children;
    Array.from(elements).forEach((element, index) => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.animation = 'slideInFromRight 0.5s ease-out forwards';
        }, index * 200);
    });
}

function animateContactPage(page) {
    page.style.animation = 'scaleIn 0.5s ease-out forwards';
    
    const elements = page.children;
    Array.from(elements).forEach((element, index) => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.animation = 'fadeIn 0.5s ease-out forwards';
        }, index * 150);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Добавляем обработчики для кнопок навигации
    document.getElementById('home').addEventListener('click', () => showPage('homePage'));
    document.getElementById('download').addEventListener('click', () => showPage('downloadPage'));
    document.getElementById('contact').addEventListener('click', () => showPage('contactPage'));

    // Управление секциями на главной странице
    const sections = document.querySelectorAll('.home-section');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSection = 0;
    let isScrolling = false;

    // Функция для переключения секций
    function switchSection(index) {
        if (isScrolling) return;
        isScrolling = true;

        // Убираем активный класс у всех секций и точек
        sections.forEach(section => section.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Активируем нужную секцию и точку
        sections[index].classList.add('active');
        dots[index].classList.add('active');

        currentSection = index;

        // Предотвращаем слишком частую прокрутку
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // Обработчик прокрутки колесиком мыши
    document.getElementById('homePage').addEventListener('wheel', (event) => {
        if (isScrolling) return;

        if (event.deltaY > 0 && currentSection < sections.length - 1) {
            // Прокрутка вниз
            switchSection(currentSection + 1);
        } else if (event.deltaY < 0 && currentSection > 0) {
            // Прокрутка вверх
            switchSection(currentSection - 1);
        }
    });

    // Обработчик клика по точкам навигации
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            switchSection(index);
        });
    });

    // Обработчик свайпов для мобильных устройств
    let touchStartY = 0;
    const homePage = document.getElementById('homePage');

    homePage.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    homePage.addEventListener('touchmove', (e) => {
        if (isScrolling) return;

        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > 50) { // Минимальное расстояние для свайпа
            if (diff > 0 && currentSection < sections.length - 1) {
                // Свайп вверх
                switchSection(currentSection + 1);
            } else if (diff < 0 && currentSection > 0) {
                // Свайп вниз
                switchSection(currentSection - 1);
            }
        }
    });

    // Инициализация первой секции
    switchSection(0);
});