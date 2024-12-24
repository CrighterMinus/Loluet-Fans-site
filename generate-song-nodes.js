// Path to the JSON file
const jsonFilePath = 'songs-data.json';

// Function to generate nodes dynamically
function generateNodes() {
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('node-container');
            if (!container) {
                console.error('Container with ID "node-container" not found!');
                return;
            }

            // Clear any existing content
            container.innerHTML = '';

            // Create nodes for each song
            data.forEach(song => {
                const node = document.createElement('div');
                node.classList.add('song-node');

                // Apply "original" class if it's an original song
                if (song["Original/Cover"] === "Original") {
                    node.classList.add('original');
                }

                // Song title
                const title = document.createElement('h3');
                title.textContent = song["Name of Song"];
                node.appendChild(title);

                // Song metadata
                const metadata = document.createElement('p');
                metadata.innerHTML = `
                    <strong>Posted Under:</strong> ${song["Name Posted Under"] || "Unknown"}<br>
                    <strong>Date Available:</strong> ${song["Date Available"] || "Unknown"}<br>
                    <strong>Date Removed:</strong> ${song["Date Removed"] || "Unknown"}<br>
                    <strong>Type:</strong> ${song["Original/Cover"] || "Unknown"}
                `;
                node.appendChild(metadata);

                // Links
                const linksContainer = document.createElement('div');
                linksContainer.classList.add('links-container');

                if (song["Link to Main Post Location"] && song["Link to Main Post Location"] !== "unknown") {
                    const links = song["Link to Main Post Location"].split(',').map(link => link.trim());
                    links.forEach(link => {
                        const anchor = document.createElement('a');
                        anchor.href = link;
                        anchor.textContent = link;
                        anchor.target = '_blank';
                        linksContainer.appendChild(anchor);
                    });
                } else {
                    const noLinks = document.createElement('p');
                    noLinks.textContent = 'No links available.';
                    linksContainer.appendChild(noLinks);
                }

                node.appendChild(linksContainer);

                // Append the node to the container
                container.appendChild(node);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Load nodes when the page loads
document.addEventListener('DOMContentLoaded', generateNodes);

