document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const authOverlay = document.getElementById("authOverlay");

    const loginButton = document.querySelector(".login-btn");
    const closeAuth = document.getElementById("closeAuth");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    const loginFormElement =
        document.getElementById("loginFormElement");

    const registerFormElement =
        document.getElementById("registerFormElement");


    // =====================================================
    // OPEN LOGIN
    // =====================================================

    if (loginButton && authOverlay) {

        loginButton.addEventListener("click", () => {

            authOverlay.classList.add("show");

            if (loginForm && registerForm) {
                loginForm.classList.remove("hidden");
                registerForm.classList.add("hidden");
            }

        });

    }


    // =====================================================
    // CLOSE LOGIN
    // =====================================================

    if (closeAuth && authOverlay) {

        closeAuth.addEventListener("click", () => {

            authOverlay.classList.remove("show");

        });

    }


    // =====================================================
    // CLOSE AUTH BY CLICKING OUTSIDE
    // =====================================================

    if (authOverlay) {

        authOverlay.addEventListener("click", (event) => {

            if (event.target === authOverlay) {

                authOverlay.classList.remove("show");

            }

        });

    }


    // =====================================================
    // SWITCH TO REGISTER
    // =====================================================

    if (showRegister && loginForm && registerForm) {

        showRegister.addEventListener("click", () => {

            loginForm.classList.add("hidden");
            registerForm.classList.remove("hidden");

        });

    }


    // =====================================================
    // SWITCH TO LOGIN
    // =====================================================

    if (showLogin && loginForm && registerForm) {

        showLogin.addEventListener("click", () => {

            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");

        });

    }


    // =====================================================
    // REGISTER
    // =====================================================

    if (registerFormElement) {

        registerFormElement.addEventListener("submit", (event) => {

            event.preventDefault();

            const nameElement =
                document.getElementById("registerName");

            const emailElement =
                document.getElementById("registerEmail");

            const departmentElement =
                document.getElementById("registerDepartment");

            const yearElement =
                document.getElementById("registerYear");

            const passwordElement =
                document.getElementById("registerPassword");


            if (
                !nameElement ||
                !emailElement ||
                !departmentElement ||
                !yearElement ||
                !passwordElement
            ) {

                alert("Registration form is incomplete.");

                return;

            }


            const name =
                nameElement.value.trim();

            const email =
                emailElement.value.trim();

            const department =
                departmentElement.value;

            const year =
                yearElement.value;

            const password =
                passwordElement.value;


            if (
                !name ||
                !email ||
                !department ||
                !year ||
                !password
            ) {

                alert("Please fill in all fields.");

                return;

            }


            const user = {

                name: name,
                email: email,
                department: department,
                year: year,
                password: password

            };


            localStorage.setItem(
                "campusUser",
                JSON.stringify(user)
            );


            alert("Account created successfully! 🎉");


            registerFormElement.reset();


            if (registerForm && loginForm) {

                registerForm.classList.add("hidden");
                loginForm.classList.remove("hidden");

            }

        });

    }


    // =====================================================
    // LOGIN
    // =====================================================

    if (loginFormElement) {

        loginFormElement.addEventListener("submit", (event) => {

            event.preventDefault();


            const emailElement =
                document.getElementById("loginEmail");

            const passwordElement =
                document.getElementById("loginPassword");


            if (!emailElement || !passwordElement) {

                alert("Login form is incomplete.");

                return;

            }


            const email =
                emailElement.value.trim();

            const password =
                passwordElement.value;


            const storedUserText =
                localStorage.getItem("campusUser");


            if (!storedUserText) {

                alert(
                    "No account found. Please create an account first."
                );


                if (loginForm && registerForm) {

                    loginForm.classList.add("hidden");
                    registerForm.classList.remove("hidden");

                }

                return;

            }


            let storedUser;

            try {

                storedUser =
                    JSON.parse(storedUserText);

            } catch (error) {

                localStorage.removeItem("campusUser");

                alert(
                    "Saved account data is corrupted. Please create your account again."
                );

                if (loginForm && registerForm) {

                    loginForm.classList.add("hidden");
                    registerForm.classList.remove("hidden");

                }

                return;

            }


            if (
                email === storedUser.email &&
                password === storedUser.password
            ) {

                alert(
                    `Welcome back, ${storedUser.name}! 🎉`
                );


                loginFormElement.reset();


                window.location.href =
                    "dashboard.html";

            } else {

                alert(
                    "Incorrect email or password."
                );

            }

        });

    }


    // =====================================================
    // HERO - EXPLORE CAMPUS
    // =====================================================

    const exploreButton =
        document.querySelector(".primary-btn");


    if (exploreButton) {

        exploreButton.addEventListener("click", () => {

            const quickAccess =
                document.querySelector(".quick-access");


            if (quickAccess) {

                quickAccess.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    }


    // =====================================================
    // HERO - JOIN CAMPUSCONNECT
    // =====================================================

    const joinButton =
        document.querySelector(".secondary-btn");


    if (joinButton && authOverlay) {

        joinButton.addEventListener("click", () => {

            authOverlay.classList.add("show");


            if (loginForm && registerForm) {

                loginForm.classList.add("hidden");
                registerForm.classList.remove("hidden");

            }

        });

    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    if (
        document.body.classList.contains("dashboard-page")
    ) {

        const storedUserText =
            localStorage.getItem("campusUser");


        // =================================================
        // NO USER - RETURN HOME
        // =================================================

        if (!storedUserText) {

            window.location.href =
                "index.html";

            return;

        }


        let storedUser;

        try {

            storedUser =
                JSON.parse(storedUserText);

        } catch (error) {

            localStorage.removeItem("campusUser");

            window.location.href =
                "index.html";

            return;

        }


        // =================================================
        // USER INFORMATION
        // =================================================

        const dashboardUserName =
            document.getElementById("dashboardUserName");

        const dashboardUserDepartment =
            document.getElementById("dashboardUserDepartment");

        const welcomeUserName =
            document.getElementById("welcomeUserName");

        const userAvatar =
            document.getElementById("userAvatar");


        if (dashboardUserName) {

            dashboardUserName.textContent =
                storedUser.name;

        }


        if (dashboardUserDepartment) {

            dashboardUserDepartment.textContent =
                `${storedUser.department} · ${storedUser.year}`;

        }


        if (welcomeUserName) {

            welcomeUserName.textContent =
                storedUser.name;

        }


        if (userAvatar) {

            userAvatar.textContent =
                storedUser.name
                    .charAt(0)
                    .toUpperCase();

        }


        // =================================================
        // LOGOUT
        // =================================================

        const logoutButton =
            document.getElementById("logoutButton");


        if (logoutButton) {

            logoutButton.addEventListener("click", () => {

                localStorage.removeItem("campusUser");

                window.location.replace(
                    "index.html"
                );

            });

        }


        

        // =================================================
        // DEFAULT ANNOUNCEMENTS
        // =================================================

        const defaultAnnouncements = [

            {
                id: "default-1",
                title: "Semester Examination Schedule Released",
                category: "Academic",
                description:
                    "The semester examination schedule has been released. Students are requested to check the examination dates and prepare accordingly.",
                author: "CampusConnect",
                createdAt: new Date(
                    Date.now() - 2 * 60 * 60 * 1000
                ).toISOString()
            },

            {
                id: "default-2",
                title: "Campus Tech Fest Registration Open",
                category: "Event",
                description:
                    "Registrations are now open for the upcoming campus technology festival. Students can participate in various technical events and competitions.",
                author: "CampusConnect",
                createdAt: new Date(
                    Date.now() - 5 * 60 * 60 * 1000
                ).toISOString()
            },

            {
                id: "default-3",
                title: "Internship Opportunities Available",
                category: "Placement",
                description:
                    "New internship opportunities are available for students from different departments. Check the opportunities section for more information.",
                author: "CampusConnect",
                createdAt: new Date(
                    Date.now() - 24 * 60 * 60 * 1000
                ).toISOString()
            }

        ];


        // =================================================
        // GET ANNOUNCEMENTS
        // =================================================

        function getAnnouncements() {

            const savedAnnouncements =
                localStorage.getItem(
                    announcementStorageKey
                );


            if (!savedAnnouncements) {

                localStorage.setItem(
                    announcementStorageKey,
                    JSON.stringify(defaultAnnouncements)
                );

                return [...defaultAnnouncements];

            }


            try {

                const announcements =
                    JSON.parse(savedAnnouncements);


                if (Array.isArray(announcements)) {

                    return announcements;

                }

            } catch (error) {

                console.log(
                    "Could not read announcements."
                );

            }


            localStorage.setItem(
                announcementStorageKey,
                JSON.stringify(defaultAnnouncements)
            );


            return [...defaultAnnouncements];

        }


        // =================================================
        // SAVE ANNOUNCEMENTS
        // =================================================

        function saveAnnouncements(announcements) {

            localStorage.setItem(
                announcementStorageKey,
                JSON.stringify(announcements)
            );

        }


        // =================================================
        // FORMAT TIME
        // =================================================

        function getTimeAgo(dateValue) {

            const createdDate =
                new Date(dateValue);

            const currentDate =
                new Date();

            const difference =
                currentDate - createdDate;


            const seconds =
                Math.floor(difference / 1000);

            const minutes =
                Math.floor(seconds / 60);

            const hours =
                Math.floor(minutes / 60);

            const days =
                Math.floor(hours / 24);


            if (seconds < 60) {

                return "Just now";

            }


            if (minutes < 60) {

                return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

            }


            if (hours < 24) {

                return `${hours} hour${hours === 1 ? "" : "s"} ago`;

            }


            if (days < 7) {

                return `${days} day${days === 1 ? "" : "s"} ago`;

            }


            return createdDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        }


        // =================================================
        // CATEGORY ICON
        // =================================================

        function getCategoryIcon(category) {

            if (category === "Academic") {
                return "📚";
            }

            if (category === "Event") {
                return "🎉";
            }

            if (category === "Placement") {
                return "💼";
            }

            if (category === "Important") {
                return "⚠️";
            }

            return "📢";

        }


        // =================================================
        // OPEN ANNOUNCEMENT MODAL
        // =================================================

        function openAnnouncementModal() {

            if (!announcementModal) {
                return;
            }


            announcementModal.classList.add("show");


            if (announcementForm) {

                announcementForm.reset();

            }


            if (announcementTitle) {

                setTimeout(() => {

                    announcementTitle.focus();

                }, 100);

            }

        }


        // =================================================
        // CLOSE ANNOUNCEMENT MODAL
        // =================================================

        // =================================================
// CLOSE ANNOUNCEMENT MODAL
// =================================================

function closeAnnouncementModal() {

    if (announcementModal) {

        announcementModal.classList.remove("show");

    }

}


        // =================================================
        // CREATE ANNOUNCEMENT BUTTON
        // =================================================

        if (createAnnouncementButton) {

            createAnnouncementButton.addEventListener(
                "click",
                openAnnouncementModal
            );

        }


        


        // =================================================
        // CLOSE ANNOUNCEMENT BUTTON
        // =================================================

        if (closeAnnouncementButton) {

            closeAnnouncementButton.addEventListener(
                "click",
                closeAnnouncementModal
            );

        }


        // =================================================
        // CLOSE MODAL BY CLICKING OUTSIDE
        // =================================================

        if (announcementModal) {

            announcementModal.addEventListener(
                "click",
                (event) => {

                    if (
                        event.target === announcementModal
                    ) {

                        closeAnnouncementModal();

                    }

                }
            );

        }


        // =================================================
        // ESC KEY CLOSES MODAL
        // =================================================

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    announcementModal &&
                    announcementModal.classList.contains("show")
                ) {

                    closeAnnouncementModal();

                }

            }
        );


        // =================================================
        // DISPLAY ANNOUNCEMENTS
        // =================================================

        function renderAnnouncements() {

            if (!announcementList) {
                return;
            }


            const announcements =
                getAnnouncements();


            announcements.sort(
                (a, b) => {

                    return new Date(b.createdAt) -
                        new Date(a.createdAt);

                }
            );


            announcementList.innerHTML = "";


            if (announcements.length === 0) {

                const emptyMessage =
                    document.createElement("div");

                emptyMessage.className =
                    "announcement-empty";

                emptyMessage.textContent =
                    "No announcements available yet.";

                announcementList.appendChild(
                    emptyMessage
                );


            } else {

                announcements.forEach(
                    (announcement) => {

                        const announcementItem =
                            document.createElement("div");

                        announcementItem.className =
                            "dashboard-list-item announcement-item";


                        // -----------------------------
                        // ICON
                        // -----------------------------

                        const icon =
                            document.createElement("div");

                        icon.className =
                            "list-icon";

                        icon.textContent =
                            getCategoryIcon(
                                announcement.category
                            );


                        // -----------------------------
                        // CONTENT
                        // -----------------------------

                        const content =
                            document.createElement("div");

                        content.className =
                            "list-content";


                        const title =
                            document.createElement("h3");

                        title.textContent =
                            announcement.title;


                        const description =
                            document.createElement("p");

                        description.textContent =
                            announcement.description;


                        const meta =
                            document.createElement("small");

                        meta.textContent =
                            `${announcement.category} · ${getTimeAgo(announcement.createdAt)} · Posted by ${announcement.author}`;


                        content.appendChild(title);
                        content.appendChild(description);
                        content.appendChild(meta);


                        // -----------------------------
                        // DELETE BUTTON
                        // -----------------------------

                        if (
                            announcement.author ===
                            storedUser.name
                        ) {

                            const deleteButton =
                                document.createElement("button");

                            deleteButton.className =
                                "announcement-delete-btn";

                            deleteButton.textContent =
                                "Delete";

                            deleteButton.dataset.id =
                                announcement.id;


                            deleteButton.addEventListener(
                                "click",
                                () => {

                                    const shouldDelete =
                                        confirm(
                                            "Are you sure you want to delete this announcement?"
                                        );


                                    if (!shouldDelete) {
                                        return;
                                    }


                                    const updatedAnnouncements =
                                        getAnnouncements().filter(
                                            (item) =>
                                                String(item.id) !==
                                                String(announcement.id)
                                        );


                                    saveAnnouncements(
                                        updatedAnnouncements
                                    );


                                    renderAnnouncements();

                                }
                            );


                            content.appendChild(
                                deleteButton
                            );

                        }


                        announcementItem.appendChild(icon);
                        announcementItem.appendChild(content);


                        announcementList.appendChild(
                            announcementItem
                        );

                    }
                );

            }


            // =================================================
            // UPDATE ANNOUNCEMENT COUNT
            // =================================================

            if (announcementCount) {

                announcementCount.textContent =
                    announcements.length;

            }

        }


        // =================================================
        // SUBMIT NEW ANNOUNCEMENT
        // =================================================

        if (announcementForm) {

            announcementForm.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();


                    const title =
                        announcementTitle
                            ? announcementTitle.value.trim()
                            : "";

                    const category =
                        announcementCategory
                            ? announcementCategory.value
                            : "";

                    const description =
                        announcementDescription
                            ? announcementDescription.value.trim()
                            : "";


                    // -----------------------------
                    // VALIDATION
                    // -----------------------------

                    if (!title) {

                        alert(
                            "Please enter an announcement title."
                        );

                        return;

                    }


                    if (!category) {

                        alert(
                            "Please select a category."
                        );

                        return;

                    }


                    if (!description) {

                        alert(
                            "Please enter an announcement description."
                        );

                        return;

                    }


                    // -----------------------------
                    // CREATE ANNOUNCEMENT
                    // -----------------------------

                    const newAnnouncement = {

                        id:
                            Date.now().toString(),

                        title:
                            title,

                        category:
                            category,

                        description:
                            description,

                        author:
                            storedUser.name,

                        createdAt:
                            new Date().toISOString()

                    };


                    const announcements =
                        getAnnouncements();


                    announcements.push(
                        newAnnouncement
                    );


                    saveAnnouncements(
                        announcements
                    );


                    // -----------------------------
                    // UPDATE SCREEN
                    // -----------------------------

                    renderAnnouncements();


                    // -----------------------------
                    // RESET FORM
                    // -----------------------------

                    announcementForm.reset();


                    // -----------------------------
                    // CLOSE MODAL
                    // -----------------------------

                    closeAnnouncementModal();


                    alert(
                        "Announcement posted successfully! 🎉"
                    );

                }
            );

        }


        // =================================================
        // INITIAL ANNOUNCEMENT DISPLAY
        // =================================================

        renderAnnouncements();

    }

// =========================
// SHARE RESOURCE
// =========================

function shareResource() {

    const resourceName = prompt(
        "Enter the name of the resource:"
    );

    if (!resourceName || resourceName.trim() === "") {
        return;
    }

    const subject = prompt(
        "Enter the subject/category:"
    );

    if (!subject || subject.trim() === "") {
        return;
    }

    const newResource = {
        name: resourceName.trim(),
        subject: subject.trim(),
        date: new Date().toLocaleDateString()
    };

    let resources =
        JSON.parse(
            localStorage.getItem("campusResources")
        ) || [];

    resources.push(newResource);

    localStorage.setItem(
        "campusResources",
        JSON.stringify(resources)
    );

    alert(
        "Resource shared successfully! 📚"
    );
    updateResourceCount();
}
// =========================
// DISPLAY SAVED RESOURCES
// =========================

function displayResources() {

    const resourcesGrid =
        document.querySelector(".resources-grid");

    if (!resourcesGrid) {
        return;
    }

    const resources =
        JSON.parse(
            localStorage.getItem("campusResources")
        ) || [];

    resources.forEach(function(resource) {

        const card = document.createElement("div");

        card.className = "resource-card";

        card.innerHTML = `
            <div class="resource-icon">
                📚
            </div>

            <div class="resource-content">

                <span class="resource-category">
                    ${resource.subject}
                </span>

                <h3>
                    ${resource.name}
                </h3>

                <p>
                    Shared by a CampusConnect student.
                </p>

                <div class="resource-meta">
                    <span>📄 Resource</span>
                    <span>📅 ${resource.date}</span>
                </div>

                <button
                    class="resource-view-btn"
                    onclick="openResource('${resource.name.replace(/'/g, "\\'")}')"
                >
                    View Resource
                </button>

            </div>
        `;

        resourcesGrid.appendChild(card);

    });
}

displayResources();
function updateResourceCount() {

    const resourceCount =
        document.getElementById("resourceCount");

    if (!resourceCount) {
        return;
    }

    const resources =
        JSON.parse(
            localStorage.getItem("campusResources")
        ) || [];

    resourceCount.textContent =
        28 + resources.length;
}

updateResourceCount();
// =========================
// CLOSE ANNOUNCEMENT MODAL
// =========================

const announcementModal =
    document.getElementById("announcementModal");

const closeAnnouncementBtn =
    document.getElementById("closeAnnouncementBtn");

// =================================================
// CLOSE ANNOUNCEMENT BUTTON
// =================================================

if (closeAnnouncementButton) {

    closeAnnouncementButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            closeAnnouncementModal();

        }
    );

}
if (announcementModal) {
    announcementModal.addEventListener("click", function (event) {

        if (event.target === announcementModal) {
            announcementModal.style.display = "none";
        }

    });
}
    // =====================================================
    // JAVASCRIPT LOADED
    // =====================================================

    console.log(
        "CampusConnect JavaScript loaded successfully!"
    );

});

function openResource(resourceName) {
    alert(
        "Resource: " + resourceName +
        "\n\nThis resource is available on CampusConnect."
    );
}
// =====================================================
// ASK QUESTION SYSTEM
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const askQuestionButton =
        document.getElementById("askQuestionButton");

    const questionModal =
        document.getElementById("questionModal");

    const closeQuestionButton =
        document.getElementById("closeQuestionButton");

    const questionForm =
        document.getElementById("questionForm");


    // OPEN MODAL
    if (askQuestionButton && questionModal) {

        askQuestionButton.addEventListener(
            "click",
            function () {

                questionModal.classList.add("show");

            }
        );

    }


    // CLOSE MODAL
    if (closeQuestionButton && questionModal) {

        closeQuestionButton.addEventListener(
            "click",
            function () {

                questionModal.classList.remove("show");

            }
        );

    }


    // CLOSE WHEN CLICKING OUTSIDE
    if (questionModal) {

        questionModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === questionModal
                ) {

                    questionModal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    // ESCAPE KEY
    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                questionModal &&
                questionModal.classList.contains("show")
            ) {

                questionModal.classList.remove(
                    "show"
                );

            }

        }
    );


    // SUBMIT QUESTION
    if (questionForm) {

        questionForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const title =
                    document.getElementById(
                        "questionTitle"
                    ).value.trim();

                const category =
                    document.getElementById(
                        "questionCategory"
                    ).value;

                const description =
                    document.getElementById(
                        "questionDescription"
                    ).value.trim();


                if (
                    !title ||
                    !category ||
                    !description
                ) {

                    alert(
                        "Please fill in all fields."
                    );

                    return;

                }


                const questions =
                    JSON.parse(
                        localStorage.getItem(
                            "campusQuestions"
                        )
                    ) || [];


                const storedUser =
                    JSON.parse(
                        localStorage.getItem(
                            "campusUser"
                        )
                    ) || {};


                questions.push({

                    id: Date.now(),

                    title: title,

                    category: category,

                    description: description,

                    author:
                        storedUser.name ||
                        "CampusConnect Student",

                    date:
                        new Date().toLocaleDateString(
                            "en-IN"
                        )

                });


                localStorage.setItem(
                    "campusQuestions",
                    JSON.stringify(
                        questions
                    )
                );


                questionForm.reset();

                questionModal.classList.remove(
                    "show"
                );


                alert(
                    "Question posted successfully! 🎉"
                );

            }
        );

    }

});
// =====================================================
// GLOBAL SEARCH
// =====================================================

const globalSearch = document.getElementById("globalSearch");
const globalSearchButton = document.getElementById("globalSearchButton");

if (globalSearch && globalSearchButton) {

    globalSearchButton.addEventListener("click", function () {

        const searchText =
            globalSearch.value.trim().toLowerCase();

        if (!searchText) {
            alert("Please enter something to search.");
            return;
        }

        const results = [];

        // QUESTIONS
        const questions =
            JSON.parse(localStorage.getItem("campusQuestions")) || [];

        questions.forEach(item => {

            if (
                item.title.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText) ||
                item.category.toLowerCase().includes(searchText)
            ) {
                results.push(
                    "❓ Question: " + item.title
                );
            }

        });


        // OPPORTUNITIES
        const opportunities =
            JSON.parse(localStorage.getItem("campusOpportunities")) || [];

        opportunities.forEach(item => {

            if (
                item.title.toLowerCase().includes(searchText) ||
                item.company.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText)
            ) {
                results.push(
                    "💼 Opportunity: " + item.title
                );
            }

        });


        // LOST & FOUND
        const lostItems =
            JSON.parse(localStorage.getItem("campusLostItems")) || [];

        lostItems.forEach(item => {

            if (
                item.name.toLowerCase().includes(searchText) ||
                item.location.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText)
            ) {
                results.push(
                    "🔍 Lost & Found: " + item.name
                );
            }

        });


        // EVENTS
        const events =
            JSON.parse(localStorage.getItem("campusEvents")) || [];

        events.forEach(item => {

            if (
                item.name.toLowerCase().includes(searchText) ||
                item.location.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText)
            ) {
                results.push(
                    "📅 Event: " + item.name
                );
            }

        });


        if (results.length === 0) {

            alert(
                "No results found for: " +
                globalSearch.value
            );

        } else {

            alert(
                "Search Results:\n\n" +
                results.join("\n")
            );

        }

    });

}// =====================================================
// BOOKMARK SYSTEM
// =====================================================

function getBookmarks() {
    return JSON.parse(
        localStorage.getItem("campusBookmarks")
    ) || [];
}


function saveBookmark(type, title, description) {

    const bookmarks = getBookmarks();

    const exists = bookmarks.some(
        item =>
            item.title === title &&
            item.type === type
    );

    if (exists) {
        alert("Already bookmarked 🔖");
        return;
    }

    bookmarks.push({
        id: Date.now(),
        type: type,
        title: title,
        description: description
    });

    localStorage.setItem(
        "campusBookmarks",
        JSON.stringify(bookmarks)
    );

    displayBookmarks();

    alert("Added to bookmarks 🔖");
}


function removeBookmark(id) {

    let bookmarks = getBookmarks();

    bookmarks = bookmarks.filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "campusBookmarks",
        JSON.stringify(bookmarks)
    );

    displayBookmarks();
}


function displayBookmarks() {

    const bookmarks = getBookmarks();

    const bookmarksList =
        document.getElementById("bookmarksList");

    if (!bookmarksList) {
        return;
    }

    if (bookmarks.length === 0) {

        bookmarksList.innerHTML = `
            <div class="bookmark-card">
                <h3>No bookmarks yet 🔖</h3>
                <p>
                    Save useful questions, opportunities,
                    events and resources here.
                </p>
            </div>
        `;

        return;
    }

    bookmarksList.innerHTML =
        bookmarks.map(item => `

            <div class="bookmark-card">

                <span class="bookmark-type">
                    ${item.type}
                </span>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.description}
                </p>

                <button
                    class="remove-bookmark"
                    onclick="removeBookmark(${item.id})"
                >
                    Remove Bookmark
                </button>

            </div>

        `).join("");
}


displayBookmarks();
// =====================================================
// NOTIFICATIONS
// =====================================================

function displayNotifications() {

    const notificationsList =
        document.getElementById("notificationsList");

    if (!notificationsList) {
        return;
    }

    const notifications = [
        {
            title: "📢 New Announcement",
            message: "Semester examination schedule has been updated.",
            date: "Today"
        },
        {
            title: "📅 Upcoming Event",
            message: "Campus Hackathon 2026 is scheduled for 18 September.",
            date: "Today"
        },
        {
            title: "💼 New Opportunity",
            message: "A new internship opportunity has been posted.",
            date: "Yesterday"
        },
        {
            title: "📚 New Resource",
            message: "New DBMS study materials are available.",
            date: "Yesterday"
        }
    ];

    notificationsList.innerHTML =
        notifications.map(notification => `
            
            <div class="notification-card">

                <div class="notification-icon">
                    🔔
                </div>

                <div class="notification-content">

                    <h3>
                        ${notification.title}
                    </h3>

                    <p>
                        ${notification.message}
                    </p>

                    <small>
                        ${notification.date}
                    </small>

                </div>

            </div>

        `).join("");
}

displayNotifications();
// =====================================================
// PROFILE
// =====================================================

function displayProfile() {

    const user = JSON.parse(
        localStorage.getItem("campusUser")
    );

    if (!user) {
        return;
    }

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const profileDepartment =
        document.getElementById("profileDepartment");

    const profileYear =
        document.getElementById("profileYear");

    const profileAvatar =
        document.getElementById("profileAvatar");

    if (profileName) {
        profileName.textContent =
            user.name || "Student";
    }

    if (profileEmail) {
        profileEmail.textContent =
            user.email || "Not available";
    }

    if (profileDepartment) {
        profileDepartment.textContent =
            user.department || "Not available";
    }

    if (profileYear) {
        profileYear.textContent =
            user.year || "Not available";
    }

    if (profileAvatar) {

        const firstLetter =
            (user.name || "Student")
            .charAt(0)
            .toUpperCase();

        profileAvatar.textContent =
            firstLetter;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    displayProfile();
});// =========================
// CAMPUS STATISTICS
// =========================

function updateStatistics() {

    // Current logged-in student
    const currentUser = JSON.parse(
        localStorage.getItem("campusUser")
    );

    // Announcements
    const announcements = JSON.parse(
        localStorage.getItem("campusAnnouncements")
    ) || [];

    // Resources
    const sharedResources = JSON.parse(
        localStorage.getItem("campusResources")
    ) || [];

    // Opportunities
    const opportunities = JSON.parse(
        localStorage.getItem("campusOpportunities")
    ) || [];

    // Events
    const events = JSON.parse(
        localStorage.getItem("campusEvents")
    ) || [];

    // Questions
    const questions = JSON.parse(
        localStorage.getItem("campusQuestions")
    ) || [];

    // Lost & Found
    const lostItems = JSON.parse(
        localStorage.getItem("campusLostItems")
    ) || [];


    // Total Students
    const totalStudents =
        document.getElementById("totalStudents");

    if (totalStudents) {

        totalStudents.textContent =
            currentUser ? "1" : "0";

    }


    // Total Announcements
    const totalAnnouncements =
        document.getElementById("totalAnnouncements");

    if (totalAnnouncements) {

        totalAnnouncements.textContent =
            announcements.length;

    }


    // Total Resources
    const totalResources =
        document.getElementById("totalResources");

    if (totalResources) {

        totalResources.textContent =
            28 + sharedResources.length;

    }


    // Total Opportunities
    const totalOpportunities =
        document.getElementById("totalOpportunities");

    if (totalOpportunities) {

        totalOpportunities.textContent =
            3 + opportunities.length;

    }


    // Total Events
    const totalEvents =
        document.getElementById("totalEvents");

    if (totalEvents) {

        totalEvents.textContent =
            3 + events.length;

    }


    // Total Questions
    const totalQuestions =
        document.getElementById("totalQuestions");

    if (totalQuestions) {

        totalQuestions.textContent =
            questions.length;

    }


    // Total Lost & Found
    const totalLostItems =
        document.getElementById("totalLostItems");

    if (totalLostItems) {

        totalLostItems.textContent =
            lostItems.length;

    }

}


// Run statistics when dashboard loads

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateStatistics();

    }
);


// Update statistics whenever the page becomes visible again

document.addEventListener(
    "visibilitychange",
    function () {

        if (!document.hidden) {

            updateStatistics();

        }

    }
);