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
    
    // Only close if clicking outside menu and icon
    if (menu && !menu.contains(event.target) && !settingsIcon.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Sign Up Modal Functions
function openSignUp() {
    document.getElementById('signupModal').classList.add('show');
}

function closeSignUp() {
    document.getElementById('signupModal').classList.remove('show');
    document.getElementById('signupForm').reset();
}

// Log In Modal Functions
function openLogin() {
    document.getElementById('loginModal').classList.add('show');
}

function closeLogin() {
    document.getElementById('loginModal').classList.remove('show');
    document.getElementById('loginForm').reset();
}

// Switch from Sign Up to Log In
function switchToLogin() {
    closeSignUp();
    openLogin();
}

// Switch from Log In to Sign Up
function switchToSignUp() {
    closeLogin();
    openSignUp();
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    
    if (event.target === signupModal) {
        closeSignUp();
    }
    if (event.target === loginModal) {
        closeLogin();
    }
});

// Handle Sign Up Form Submit
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    // Validate email
    if (!email.includes('@')) {
        alert('❌ Please enter a valid email address');
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        alert('❌ Password must be at least 6 characters');
        return;
    }
    
    // Check if passwords match
    if (password !== confirm) {
        alert('❌ Passwords do not match');
        return;
    }
    
    alert('✅ Account created successfully for: ' + email);
    closeSignUp();
});

// Handle Log In Form Submit
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validate email
    if (!email.includes('@')) {
        alert('❌ Please enter a valid email address');
        return;
    }
    
    // Validate password
    if (password.length < 6) {
        alert('❌ Password must be at least 6 characters');
        return;
    }
    
    alert('✅ Welcome back to SpriteDex, ' + email + '!');
    closeLogin();
});
