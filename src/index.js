// Log a message to the console for debugging
console.log('%c HI', 'color: firebrick');

// Define the URL for fetching dog images
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

// Add an event listener for the page load
window.addEventListener('load', function(){
    // Challenge 1: Fetch dog images from the specified URL
    fetch(imgUrl)
        .then(res => res.json())
        .then(dogs => appendDogs(dogs))
        .catch(e => console.log(e)); // Log any errors to the console

    // Challenge 2: Fetch all dog breeds and add them to the page
    fetch(breedUrl)
        .then(res => res.json())
        .then(breeds => appendBreeds(breeds))
        .catch(e => console.log(e)); // Log any errors to the console
});

// Function to append dog images to the DOM
function appendDogs(dogs){
    // Get the container where dog images will be added
    let imageContainer = document.querySelector('#dog-images');

    // Loop through the images and create list items with images
    for(image of dogs['message']){
        let dogsList = document.createElement('li');
        dogsList.innerHTML = `
            <img src=${image}/>
        `;
        // Append the list item to the container
        imageContainer.appendChild(dogsList);
    }
}

// Function to append dog breeds to the DOM
function appendBreeds(breeds){
    // Get the container where dog breeds will be added (assuming you have a <ul> with id "dog-breeds")
    let breedList = document.querySelector('#dog-breeds');

    // Loop through the breeds and create list items with breed names
    for(breed in breeds['message']){
        let breedItem = document.createElement('li');
        breedItem.textContent = breed;
        // Append the list item to the container
        breedList.appendChild(breedItem);
    }

    // Challenge 3: Add a click event listener to change font color when a <li> is clicked
    breedList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.style.color = 'red'; // Change the font color to blue (you can choose any color)
        }
    });

    // Challenge 4: Add dropdown filter functionality (letters a-d)
    const filterDropdown = document.querySelector('#filter-dropdown');

    filterDropdown.addEventListener('change', function(event) {
        const selectedLetter = event.target.value.toLowerCase();
        filterBreedsByLetter(selectedLetter);
    });
}

// Function to filter dog breeds by starting letter
function filterBreedsByLetter(letter) {
    const breedList = document.querySelector('#dog-breeds');
    const breedItems = breedList.getElementsByTagName('li');

    for (let i = 0; i < breedItems.length; i++) {
        const breedName = breedItems[i].textContent.toLowerCase();
        if (breedName.startsWith(letter)) {
            breedItems[i].style.display = 'list-item';
        } else {
            breedItems[i].style.display = 'none';
        }
    }
}
