async function loadNews() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/peshk0v/TG-chizn_razraba/refs/heads/main/dbForSLNEWS.json');
        const news = await response.json();
        
        const newsContainer = document.createElement('div');
        newsContainer.className = 'news-container';
        
        news.reverse().forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            
            const newsHeader = document.createElement('div');
            newsHeader.className = 'news-header';
            
            const title = document.createElement('div');
            title.className = 'news-title';
            title.textContent = item.title;
            
            const date = document.createElement('div');
            date.className = 'news-date';
            date.textContent = item.date;
            
            newsHeader.appendChild(title);
            newsHeader.appendChild(date);
            
            const text = document.createElement('div');
            text.className = 'news-text';
            text.innerHTML = item.text;
            
            newsItem.appendChild(newsHeader);
            newsItem.appendChild(text);
            
            if (item.image) {
                const image = document.createElement('img');
                image.className = 'news-image has-image';
                image.src = item.image;
                image.alt = item.title;
                newsItem.appendChild(image);
            }
            
            newsContainer.appendChild(newsItem);
        });
        
        const newsSection = document.querySelector('.news-section');
        newsSection.innerHTML = '';
        newsSection.appendChild(newsContainer);
    } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
        const newsSection = document.querySelector('.news-section');
        newsSection.innerHTML = '<h2 style="color: #ff69b4">Ошибка при загрузке новостей</h2>';
    }
}

document.addEventListener('DOMContentLoaded', loadNews);
