// Footer year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger menu toggle
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("hide");
    menuBtn.innerHTML = navMenu.classList.contains("hide") ? "&#9776;" : "&times;";
});

// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Add more temple objects here...
    {
        templeName: "Dallas Texas",
        location: "Dallas, Texas, United States",
        dedicated: "1984, October, 19",
        area: 44207,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/dallas-texas-temple/dallas-texas-temple-55240.jpg"
    },
    {
        templeName: "Manila Philippines",
        location: "Quezon City, Metro Manila, Philippines",
        dedicated: "1984, September, 25",
        area: 26683,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/_temp/029-Manila-Philippines-Temple.jpg"
    },
    {
        templeName: "Sydney Australia",
        location: "New South Wales, Australia",
        dedicated: "1984, September, 20",
        area: 30067,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/sydney-australia-temple/sydney-australia-temple-43342-main.jpg"
    },
    {
        templeName: "Boise Idaho",
        location: "Boise, Idaho, United States",
        dedicated: "1984, May, 25",
        area: 35868,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/boise-idaho-temple/boise-idaho-temple-41667-main.jpg"
    },
    {
        templeName: "Papeete Tahiti",
        location: "Tahiti, French Polynecia",
        dedicated: "1983, October, 27",
        area: 12150,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/_temp/025-Papeete-Tahiti-Temple.jpg"
    }
];

// Reference to gallery section
const templeContainer = document.getElementById("temples");

// Function to create temple card
function createTempleCard(temple) {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.innerHTML = `<strong>${temple.templeName}</strong><br>
  ${temple.location}<br>
  Dedicated: ${temple.dedicated}<br>
  Area: ${temple.area.toLocaleString()} sq ft`;

    figure.appendChild(img);
    figure.appendChild(caption);
    return figure;
}

// Display temples
function displayTemples(filteredTemples) {
    templeContainer.innerHTML = "";
    filteredTemples.forEach((temple) => templeContainer.appendChild(createTempleCard(temple)));
}

// Filter navigation
document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const filter = link.textContent;
        document.querySelector("main h1").textContent = filter;

        let result;
        switch (filter) {
            case "Old":
                result = temples.filter((t) => parseInt(t.dedicated.split(",")[0]) < 1900);
                break;
            case "New":
                result = temples.filter((t) => parseInt(t.dedicated.split(",")[0]) > 2000);
                break;
            case "Large":
                result = temples.filter((t) => t.area > 90000);
                break;
            case "Small":
                result = temples.filter((t) => t.area < 10000);
                break;
            default:
                result = temples;
        }
        displayTemples(result);
    });
});

// Initial display
window.addEventListener("DOMContentLoaded", () => {
    displayTemples(temples);
});
