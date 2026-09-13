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
            logout();
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
    if (document.getElementById('signupForm')) {
        document.getElementById('signupForm').reset();
    }
}

// Log In Modal Functions
function openLogin() {
    document.getElementById('loginModal').classList.add('show');
    loadSavedAccounts();
}

function closeLogin() {
    document.getElementById('loginModal').classList.remove('show');
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').reset();
    }
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
if (document.getElementById('signupForm')) {
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
        
        // Check if account already exists
        let accounts = JSON.parse(localStorage.getItem('spritedexAccounts')) || [];
        if (accounts.some(acc => acc.email === email)) {
            alert('❌ This email is already registered!');
            return;
        }
        
        // Save account and set as logged in
        saveAccount(email, password);
        setCurrentUser(email);
        alert('✅ Account created successfully for: ' + email);
        closeSignUp();
        redirectToMainMenu();
    });
}

// Handle Log In Form Submit
if (document.getElementById('loginForm')) {
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
        
        // Check if account exists and password is correct
        let accounts = JSON.parse(localStorage.getItem('spritedexAccounts')) || [];
        const account = accounts.find(acc => acc.email === email);
        
        if (!account) {
            alert('❌ Account not found. Please check your email or sign up.');
            return;
        }
        
        if (account.password !== password) {
            alert('❌ Incorrect password!');
            return;
        }
        
        // Password is correct, login
        setCurrentUser(email);
        alert('✅ Welcome back to SpriteDex, ' + email + '!');
        closeLogin();
        redirectToMainMenu();
    });
}

// Account Management Functions
function saveAccount(email, password) {
    let accounts = JSON.parse(localStorage.getItem('spritedexAccounts')) || [];
    
    // Check if account already exists and update it
    const existingIndex = accounts.findIndex(acc => acc.email === email);
    if (existingIndex !== -1) {
        accounts[existingIndex] = { email: email, password: password };
    } else {
        accounts.push({ email: email, password: password });
    }
    
    localStorage.setItem('spritedexAccounts', JSON.stringify(accounts));
}

function setCurrentUser(email) {
    localStorage.setItem('currentUser', email);
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

function logout() {
    localStorage.removeItem('currentUser');
    alert('👋 You have been logged out.');
    window.location.href = 'index.html';
}

function loadSavedAccounts() {
    const accounts = JSON.parse(localStorage.getItem('spritedexAccounts')) || [];
    const accountsList = document.getElementById('accountsList');
    
    if (!accountsList) return;
    
    accountsList.innerHTML = '';
    
    if (accounts.length === 0) {
        accountsList.innerHTML = '<p style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem;">No saved accounts</p>';
        return;
    }
    
    accounts.forEach(account => {
        const accountItem = document.createElement('div');
        accountItem.className = 'account-item';
        accountItem.innerHTML = `
            <div class="account-info">
                <span class="account-email">${account.email}</span>
                <button class="account-remove" onclick="removeAccount('${account.email}')">✕</button>
            </div>
        `;
        accountItem.style.cursor = 'pointer';
        accountItem.onclick = (e) => {
            if (!e.target.classList.contains('account-remove')) {
                loginWithAccount(account.email, account.password);
            }
        };
        accountsList.appendChild(accountItem);
    });
}

function loginWithAccount(email, password) {
    setCurrentUser(email);
    alert('✅ Welcome back to SpriteDex, ' + email + '!');
    closeLogin();
    redirectToMainMenu();
}

function removeAccount(email) {
    if (confirm(`Are you sure you want to remove ${email}?`)) {
        let accounts = JSON.parse(localStorage.getItem('spritedexAccounts')) || [];
        accounts = accounts.filter(acc => acc.email !== email);
        localStorage.setItem('spritedexAccounts', JSON.stringify(accounts));
        loadSavedAccounts();
        alert('✅ Account removed successfully');
    }
}

// Navigation Functions
function goToMainMenu() {
    if (!isUserLoggedIn()) {
        openLogin();
    } else {
        redirectToMainMenu();
    }
}

function redirectToMainMenu() {
    window.location.href = 'main-menu.html';
}

function goHome() {
    window.location.href = 'index.html';
}

function startGame() {
    alert('🎮 Starting a new game...');
    // Add game start logic here
}

function continueGame() {
    alert('▶️ Continuing your game...');
    // Add continue game logic here
}

function goToSettings() {
    alert('⚙️ Opening game settings...');
    // Add settings logic here
}

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', function() {
    if (document.body.innerHTML.includes('main-menu')) {
        if (!isUserLoggedIn()) {
            window.location.href = 'index.html';
        }
    }
});
