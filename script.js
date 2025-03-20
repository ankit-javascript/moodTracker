
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let highlightedMonth = new Date();
let selectedDate = new Date(highlightedMonth.getFullYear(), highlightedMonth.getMonth(), highlightedMonth.getDate());

function renderSelector() {
  let monthYear = document.getElementById('monthYear');
  monthYear.innerHTML = '';
  monthYear.textContent = `${MONTH[highlightedMonth.getMonth()]} ${highlightedMonth.getFullYear()}`;
}

function renderCalendar() {

  let calendarGrid = document.getElementById('calendarGrid');
  calendarGrid.innerHTML = '';

  for(i = 1; i <= 7; i++) {
    calendarGrid.appendChild(createDateDiv(`div${i}`, DAYS[i-1]));
  }

  let firstDateOfMonth = new Date(highlightedMonth.getFullYear(), highlightedMonth.getMonth(), 1);
  let lastDateOfMonth = new Date(highlightedMonth.getFullYear(), highlightedMonth.getMonth() + 1, 0);

  for(i = firstDateOfMonth.getDate(); i <= lastDateOfMonth.getDate(); i++) {
    const id = `div${ i + firstDateOfMonth.getDay() + 7}`;
   

    const iDate = new Date(highlightedMonth.getFullYear(), highlightedMonth.getMonth(), i);

    let dateDiv = createDateDiv(id, i);

    if (selectedDate.getFullYear() === iDate.getFullYear() && selectedDate.getMonth() === iDate.getMonth() && selectedDate.getDate() === iDate.getDate()) {
      dateDiv.style.border = 'solid';
      dateDiv.style.borderRadius = '100%';
    }

    if (localStorage.getItem(setLocalStorageKey(iDate))) {
      dateDiv.style.color = 'red';
    }

    dateDiv.onclick = function() { 
      selectedDate = iDate;
      render();
    };

    calendarGrid.appendChild(dateDiv);
  }
}

function renderNote() {
  let noteTitle = document.getElementById('noteTitle');
  const localValue = localStorage.getItem(setLocalStorageKey(selectedDate)) || ''

  noteTitle.innerHTML = `Mood for ${selectedDate.toDateString()}:`;
  noteContent.innerHTML = localValue;

}

function render() {
  renderSelector();
  renderCalendar();
  renderNote();
}

render();

function createDateDiv(id, text) {
  let dateDiv = document.createElement('div');
  dateDiv.setAttribute("id", id);
  let dateDivText = document.createElement("span");
  dateDivText.textContent = text;
  dateDiv.appendChild(dateDivText);
  return dateDiv;
}

function prevMonth() {
  highlightedMonth.setMonth(highlightedMonth.getMonth() - 1);
  selectedDate.setMonth(selectedDate.getMonth() - 1);
  render();
}

function nextMonth() {
  highlightedMonth.setMonth(highlightedMonth.getMonth() + 1);
  selectedDate.setMonth(selectedDate.getMonth() + 1);
  render();
}

function prevYear() {
  highlightedMonth.setFullYear(highlightedMonth.getFullYear() - 1);
  selectedDate.setFullYear(selectedDate.getFullYear() - 1);
  render();
}

function nextYear() {
  highlightedMonth.setFullYear(highlightedMonth.getFullYear() + 1);
  selectedDate.setFullYear(selectedDate.getFullYear() + 1);
  render();
}

function addNote() {

  localStorage.setItem(setLocalStorageKey(selectedDate), document.querySelector('input[name="emoji"]:checked').value);

  render();
}


function setLocalStorageKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}


const emojiRadios = document.querySelectorAll('input[name="emoji"]');

emojiRadios.forEach(radio => {
  radio.addEventListener('change', addNote);  
});
