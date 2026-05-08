const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
        technology: ["Python"],
        completed: true,
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
        technology: ["HTML", "CSS"],
        completed: true,
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
        technology: ["Python"],
        completed: true,
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
        technology: ["C#"],
        completed: true,
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true,
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false,
    },
];


/******************** Course filter ***********************/
const coursesContainer = document.querySelector("#courses-container");
const filterButtons = document.querySelectorAll(".filter-button");

function renderCourses(courseList) {
    if (!coursesContainer) return;

    coursesContainer.innerHTML = courseList
        .map((course) => {
            const techTags = course.technology
                ? course.technology.map((t) => `<span class="tech-tag">${t}</span>`).join("")
                : "";
            const statusClass = course.completed ? "completed" : "in-progress";
            const statusLabel = course.completed ? "Completed" : "In progress";
            return `
                <article class="course-card ${statusClass}">
                    <h3>${course.subject} ${course.number}: ${course.title}</h3>
                    <p class="credits"><strong>Credits:</strong> ${course.credits}</p>
                    <p class="certificate"><strong>Certificate:</strong> ${course.certificate}</p>
                    <p class="description">${course.description}</p>
                    <div class="tech-list"><strong>Technology:</strong> ${techTags}</div>
                    <p class="status ${statusClass}">${statusLabel}</p>
                </article>
            `;
        })
        .join("");
}

function filterCourses(subject) {
    if (!Array.isArray(courses)) return [];
    return subject === "All" ? courses : courses.filter((course) => course.subject === subject);
}

function setActiveButton(selectedButton) {
    filterButtons.forEach((button) => {
        button.classList.toggle("active", button === selectedButton);
    });
}

function initializeCourseFilter() {
    if (!coursesContainer || filterButtons.length === 0) return;

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filterValue = button.textContent.trim();
            setActiveButton(button);
            renderCourses(filterCourses(filterValue));
        });
    });

    const defaultButton = Array.from(filterButtons).find((button) => button.textContent.trim() === "All") || filterButtons[0];
    if (defaultButton) {
        setActiveButton(defaultButton);
        renderCourses(filterCourses(defaultButton.textContent.trim()));
    }
}

initializeCourseFilter();
/******************** End Course filter ***********************/