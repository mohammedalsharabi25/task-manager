// Skills.jsx
function Skills() {
    const skills = ["HTML", "CSS", "JavaScript", "React", "Git"];
    return (
        <section id="skills" className="section">
            <h2>Skills</h2>
            <ul className="skills-list">
                {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </section>
    );
}

// Render the component
ReactDOM.render(<Skills />, document.getElementById('skills-root'));