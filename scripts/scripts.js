// Initialize tasks from localStorage or default
let tasks = JSON.parse(localStorage.getItem('blossomTasks')) || [];
if(tasks.length === 0) {
    tasks = [{
        id: 1,
        title: "Welcome to Blossom!",
        description: "Click the + button to add your first task",
        priority: "low",
        dueDate: new Date().toISOString().split('T')[0],
        completed: false
    }];
    localStorage.setItem('blossomTasks', JSON.stringify(tasks));
}

// DOM Elements
const modal = document.getElementById('modalOverlay');
const taskForm = document.getElementById('taskForm');
const taskGrid = document.getElementById('taskGrid');

// Initialize
renderTasks(tasks);
updateProgress();

// Event Listeners
document.getElementById('newTaskBtn').addEventListener('click', () => {
    modal.style.display = 'flex';
});

modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.style.display = 'none';
        taskForm.reset();
    }
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewTask();
});

document.querySelectorAll('.priority-option').forEach(btn => {
    btn.addEventListener('click', () => handlePrioritySelect(btn));
});

document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => handleFilterSelect(btn));
});

// Core Functions
function addNewTask() {
    const newTask = {
        id: Date.now(),
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDesc').value,
        priority: document.querySelector('.priority-option.active').classList[1],
        dueDate: document.getElementById('dueDate').value,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem('blossomTasks', JSON.stringify(tasks));
    renderTasks(tasks);
    updateProgress();
    modal.style.display = 'none';
    taskForm.reset();
}

function renderTasks(taskArray = tasks) {
    taskGrid.innerHTML = taskArray.map(task => `
        <div class="task-card ${task.completed ? 'completed' : ''}">
            <div class="task-header">
                <h3>${task.title}</h3>
                <span class="priority-tag ${task.priority}">${task.priority}</span>
            </div>
            ${task.description ? `<p class="task-desc">${task.description}</p>` : ''}
            <div class="task-footer">
                <span class="due-date">
                    <i class="fas fa-calendar-day"></i>
                    ${new Date(task.dueDate).toLocaleDateString()}
                </span>
                <div class="task-controls">
                    <button class="status-toggle" onclick="toggleStatus(${task.id})">
                        ${task.completed ? 
                            '<i class="fas fa-check-circle success"></i>' : 
                            '<i class="fas fa-hourglass-half warning"></i>'}
                    </button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function handlePrioritySelect(button) {
    document.querySelectorAll('.priority-option').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function handleFilterSelect(button) {
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    const filteredTasks = filter === 'all' ? tasks : 
                         filter === 'pending' ? tasks.filter(t => !t.completed) : 
                         tasks.filter(t => t.completed);
    renderTasks(filteredTasks);
}

function updateProgress() {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    document.querySelector('.progress').style.strokeDashoffset = 314 - (314 * percentage / 100);
    document.querySelector('.progress-text').textContent = `${percentage}%`;
}

// Global Functions
window.toggleStatus = function(id) {
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
    );
    localStorage.setItem('blossomTasks', JSON.stringify(tasks));
    renderTasks();
    updateProgress();
}

window.deleteTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('blossomTasks', JSON.stringify(tasks));
    renderTasks();
    updateProgress();
}