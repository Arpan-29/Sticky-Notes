const addButton = document.querySelector('.add-btn');
const noteContainer = document.querySelector('.main-container');

const updateLSData = () => {

    const textareaData = document.querySelectorAll('textarea');
    const notes = [];

    textareaData.forEach((note) => {
        return notes.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('card');
    note.classList.add('col-lg-4');
    note.classList.add('col-md-6');
    note.classList.add('col-12');

    const htmlData = `
    <div class="card-body">
        <div class="d-grid gap-2 d-flex justify-content-end">
            <button class="btn btn-primary border-0 shadow-none rounded-circle edit-btn" type="button">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-primary border-0 shadow-none rounded-circle trash-btn" type="button">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        <div class="card-text ${text? "": "hidden"}"></div>
        <textarea class="${text? "hidden": ""} form-control mt-3 border-0 shadow-none" id="card-text" rows="6"></textarea>
    </div>  `;

    note.insertAdjacentHTML("afterbegin", htmlData);

    const editButton = note.querySelector('.edit-btn');
    const deleteButton = note.querySelector('.trash-btn');
    const cardText = note.querySelector('.card-text');
    const textarea = note.querySelector('textarea');

    deleteButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    textarea.value = text;
    text = text.replaceAll('\n', '<br>');
    cardText.innerHTML = text;
    text = text.replaceAll('<br>', '\n');

    editButton.addEventListener('click', () => {
        cardText.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change', (event) => {
        let value = event.target.value;
        value = value.replaceAll('\n', '<br>');
        cardText.innerHTML = value;
        value = value.replaceAll('<br>', '\n');

        updateLSData();
    })

    noteContainer.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) { 
    notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote());