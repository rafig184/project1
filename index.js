const DOM = {
    textInput: null,
    dateInput: null,
    timeInput: null,
    priorityCheck: null,
    darkModeSwitch: null,
}

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function init() {
    DOM.textInput = document.querySelector("#noteTextArea");
    DOM.dateInput = document.querySelector("#dueDate");
    DOM.timeInput = document.querySelector("#dueTime");
    DOM.notesBlocks = document.querySelector("#notesBlocks");
    DOM.priorityCheck = document.querySelector("#priorityCheck");
    DOM.darkModeSwitch = document.querySelector("#darkModeSwitch");
    darkModeSwitch.addEventListener("click", darkModeFn);


    const addNewNotButton = document.querySelector("#addNoteButton");
    addNewNotButton.addEventListener("click", addNewNoteFn);

    const clearFormButton = document.querySelector("#clearForm");
    clearFormButton.addEventListener("click", deleteAll);

    draw(notes)
}

// function that add a new note and push it to the array and the local storage
function addNewNoteFn() {

    if (DOM.textInput.value === "") {
        return alert("Please enter text to the note!")
    } else if (DOM.dateInput.value === "") {
        return alert("Please select Due date!")
    } else if (DOM.dateInput.value < getCurrentDate()) {
        return alert("Please select a future date!")
    } else if (DOM.timeInput.value === "") {
        return alert("Please select a Due time!")
    }


    notes.push(new Note(DOM.textInput.value, DOM.dateInput.value = ((new Date(DOM.dateInput.value)).toLocaleDateString('en-gb')), DOM.timeInput.value, DOM.priorityCheck.checked, DOM.darkModeSwitch.checked));
    localStorage.setItem("notes", JSON.stringify(notes));
    draw(notes, true);
    clearForm();
}

//function that clear the form
function clearForm() {
    DOM.textInput.value = ""
    DOM.dateInput.value = ""
    DOM.timeInput.value = ""
    DOM.notesBlocks.value = ""
    DOM.priorityCheck.checked = false
}

function clearNotesFn() {
    DOM.notesBlocks.innerHTML = "";
}

//function that delete all the array, the localstorage and the notes
function deleteAll() {
    notes.splice(0);
    localStorage.setItem("notes", JSON.stringify(notes));
    DOM.textInput.value = ""
    DOM.dateInput.value = ""
    DOM.timeInput.value = ""
    DOM.priorityCheck.checked = false
    draw(notes);
}

//dark mode function
function darkModeFn() {
    let element = document.body;
    element.classList.toggle("darkMode");
}

//giving the current date for the date validation
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

//draw function that create and draw the notes
function draw(notesArray, fadeInLastNote = false) {
    if (Array.isArray(notesArray) === false) return
    clearNotesFn()

    for (let index = 0; index < notesArray.length; index++) {
        const currentNote = notesArray[index];

        const noteDiv = document.createElement("div")
        noteDiv.classList.add("notesbg")
        if (fadeInLastNote && index === (notesArray.length - 1)) {
            noteDiv.classList.add("fadein")
        }

        const uperDiv = document.createElement("div")
        uperDiv.classList.add("textArea")

        const action = document.createElement("span")
        action.classList.add("buttonSpan")

        const ulText = document.createElement("ul")
        ulText.classList.add("FirstList")

        const liText = document.createElement("li")
        liText.innerText = currentNote.text

        const lowerDiv = document.createElement("div")
        lowerDiv.classList.add("secondtextArea")

        const dateAndTimeUl = document.createElement("ul")
        dateAndTimeUl.classList.add("SecondList")

        let highPriority = undefined;
        if (currentNote.priority === true) {
            highPriority = document.createElement("li")
            highPriority.classList.add("bi-flag-fill")
        }

        const liDate = document.createElement("li")
        liDate.innerText = currentNote.date;

        const liTime = document.createElement("li")
        liTime.innerText = currentNote.time;

        const xButton = document.createElement("button")
        xButton.classList.add("buttonSpan", "bi", "bi-x-circle-fill")
        action.appendChild(xButton)
        xButton.addEventListener("click", function () {
            const indexToDelte = notes.findIndex(function (cn) {
                return currentNote.text === cn.text
            });
            notes.splice(indexToDelte, 1);
            draw(notes)

            localStorage.setItem("notes", JSON.stringify(notes));
        })


        ulText.append(liText)
        dateAndTimeUl.append(liDate, liTime)
        uperDiv.append(ulText)
        lowerDiv.append(dateAndTimeUl, highPriority === undefined ? "" : highPriority)

        noteDiv.append(xButton, uperDiv, lowerDiv)
        DOM.notesBlocks.append(noteDiv)
    }
}

init()