let nav = 0;

const calendar = document.getElementById('calendar');
const weekdays = ['dimance', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

function remplir(numero) {
  numero = numero.toString();
  while (numero.length < 2) {
    numero = "0" + numero;
  }
  return numero;
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('fr', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const paddingDays = weekdays.indexOf(dateString.split(' ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('fr', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      daySquare.num_day = remplir(i - paddingDays) + remplir(month + 1) + year;
      daySquare.day = (i - paddingDays).toString() + " " + document.getElementById('monthDisplay').innerText;

      daySquare.addEventListener("click", function () {
        document.getElementById("event_maker").style.display = "flex";
      })

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function initButtons() {
  document.getElementById('next').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('prev').addEventListener('click', () => {
    nav--;
    load();
  });
}

initButtons();
load();
