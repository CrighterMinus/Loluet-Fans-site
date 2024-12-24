// Data files for each category
const dataFiles = {
  active: "active_accounts.json",
  inactiveLoluet: "inactive_loluet_accounts.json",
  inactiveReciel: "inactive_reciel_accounts.json",
};

// Function to fetch and display data
function loadAccounts(dataFile) {
  fetch(dataFile)
    .then((response) => response.json())
    .then((data) => {
      const activeAccounts = document.getElementById("active_accounts");
      activeAccounts.innerHTML = ""; // Clear previous content

      data.forEach((entry) => {
        const node = document.createElement("div");
        node.className = "active_accounts-node";

        node.innerHTML = `
          <div class="node-header">
            <img src="${entry.Image_Link}" alt="${entry.Social_Media_Account} logo" class="node-image" height="30">
            <div class="node-title">
              <h4>${entry.Social_Media_Account}</h4>
              <a href="${entry.Social_Media_Link}" target="_blank">${entry.Social_Media_Link}</a>
            </div>
          </div>
          <div class="node-details">
            <p><strong>Username:</strong> ${entry.Username}</p>
            <p><strong>Purpose:</strong> ${entry.Purpose_of_Account}</p>
            <p><strong>Date Created:</strong> ${entry["Date Created"] || "N/A"}</p>
            <p><strong>Date Deleted:</strong> ${entry["Date Deleted"] || "N/A"}</p>
          </div>
        `;

        activeAccounts.appendChild(node);
      });
    })
    .catch((error) => {
      console.error("Error fetching the JSON file:", error);
    });
}

// Function to update active button
function setActiveButton(buttonId) {
  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".switch-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Add active class to the clicked button
  document.getElementById(buttonId).classList.add("active");
}

// Event listeners for buttons
document.getElementById("btn-active").addEventListener("click", () => {
  setActiveButton("btn-active");
  loadAccounts(dataFiles.active);
});
document.getElementById("btn-inactive-loluet").addEventListener("click", () => {
  setActiveButton("btn-inactive-loluet");
  loadAccounts(dataFiles.inactiveLoluet);
});
document.getElementById("btn-inactive-reciel").addEventListener("click", () => {
  setActiveButton("btn-inactive-reciel");
  loadAccounts(dataFiles.inactiveReciel);
});

// Set Active Social Media as default
document.addEventListener("DOMContentLoaded", () => {
  setActiveButton("btn-active");
  loadAccounts(dataFiles.active);
});
