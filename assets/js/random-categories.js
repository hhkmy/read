(function() {
    // Fisher-Yates shuffle algorithm
    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }

    function renderRandomCategories() {
    const container = document.getElementById('random-categories-container');
    if (!container || !window.allCategoriesData || window.allCategoriesData.length === 0) {
        container.innerHTML = `
        <div class="col-span-6 mx-auto rounded p-3 text-center font-semibold relative overflow-hidden bg-gray-200 dark:bg-gray-700 w-full">
            <span class="relative text-gray-800 dark:text-gray-100 drop-shadow-md select-none">No categories found</span>
        </div>
        `;
        return;
    }

    // Shuffle and take first 12 categories
    const shuffledCategories = shuffleArray([...window.allCategoriesData]);
    const selectedCategories = shuffledCategories.slice(0, 12);

    let html = '';
    selectedCategories.forEach(category => {
        html += `
        <a href="${category.url}" class="rounded p-3 text-center font-semibold relative overflow-hidden bg-gray-200 dark:bg-gray-700 group hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
    <span class="relative text-gray-800 dark:text-gray-100 drop-shadow-lg select-none">${category.displayName.replace(/"/g, '')}</span>
        </a>
        `;
    });

    container.innerHTML = html;
    }

    // Run when DOM is loaded
    if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderRandomCategories);
    } else {
    renderRandomCategories();
    }
})();