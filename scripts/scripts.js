// Load Projects from JSON
document.addEventListener('DOMContentLoaded', () => {
    fetch('data/projects.json')
        .then(response => response.json())
        .then(projects => renderProjects(projects))
        .catch(error => console.error('Error loading projects:', error));
});

function renderProjects(projects) {
    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        </div>
    `).join('');
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Form Submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
        newsletter: e.target.newsletter.checked
    };
    localStorage.setItem('contactData', JSON.stringify(formData));
    alert('Message sent!');
    e.target.reset();
});