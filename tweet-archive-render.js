// Container element to insert the nodes
const containerId = 'node-container'; // Set the ID of the container in your HTML

// Function to fetch and render the JSON data
function fetchAndRenderJSON(accountName) {
    const jsonFilePath = `tweet-data/${accountName}.json`; // JSON file named after the account

    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data for account: ${accountName}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`Container with ID "${containerId}" not found!`);
                return;
            }

            // Clear previous content
            container.innerHTML = '';

            // Populate the container with new content
            data.forEach(item => {
                // Create a wrapper div for each node
                const wrapper = document.createElement('div');
                wrapper.classList.add('node-wrapper');
                wrapper.setAttribute('data-id', item.id);
                wrapper.setAttribute('data-timestamp', item.timestamp);

                // Insert the raw HTML from the JSON
                wrapper.innerHTML = item['node-html'];

                // Append the wrapper to the container
                container.appendChild(wrapper);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Add event listeners to account switcher buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.switch-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const accountName = button.textContent.trim(); // Use button text as account name
            fetchAndRenderJSON(accountName);
        });
    });
});

