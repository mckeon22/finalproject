const API_KEY = "d12c045803eedc74855efbc8f344c49a"; // Replace with your actual API key

// Function to show weather modal
function showWeather(city) {
    const weatherModal = document.getElementById("weather-modal");
    const weatherLocation = document.getElementById("weather-location");
    const weatherData = document.getElementById("weather-data");

    // Set city name in the modal
    weatherLocation.textContent = city;

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Populate modal with weather data
                weatherData.innerHTML = `
                    <strong>Temperature:</strong> ${data.main.temp}°C<br>
                    <strong>Weather:</strong> ${data.weather[0].description}<br>
                    <strong>Humidity:</strong> ${data.main.humidity}%<br>
                    <strong>Wind Speed:</strong> ${data.wind.speed} m/s
                `;
            } else {
                weatherData.textContent = "Unable to fetch weather data.";
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherData.textContent = "Error fetching weather data.";
        });

    // Display the modal
    weatherModal.style.display = "block";
}

// Add event listener for the close button in the modal
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector(".close-btn");
    const weatherModal = document.getElementById("weather-modal");

    if (closeButton) {
        closeButton.onclick = function () {
            weatherModal.style.display = "none";
        };
    }

    // Close modal on outside click
    window.addEventListener("click", function (event) {
        if (event.target === weatherModal) {
            weatherModal.style.display = "none";
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Handle Top Tip buttons
    const topTipButtons = document.querySelectorAll('.top-tip-btn');

    topTipButtons.forEach(button => {
        button.addEventListener('click', function() {
            const topTipContent = this.nextElementSibling;

            // Toggle display of the top tip
            if (topTipContent.style.display === 'none' || !topTipContent.style.display) {
                topTipContent.style.display = 'block';
                this.textContent = 'Hide Top Tip';
            } else {
                topTipContent.style.display = 'none';
                this.textContent = 'Top Tip';
            }
        });
    });
});


// <-------------------------------------------------------------------------------->
// The poll results & submitting a vote
document.addEventListener('DOMContentLoaded', function () {
    const pollSubmitButton = document.getElementById("poll-submit");
    const pollResultDiv = document.getElementById("poll-result");
    const pollResultsList = document.getElementById("poll-results-list");

    if (pollSubmitButton) {
        pollSubmitButton.addEventListener("click", function () {
            const pollOptions = document.querySelectorAll('input[name="poll"]');
            let selectedOption = null;

            // Check which option is selected
            pollOptions.forEach(option => {
                if (option.checked) {
                    selectedOption = option.value;
                }
            });

            if (selectedOption) {
                // Show thank-you message
                alert(`Thank you for voting for: "${selectedOption}"!`);

                // Save the vote result in localStorage
                const pollResults = JSON.parse(localStorage.getItem("pollResults")) || {};
                pollResults[selectedOption] = (pollResults[selectedOption] || 0) + 1;
                localStorage.setItem("pollResults", JSON.stringify(pollResults));

                // Update and display poll results
                displayPollResults(pollResults);
            } else {
                // Alert the user if no option is selected
                alert("Please select an option before submitting.");
            }
        });
    }

    function displayPollResults(pollResults) {
        for (const [destination, votes] of Object.entries(pollResults)) {
            const listItem = document.createElement("li");
            listItem.textContent = `${destination}: ${votes} vote(s)`;
            pollResultsList.appendChild(listItem);
        }
        pollResultDiv.style.display = "block"; // Show the results section
    }

    // Load poll results on page load if available
    const savedPollResults = JSON.parse(localStorage.getItem("pollResults"));
    if (savedPollResults) {
        displayPollResults(savedPollResults);
    }
});
// <---------------------------------------------------------------------------------->

//<------------------------------ITENARUY FORM------------------------------------------->
document.addEventListener("DOMContentLoaded", function () {

    const itineraryForm = document.getElementById("itineraryForm");
    const outputDiv = document.getElementById("output");

    // Check if there's an itinerary saved in localStorage
    const savedItinerary = localStorage.getItem("itineraryData");
    if (savedItinerary) {
        // Display the previously saved itinerary
        outputDiv.innerHTML = savedItinerary;
    }

    if (itineraryForm) {
        itineraryForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting traditionally

            // Fetch the wonderfully chosen values from the form
            const destination = document.getElementById("destination").value;
            const startDate = document.getElementById("startDate").value;
            const endDate = document.getElementById("endDate").value;
            const activities = document.getElementById("activities").value;
            const accommodation = document.getElementById("accommodation").value;

            // Itinerary display
            const itineraryHTML = `
                <p><strong>Destination:</strong> ${destination}</p>
                <p><strong>Travel Dates:</strong> ${startDate} to ${endDate}</p>
                <p><strong>Activities:</strong> ${activities}</p>
                <p><strong>Accommodation:</strong> ${accommodation}</p>
            `;

            // Display Iteneray on the page
            outputDiv.innerHTML = itineraryHTML;

            // Save it into localStorage 
            localStorage.setItem("itineraryData", itineraryHTML);
        });
    } else {
        console.error("The itinerary form was not found. Please double-check your HTML!");
    }
});
 
// <-------------------------BLOG POST MODALS-------------------->
document.addEventListener("DOMContentLoaded", () => {
    // Select all "Read More" buttons and modals
    const readMoreButtons = document.querySelectorAll(".read-more-btn");
    const modals = document.querySelectorAll(".modal");

    // Function to open the modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex"; // Show modal
        } else {
            console.error(`Modal with ID "${modalId}" not found.`);
        }
    }

    // Function to close the modal
    function closeModal(modal) {
        if (modal) {
            modal.style.display = "none"; // Hide modal
        }
    }

    // Add click event listeners to "Read More" buttons
    readMoreButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            openModal(modalId);
        });
    });

    // Add event listeners for modals to close them
    modals.forEach((modal) => {
        const closeModalButton = modal.querySelector(".close-modal");
        if (closeModalButton) {
            closeModalButton.addEventListener("click", () => closeModal(modal));
        }

        // Close the modal if the user clicks outside the content
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    console.log("Modal functionality initialized.");
});
//<--------------------------------------------------------------------------->



document.addEventListener('DOMContentLoaded', function () {
    const albums = document.querySelectorAll('.album'); // Select all album elements
    const modal = document.getElementById('album-modal'); // Modal element
    const modalTitle = document.getElementById('album-title'); // Modal title
    const modalGallery = document.getElementById('modal-gallery'); // Modal gallery container
    const closeModal = modal.querySelector('.close-modal'); // Close button

    // Album data with images for each album
    const albumData = {
        paris: [
            { src: 'images/paris7.jpg', alt: 'Passionfruit Martini at the Louvre Museum' },
            { src: 'images/paris3.jpg', alt: 'Eiffel Tower during the day' },
            { src: 'images/paris4.jpg', alt: 'Eiffel Tower at night with olympic rings' },
            { src: 'images/paris5.jpg', alt: 'Restaurant' },
            { src: 'images/paris6.jpg', alt: 'Dior Museum' }
        ],
        newyork: [
            { src: 'images/nyc1.jpg', alt: 'Boys at Metro station' },
            { src: 'images/nyc2.jpg', alt: 'Top floor of empire state builidng'},
            { src: 'images/nyc3.jpg', alt: 'Grand Central train station' },
            { src: 'images/nyc4.jpg', alt: 'Brooklyn Bridge' },
            { src: 'images/nyc5.jpg', alt: 'Statue of Liberty' },
            

        ], 
        
        barcelona: [
            { src: 'images/barcelona2.jpg', alt: 'Sagrada Família' },
            { src: 'images/barcelona3.jpg', alt: 'Park Guell made out of lego' },
            { src: 'images/barcelona4.jpg', alt: 'Square at night' },
            { src: 'images/barcelona5.jpg', alt: 'Lunch & Coffee' },
            { src: 'images/barcelona6.jpg', alt: 'Colourful Fruit' }
        ]
    };

    // Add click event listeners to albums
    albums.forEach(album => {
        album.addEventListener('click', function () {
            const albumKey = this.getAttribute('data-album'); // Get the album key from the data attribute
            const images = albumData[albumKey]; // Retrieve corresponding images

            if (images) {
                // Set the modal title
                modalTitle.textContent = this.querySelector('h3').textContent;

                // Clear the previous gallery content
                modalGallery.innerHTML = '';

                // Add images to the gallery
                images.forEach(imageData => {
                    const img = document.createElement('img');
                    img.src = imageData.src;
                    img.alt = imageData.alt;
                    modalGallery.appendChild(img);
                });

                // Show the modal
                modal.style.display = 'flex';
            } else {
                console.error(`No images found for album: ${albumKey}`);
            }
        });
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the content
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
