import { setupHamburgerMenu } from '../ui/hamburger-menu.js';

const elements = {
    hamburger: document.querySelector('.hamburger'),
    navbar: document.querySelector('.navbar'),
    closeHamburger: document.querySelector('.close-hamburger')}

document.addEventListener("DOMContentLoaded", () => {
    setupHamburgerMenu(".hamburger", ".navbar");
});

async function fetchPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    console.log("Post ID from URL:", postId); // Debugging

    if (!postId) {
        console.error("Error: No post ID found in the URL.");
        document.getElementById("post-content").innerHTML = "<p>Error: Post not found.</p>";
        return;
    }

    try {
        const response = await fetch(`https://www.krzysztofbytniewski.com/wp-json/wp/v2/posts/${postId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch post");
        }

        const post = await response.json();
        document.getElementById("post-title").innerHTML = post.title.rendered;
        document.getElementById("post-content").innerHTML = post.content.rendered;

       
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = post.content.rendered;
        const imgTag = tempDiv.querySelector("img");
        const imageUrl = imgTag ? imgTag.src : "";

        if (imageUrl) {
            const postImage = document.getElementById("post-image");
            postImage.src = imageUrl;
            postImage.alt = post.title.rendered;

            // Add click event to open fullscreen modal
            postImage.addEventListener("click", () => {
                document.getElementById("full-image").src = imageUrl;
                document.getElementById("image-modal").style.display = "block";
            });
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        document.getElementById("post-content").innerHTML = "<p>Error loading post.</p>";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    fetchPost();

    const modal = document.getElementById("image-modal");
    const closeModal = document.querySelector(".close-modal");

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
