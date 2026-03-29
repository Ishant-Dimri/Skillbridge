import { db, auth } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const uploadForm = document.getElementById('upload-form');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const projectData = {
        title: document.getElementById('title').value,
        description: document.getElementById('desc').value,
        techStack: document.getElementById('tech').value.split(','),
        link: document.getElementById('link').value,
        author: auth.currentUser ? auth.currentUser.email : "Anonymous",
        timestamp: new Date()
    };

    try {
        await addDoc(collection(db, "projects"), projectData);
        alert("Project uploaded successfully!");
        window.location.href = "projects.html";
    } catch (error) {
        console.error("Upload failed: ", error);
    }
});
