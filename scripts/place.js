// Display last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    `Last Modification: ${document.lastModified}`;
