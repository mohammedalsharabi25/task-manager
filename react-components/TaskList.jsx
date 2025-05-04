function TaskList() {
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    return (
        <div className="react-task-list">
            <h2>React Task List</h2>
            <div className="task-cards">
                {tasks.map(task => (
                    <div key={task.id} className={`task-card priority-${task.priority}`}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="task-meta">
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            <span>Status: {task.completed ? '✅' : '⏳'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<TaskList />, document.getElementById('react-root'));