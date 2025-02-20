document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const addAdBtn = document.getElementById("add-ad-btn");
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("close-btn");
    const postAdBtn = document.getElementById("post-ad");
    const adsGrid = document.getElementById("ads-grid");
    const themeSwitch = document.getElementById("theme-switch");

    // Load ads from localStorage
    function loadAds() {
        const savedAds = JSON.parse(localStorage.getItem("ads")) || [];
        savedAds.forEach(ad => addAdToDOM(ad.title, ad.description));
    }

    // Save ads to localStorage
    function saveAds() {
        const ads = [];
        document.querySelectorAll(".card").forEach(adCard => {
            ads.push({
                title: adCard.querySelector("h2").textContent,
                description: adCard.querySelector("p").textContent
            });
        });
        localStorage.setItem("ads", JSON.stringify(ads));
    }

    // Add ad to the DOM
    function addAdToDOM(title, description) {
        const adCard = document.createElement("div");
        adCard.classList.add("card");

        adCard.innerHTML = `
            <img src="https://via.placeholder.com/300" alt="Ad Image">
            <h2>${title}</h2>
            <p>${description}</p>
            <button class="delete-ad">🗑️ Delete</button>
        `;

        adCard.querySelector(".delete-ad").addEventListener("click", () => {
            adCard.remove();
            saveAds(); // Update storage after deleting
        });

        adsGrid.appendChild(adCard);
    }

    // Post an ad
    postAdBtn.addEventListener("click", () => {
        const title = document.getElementById("ad-title").value.trim();
        const description = document.getElementById("ad-description").value.trim();

        if (title && description) {
            addAdToDOM(title, description);
            saveAds(); // Save new ad to localStorage

            modal.style.display = "none";
            document.getElementById("ad-title").value = "";
            document.getElementById("ad-description").value = "";
        }
    });

    // Show modal when clicking "Add Advertisement"
    addAdBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Close modal when clicking "X"
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Toggle menu on burger icon click
    menuToggle.addEventListener("click", () => {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    // Hide menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && event.target !== menuToggle) {
            menu.style.display = "none";
        }
    });

    // Theme Switch
    themeSwitch.addEventListener("click", () => {
        document.body.classList.toggle("darkmode");
    });

    // Load ads on startup
    loadAds();
});
