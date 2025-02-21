document.addEventListener("DOMContentLoaded", function () {
    const themeSwitch = document.getElementById("theme-switch");
    const body = document.body;
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const addAdBtn = document.getElementById("add-ad-btn");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("close-btn");
    const postAdBtn = document.getElementById("post-ad");
    const adContainer = document.getElementById("ads-grid");

    // Toggle dark mode
    themeSwitch.addEventListener("click", function () {
        body.classList.toggle("darkmode");
        localStorage.setItem("darkmode", body.classList.contains("darkmode") ? "enabled" : "disabled");
    });

    // Toggle menu visibility
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("visible");
    });

    // Show modal when clicking the "Add Advertisement" button
    addAdBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Close modal when clicking the close button
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Post ad functionality
    postAdBtn.addEventListener("click", function () {
        const title = document.getElementById("ad-title").value;
        const description = document.getElementById("ad-description").value;

        if (title.trim() === "" || description.trim() === "") {
            alert("Please enter both title and description.");
            return;
        }

        const savedAds = JSON.parse(localStorage.getItem("ads")) || [];
        savedAds.push({ title, description });
        localStorage.setItem("ads", JSON.stringify(savedAds));

        createAdElement(title, description, savedAds.length - 1);

        // Close modal after posting the ad
        modal.style.display = "none";
    });

    // Create ad card
    function createAdElement(title, description, index) {
        const adCard = document.createElement("div");
        adCard.classList.add("card");
        adCard.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        adContainer.appendChild(adCard);
    }

    // Load ads on page load
    function loadAds() {
        const savedAds = JSON.parse(localStorage.getItem("ads")) || [];
        adContainer.innerHTML = ""; // Clear current ads
        savedAds.forEach((ad, index) => createAdElement(ad.title, ad.description, index));
    }

    // Load saved ads when the page is loaded
    loadAds();
});
