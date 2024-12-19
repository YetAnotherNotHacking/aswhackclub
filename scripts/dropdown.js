document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');

    // Toggle dropdown when clicking the trigger
    dropdownTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Prevent dropdown from closing when clicking inside
    document.querySelector('.dropdown-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}); 
