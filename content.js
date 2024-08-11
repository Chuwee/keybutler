    /*
    Basic pop up creator (content.js just injects JavaScript into the website)

    Copyright (C) 2024, Author: https://github.com/chuwee

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
    */

// Assuming generate.js has been loaded before content.js
let currentPasswordField = null;

// Function to extract the domain name from a URL
function extractDomain(url) {
    const parsedUrl = new URL(url);
    let hostname = parsedUrl.hostname;
    hostname = hostname.replace(/^(www\.)/, "");  // Remove "www."
    const domainParts = hostname.split('.');
    domainParts.pop();  // Remove the last segment (TLD)
    return domainParts.join('.');  // Join the remaining parts as the domain
}

function createCustomPopup(element) {
    currentPasswordField = element; // Store reference to the focused password field

    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.style.position = 'absolute';
    popup.style.zIndex = '1000';
    popup.style.background = '#006666';
    popup.style.color = 'white';
    popup.style.border = '1px solid #CCC';
    popup.style.padding = '5px';
    popup.style.borderRadius = '5px';
    popup.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    const rect = element.getBoundingClientRect();
    popup.style.top = `${window.scrollY + rect.top + rect.height + 5}px`;
    popup.style.left = `${window.scrollX + rect.left}px`;

    const button = document.createElement('button');
    button.textContent = 'Use Keyholder';
    button.style.background = '#006666';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {
        const domain = extractDomain(window.location.href);
        const password = generate(domain);  // Call generate function from generate.js
        if (currentPasswordField) {
            currentPasswordField.value = password;
        }
        document.body.removeChild(popup);  // Optionally remove the popup after use
        popup.remove()
    });

    popup.appendChild(button);
    document.body.appendChild(popup);
}

document.addEventListener('focusin', event => {
    if (event.target.type === 'password') {
        createCustomPopup(event.target);
    }
});
