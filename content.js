// Inject a custom popup near the password field
function createCustomPopup(element) {
    // Remove existing popups to avoid duplicates
    const existingPopups = document.getElementsByClassName('custom-popup');
    for (let popup of existingPopups) {
      popup.remove();
    }
  
    // Create the popup element
    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.textContent = 'Use Keyholder'; // Text can be replaced with HTML for styling or additional buttons
    popup.style.position = 'absolute';
    popup.style.zIndex = '1000';
    popup.style.background = '#FFF';
    popup.style.border = '1px solid #CCC';
    popup.style.padding = '5px';
    popup.style.borderRadius = '5px';
    popup.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  
    // Position the popup
    const rect = element.getBoundingClientRect();
    popup.style.top = `${rect.top + rect.height + window.scrollY + 5}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
  
    // Add an event listener for the popup click
    popup.addEventListener('click', () => {
      alert('Keyholder will now generate a password for you.');
      // Implement the password generation logic here
    });
  
    // Append the popup to the body
    document.body.appendChild(popup);
  }
  
  // Listen for focusin events on password fields
  document.addEventListener('focusin', (event) => {
    if (event.target.type === 'password') {
      createCustomPopup(event.target);
    }
  });
  
  // Optionally, remove the popup when the field is blurred
  document.addEventListener('focusout', (event) => {
    if (event.target.type === 'password') {
      const popups = document.getElementsByClassName('custom-popup');
      if (popups.length > 0) {
        popups[0].remove();
      }
    }
  });
  