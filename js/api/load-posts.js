import { setupHamburgerMenu } from '../ui/hamburger-menu.js';

const elements = {
    hamburger: document.querySelector('.hamburger'),
    navbar: document.querySelector('.navbar'),
    closeHamburger: document.querySelector('.close-hamburger')}
const blogPostsContainer = document.getElementById("blog-posts");
const loadMoreButton = document.getElementById("load-more");
document.addEventListener("DOMContentLoaded", () => {
    setupHamburgerMenu(".hamburger", ".navbar");
});

let posts = [];
let currentIndex = 0;
const postsPerPage = 2;

async function fetchPosts() {
    try {
        const response = await fetch("https://www.krzysztofbytniewski.com/wp-json/wp/v2/posts"); 
        if (!response.ok) {
            throw new Error("Błąd podczas pobierania danych");
        }
        posts = await response.json();
        displayPosts();
    } catch (error) {
        console.error("Błąd:", error);
    }
}
    function displayPosts() {
        const postsToShow = posts.slice(currentIndex, currentIndex + postsPerPage);
        
        postsToShow.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
    
            // Extract the first image from content
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = post.content.rendered;
            const imgTag = tempDiv.querySelector("img");
            const imageUrl = imgTag ? imgTag.src : "";
    
            postElement.innerHTML = `
                ${imageUrl ? `<img src="${imageUrl}" alt="${post.title.rendered}" />` : ""}
                <h2><a href="single-post.html?id=${post.id}">${post.title.rendered}</a></h2>
                <p>${post.excerpt.rendered}</p>
            `;
            
            blogPostsContainer.appendChild(postElement);
        });
    currentIndex += postsPerPage;
    if (currentIndex >= posts.length) {
        loadMoreButton.style.display = "none";
    }
}

loadMoreButton.addEventListener("click", displayPosts);

document.addEventListener("DOMContentLoaded", fetchPosts);
