window.addEventListener('load', function() {
            const loadingScreen = document.getElementById('loaning-screen');
            loadingScreen.style.opacity = '0'; // Begin fade-out
            setTimeout(() => {
                loadingScreen.style.display = 'none'; // Fully hide after fade-out
            }, 1000); // Match duration of transition (1s)
        });
