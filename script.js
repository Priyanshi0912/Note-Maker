document.addEventListener("DOMContentLoaded", function() {
    const notesContainer = document.getElementById("noteContainer");
    const createBtn = document.getElementById("createNoteButton");

    // Maximum number of notes per page
    const notesPerPage = 6;

    // Function to show notes based on current page
    function showNotes(pageNumber) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const startIndex = (pageNumber - 1) * notesPerPage;
        const endIndex = startIndex + notesPerPage;
        const notesToShow = notes.slice(startIndex, endIndex);
        notesContainer.innerHTML = '';
        notesToShow.forEach(note => {
            const inputBox = createNoteElement(note);
            notesContainer.appendChild(inputBox);
        });
        addDeleteEventListeners();
        addEditEventListeners();
    }

    // Function to create a new note element
    function createNoteElement(text) {
        const inputBox = document.createElement("p");
        const img = document.createElement("img");
        inputBox.className = "inputbox";
        inputBox.setAttribute("contenteditable", "true");
        inputBox.textContent = text || '';
        img.src = "images/delete.png";
        img.alt = "Delete Icon"; 
        inputBox.appendChild(img);
        return inputBox;
    }

    // Function to update notes in local storage
    function updateStorage() {
        const notes = Array.from(notesContainer.querySelectorAll(".inputbox")).map(inputBox => inputBox.textContent);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    // Function to add event listeners for deleting notes
    function addDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll(".inputbox img");
        deleteButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.target.parentElement.remove();
                updateStorage();
            });
        });
    }

    // Function to add event listeners for editing notes
    function addEditEventListeners() {
        const inputBoxes = document.querySelectorAll(".inputbox");
        inputBoxes.forEach(box => {
            box.addEventListener("input", () => {
                updateStorage();
            });
        });
    }

    // Event listener for creating a new note
    createBtn.addEventListener("click", () => {
        const inputBox = createNoteElement();
        notesContainer.appendChild(inputBox);
        inputBox.focus();
        updateStorage();
    });

    // Initial display of notes
    showNotes(1);

    // Event listener for pagination
    document.addEventListener("click", event => {
        if (event.target.classList.contains("pagination-button")) {
            const pageNumber = parseInt(event.target.textContent);
            showNotes(pageNumber);
        }
    });

    // Function to generate pagination buttons
    function generatePaginationButtons() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const totalPages = Math.ceil(notes.length / notesPerPage);
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = 'pagination-button';
            pagination.appendChild(button);
        }
        document.body.appendChild(pagination);
    }

    // Generate initial pagination buttons
    generatePaginationButtons();
});
