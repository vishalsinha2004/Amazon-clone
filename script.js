// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Page flow control
    const welcomePage = document.getElementById('welcomePage');
    const loginPage = document.getElementById('loginPage');
    const amazonSite = document.getElementById('amazonSite');
    const enterSiteBtn = document.getElementById('enterSite');
    const createAccountBtn = document.getElementById('createAccount');
    
    // Show welcome page initially
    welcomePage.style.display = 'flex';
    loginPage.style.display = 'none';
    amazonSite.style.display = 'none';
    
    // Enter site button - show login page
    enterSiteBtn.addEventListener('click', function() {
        welcomePage.style.opacity = '0';
        setTimeout(() => {
            welcomePage.style.display = 'none';
            loginPage.style.display = 'flex';
        }, 500);
    });
    
    // Create account button - skip login for demo
    createAccountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginPage.style.display = 'none';
        amazonSite.style.display = 'block';
        document.getElementById('loggedInUser').textContent = 'New User';
    });
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                // In a real app, you would verify credentials with a server
                loginPage.style.display = 'none';
                amazonSite.style.display = 'block';
                document.getElementById('loggedInUser').textContent = email.split('@')[0];
            } else {
                alert('Please enter both email and password');
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const panel = document.querySelector('.panel');
    
    if (mobileMenuBtn && panel) {
        mobileMenuBtn.addEventListener('click', function() {
            panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
        });
    }

    // Hero slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    if (slides.length > 0) {
        // Start with first slide
        showSlide(0);
        
        // Auto slide every 5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // Load deals dynamically
    const dealsContainer = document.querySelector('.deals-container');
    if (dealsContainer) {
        const deals = [
            { id: 1, name: 'Wireless Headphones', price: '$49.99', discount: '20% off', image: 'https://m.media-amazon.com/images/I/61+D5oJlyML._AC_UL320_.jpg' },
            { id: 2, name: 'Smart Watch', price: '$79.99', discount: '30% off', image: 'https://m.media-amazon.com/images/I/61Xl6O7QqVL._AC_UL320_.jpg' },
            { id: 3, name: 'Bluetooth Speaker', price: '$35.99', discount: '15% off', image: 'https://m.media-amazon.com/images/I/71YlH-4MUQL._AC_UL320_.jpg' },
            { id: 4, name: 'Fitness Tracker', price: '$29.99', discount: '25% off', image: 'https://m.media-amazon.com/images/I/61Im+8Y3cVL._AC_UL320_.jpg' },
            { id: 5, name: 'Tablet', price: '$129.99', discount: '10% off', image: 'https://m.media-amazon.com/images/I/61XIQyrKrML._AC_UL320_.jpg' },
            { id: 6, name: 'Wireless Earbuds', price: '$59.99', discount: '20% off', image: 'https://m.media-amazon.com/images/I/61XqZOBbxWL._AC_UL320_.jpg' },
            { id: 7, name: 'Portable Charger', price: '$19.99', discount: '30% off', image: 'https://m.media-amazon.com/images/I/61+Q6RhJDKL._AC_UL320_.jpg' },
            { id: 8, name: 'Laptop Backpack', price: '$24.99', discount: '15% off', image: 'https://m.media-amazon.com/images/I/61S2KdoGNnL._AC_UL320_.jpg' }
        ];

        deals.forEach(deal => {
            const dealItem = document.createElement('div');
            dealItem.className = 'deal-item';
            dealItem.innerHTML = `
                <img src="${deal.image}" alt="${deal.name}">
                <div class="deal-discount">${deal.discount}</div>
                <h3>${deal.name}</h3>
                <div class="deal-price">${deal.price}</div>
                <button class="add-to-cart" data-id="${deal.id}">Add to Cart</button>
            `;
            dealsContainer.appendChild(dealItem);
        });
    }

    // Cart functionality
    let cart = [];
    const cartCount = document.querySelector('.cart-count');
    
    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            
            updateCartCount();
            
            // Show added to cart notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = 'Added to cart!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 500);
            }, 2000);
        }
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real app, you would send this to your server
            console.log('Subscribed email:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.foot-panel1');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth <= 768) {
            // Mobile view adjustments
        } else {
            // Desktop view adjustments
            if (panel) panel.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});

// Add some animations
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});