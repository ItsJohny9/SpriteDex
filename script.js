// Toggle Settings Menu
function toggleMenu() {
    const menu = document.getElementById('settingsMenu');
    menu.classList.toggle('active');
}

// Handle Menu Click
function handleMenuClick(option) {
    console.log('Menu item clicked:', option);
    
    switch(option) {
        case 'settings':
            alert('⚙️ Settings page coming soon!');
            break;
        case 'profile':
            alert('👤 Profile page coming soon!');
            break;
        case 'about':
            alert('ℹ️ About: SpriteDex - Discover. Collect. Master.');
            break;
        case 'help':
            alert('❓ Help & Support coming soon!');
            break;
        case 'logout':
            alert('👋 You have been logged out.');
            break;
        default:
            break;
    }
    
    // Close menu after clicking
    toggleMenu();
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('settingsMenu');
    const settingsIcon = document.querySelector('.settings-icon');
    
    if (!menu.contains(event.target) && !settingsIcon.contains(event.target)) {
        menu.classList.remove('active');
    }
});
