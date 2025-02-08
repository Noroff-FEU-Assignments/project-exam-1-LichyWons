import { setupHamburgerMenu } from '../ui/hamburger-menu.js';

const elements = {
    hamburger: document.querySelector('.hamburger'),
    navbar: document.querySelector('.navbar'),
    closeHamburger: document.querySelector('.close-hamburger')}

document.addEventListener("DOMContentLoaded", () => {
    setupHamburgerMenu(".hamburger", ".navbar");
});
/*
async function fetchPost() {
    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
    const postContent = document.getElementById("post-content");
    console.log("Post ID from URL:", postId);


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

        // Update HTML with post details
        document.getElementById("post-title").innerHTML = post.title.rendered;
        
        // Extract first image from content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = post.content.rendered;
        const imgTag = tempDiv.querySelector("img");
        const imageUrl = imgTag ? imgTag.src : "";

        if (imageUrl) {
            document.getElementById("post-image").src = imageUrl;
            document.getElementById("post-image").alt = post.title.rendered;
        } else {
            document.getElementById("post-image").style.display = "none"; // Hide if no image
        }

        document.getElementById("post-content").innerHTML = post.content.rendered;
    } catch (error) {
        document.getElementById("post-container").innerHTML = "<p>Error loading post.</p>";
        console.error(error);
    }
}

// Run function when page loads
document.addEventListener("DOMContentLoaded", fetchPost);
*/

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

        // Extract image
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

// Close the modal when clicking outside the image or on the close button
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
