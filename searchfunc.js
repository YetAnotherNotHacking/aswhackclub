document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const searchInput = document.querySelector('.search-input');
    const guideList = document.querySelector('.guide-list');
    let guides = [];

    // Fetch guides from JSON file
    fetch('/guides.json')
        .then(response => response.json())
        .then(data => {
            guides = data.guides;
            renderGuides(guides);
        });

    // Toggle dropdown
    dropdown.addEventListener('mouseenter', () => {
        dropdownContent.classList.add('show');
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdownContent.classList.remove('show');
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredGuides = guides.filter(guide => 
            guide.title.toLowerCase().includes(searchTerm) ||
            guide.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        renderGuides(filteredGuides);
    });

    function renderGuides(guidesToRender) {
        guideList.innerHTML = guidesToRender
            .map(guide => `
                <a href="${guide.path}" class="guide-item">
                    ${guide.title}
                </a>
            `).join('');
    }
});
