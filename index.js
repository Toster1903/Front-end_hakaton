

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM полностью загружен и разобран");

    // Переключение вкладок на основе радиокнопок
    const tabRadios = document.querySelectorAll('input[name="tabs"]');

    tabRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
            const tabName = radio.id.replace('radio-', ''); // Получаем имя вкладки (gallery или upload)
            openTab(tabName);
        });
    });

    // Открыть вкладку "Галерея" по умолчанию
    openTab('gallery');

    // Обработчик для кнопки "Загрузка фото"
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            const fileInput = document.getElementById('file');
            if (fileInput) {
                fileInput.click();
            } else {
                console.error("Не удалось найти элемент с id 'file'");
            }
        });
    }

    // Обработчик для выбора файла и загрузки фото
    const fileInput = document.getElementById('file');
    if (fileInput) {
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const loader = document.getElementById('loader');
                loader.style.display = 'block';

                const reader = new FileReader();
                reader.onload = function(e) {
                    loader.style.display = 'none';

                    const title = prompt("Введите название для загружаемой фотографии:");
                    const description = prompt("Введите описание для загружаемой фотографии:");

                    if (title && description) {
                        addImageToGallery(e.target.result, title, description);
                    } else {
                        alert('Название и описание являются обязательными для добавления в галерею.');
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert('Пожалуйста, выберите файл.');
            }
        });
    }

    // Добавляем обработчик для закрытия модального окна
    const closeModal = document.getElementById('closeModal');
    const imageModal = document.getElementById('imageModal');
    if (closeModal && imageModal) {
        closeModal.addEventListener('click', () => {
            imageModal.style.display = 'none';
        });
    }

    // Закрытие модального окна при клике вне изображения
    window.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
});

// Функция для переключения вкладок
function openTab(tabName) {
    console.log(`Открытие вкладки: ${tabName}`);

    // Скрываем все вкладки
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach((content) => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    // Показываем выбранную вкладку
    const tabContent = document.getElementById(tabName);
    if (tabContent) {
        tabContent.style.display = 'block';
        tabContent.classList.add('active');
    }
}

// Функция для добавления изображения в галерею
function addImageToGallery(imageSrc, title, description) {
    const gallery = document.querySelector('.gallery');

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${imageSrc}" alt="${title}" class="card__image" tabindex="0">
        <div class="card__content">
            <p class="card__title">${title}</p>
            <p class="card__description">${description}</p>
        </div>
    `;

    // Добавляем событие клика для открытия изображения в новой директории
    const cardImage = card.querySelector('.card__image');
    if (cardImage) {
        cardImage.addEventListener('click', () => {
            const imageUrlEncoded = encodeURIComponent(imageSrc);
            const imageNameEncoded = encodeURIComponent(title);
            // Используем относительный путь для открытия viewImage.html
            const newUrl = `viewImage.html?src=${imageUrlEncoded}&name=${imageNameEncoded}`;
            window.open(newUrl, '_blank');
        });
    }

    gallery.appendChild(card);
}
