document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const linkText = e.target.id;
            setPage(linkText);
        });
    });

    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        setPage('home');
    });
}); 