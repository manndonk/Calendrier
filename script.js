let nav = 0;

const calendar = document.getElementById('calendar');
const weekdays = ['dimance', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

let date_selection;
let evenements = [];

function remplir(numero) {
  numero = numero.toString();
  while (numero.length < 2) {
    numero = "0" + numero;
  }
  return numero;
}

function creer_evenement() {
  let evenement = [document.getElementById('titre').value, document.getElementById('desc').value, document.getElementById('couleur').value, date_selection]
  document.getElementById('titre').value = '';
  document.getElementById('desc').value = '';
  document.getElementById('couleur').value = "#000000";
  document.getElementById("creation_evenement").style.display = "none";
  evenements.push(evenement);
  load();
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

      daySquare.jour_num = remplir(i - paddingDays) + remplir(month) + year;
      daySquare.jour_alph = (i - paddingDays).toString() + " " + document.getElementById('monthDisplay').innerText;

      daySquare.addEventListener("click", function () {
        date_selection = this.jour_num;
        console.log(date_selection);
        document.getElementById("creation_evenement").style.display = "block";
        document.getElementById("date").innerText = this.jour_alph;
      })

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }

  // Chargement des évènements
      for (let i = 0; i < evenements.length; i++) {
        if (evenements[i][3].slice(2) == remplir(month) + year.toString()) {
          const element_evenement = document.createElement("div");
          element_evenement.addEventListener("click", function (event) {
            event.stopPropagation();
            // ADD MORRE SHIT HERE MANNDON TO MAKE THE EVENT DESCRIPTION SHOW ON CLICK
          });
          element_evenement.innerText = evenements[i][0];
          element_evenement.style.backgroundColor = evenements[i][2];

          const carre_jour = document.querySelectorAll(".day")[parseInt(evenements[i][3].slice(0, 2)) + paddingDays - 1];
          carre_jour.appendChild(element_evenement);
        }
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
