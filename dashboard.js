// js/dashboard.js
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  let currentScore = 75; // Base score
  
  // 1. Auth Guard & Setup
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById('user-name').textContent = user.email.split('@')[0];
    } else {
      // If not logged in, boot them to login
      window.location.href = 'login.html';
    }
  });

  // 2. Animate Initial Progress Bar
  setTimeout(() => {
    document.getElementById('score-bar').style.width = `${currentScore}%`;
  }, 300);

  // 3. Handle Task Checkboxes (Dynamic Scoring)
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const scoreDisplay = document.getElementById('score-display');
  const scoreBar = document.getElementById('score-bar');

  checkboxes.forEach(box => {
    box.addEventListener('change', (e) => {
      const points = parseInt(e.target.getAttribute('data-points'));
      if (e.target.checked) {
        currentScore += points;
        e.target.nextElementSibling.style.textDecoration = "line-through";
        e.target.nextElementSibling.style.color = "var(--text-muted)";
      } else {
        currentScore -= points;
        e.target.nextElementSibling.style.textDecoration = "none";
        e.target.nextElementSibling.style.color = "#fff";
      }
      
      // Cap at 100
      currentScore = Math.min(100, currentScore);
      
      // Update UI
      scoreDisplay.textContent = `${currentScore}%`;
      scoreBar.style.width = `${currentScore}%`;
    });
  });

  // 4. Logout Logic
  document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
      window.location.href = 'index.html';
    });
  });
});
