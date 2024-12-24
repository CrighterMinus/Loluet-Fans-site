// Function to insert a header dynamically
function insertHeader(accountName) {
    const headerContainer = document.querySelector('#header-container'); // Target the header container
    if (!headerContainer) {
        console.error('Container with ID "header-container" not found!');
        return;
    }

    // Clear any existing header
    headerContainer.textContent = '';

    // Create a new header element
    const header = document.createElement('h2');
    header.classList.add('dynamic-header');
    header.textContent = `${accountName} Tweets:`;

    // Append the header to the header container
    headerContainer.appendChild(header);
}

// Add event listeners to account switcher buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.switch-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const accountName = button.textContent.trim(); // Use button text as account name
            insertHeader(accountName); // Insert header
        });
    });
});

