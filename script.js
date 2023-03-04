let nav = 0;
let month;
let mois_precedent;

const calendar = document.getElementById('calendar');
const weekdays = ['dimance', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

let date_selection;
let evenements = [];

const neiges = [];
const nombre_neiges = 15;
let anime;
const page = document.getElementsByTagName("calendrier")[0];
  for (let i = 0; i < nombre_neiges; i++) {
    const neige = document.createElement("div");
    neige.setAttribute("class", "neige");
    neige.y = Math.random()*screen.height;
    neige.x = i*screen.width/nombre_neiges;
    neiges.push(neige);
  }

function animation() {
  for (let i = 0; i < neiges.length; i++) {
      neiges[i].y = (neiges[i].y+1);
      if (neiges[i].y > screen.height) {
          neiges[i].y = Math.random()*(-50);
      }
      if (i == 0) {
          console.log(neiges[i].y)
      }

      neiges[i].style.top = neiges[i].y.toString() + "px";
      neiges[i].style.left = (Math.sin(neiges[i].y*0.1)+neiges[i].x).toString() + "px";
  }
}

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
  document.getElementById('lieu').value = '';
  document.getElementById('couleur').value = "#d58585";
  document.getElementById('time').value = "00:00";
  document.getElementById("creation_evenement").style.display = "none";
  evenements.push(evenement);
  load();
}

const port = document.getElementById("port");
function changer() {
  port.innerHTML = "";
  const saisie_fichier = document.createElement("input");
  saisie_fichier.setAttribute("type", "file");
  saisie_fichier.setAttribute("id", "fichier");
  saisie_fichier.setAttribute("accept", "text/csv");
  saisie_fichier.setAttribute("onchange", "importer();");
  port.appendChild(saisie_fichier);
}

function exporter() {
  donnees = "";
  for (let i = 0; i < evenements.length; i++) {
    for (let j = 0; j < evenements[i].length; j++) {
      donnees += evenements[i][j] + ";";
    }
    donnees += "\n";
  }
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(donnees));
  element.setAttribute('download', "calendrier.csv");
  element.style.display = 'none';
  element.click();
  container.removeChild(element);
}

function importer() {
  const fichier = document.getElementById("fichier").files[0];
  const lecteur = new FileReader();
  lecteur.onload=function(){
    let donnees = lecteur.result.split("\n").slice(0, -1);
    for (let i = 0; i < donnees.length; i++) {
      donnees[i] = donnees[i].split(";").slice(0, -1);
    }
    evenements = donnees;
    port.innerHTML = '<button id="import" onclick="changer();"><i class="fa-solid fa-upload"></i></button><button id="export" onclick="exporter();"><i class="fa-solid fa-download"></i></button>';
    load();
  }
  lecteur.readAsText(fichier);
}

function load() {
  const dt = new Date();

  dt.setMonth(new Date().getMonth() + nav);

  const day = dt.getDate();
  month = dt.getMonth();
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

      daySquare.addEventListener("click", function () {
        date_selection = this.jour_num;
        port.innerHTML = '<button id="import" onclick="changer();"><i class="fa-solid fa-upload"></i></button><button id="export" onclick="exporter();"><i class="fa-solid fa-download"></i></button>';
        document.getElementById("creation_evenement").style.display = "flex";
      })

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }

  // ANIMATIONS
  console.log(month + "  " + mois_precedent);
  if ((month == 11 || month < 2) && (11 > mois_precedent && mois_precedent > 1)) { // MOIS CORRESPONDANT À L'HIVER
      for (let i = 0; i < nombre_neiges; i++) {
        page.appendChild(neiges[i]);
      }
      anime = setInterval(animation, 5);
  }

  else if (month !== 11 && month > 1) {
    for (let i = 0; i < nombre_neiges; i++) {
      page.removeChild(neiges[i]);
      clearInterval(anime);
    }
  }

  // Chargement des évènements
  for (let i = 0; i < evenements.length; i++) {
    if (evenements[i][3].slice(2) == remplir(month) + year.toString()) {
      const element_evenement = document.createElement("newevents");
      element_evenement.addEventListener("click", function (event) {
        event.stopPropagation();
        // ADD MORRE SHIT HERE MANNDON TO MAKE THE EVENT DESCRIPTION SHOW ON CLICK
      });
      element_evenement.style.backgroundColor = evenements[i][2];
      element_evenement.style.height = "5px";
      element_evenement.style.borderRadius = "5px";
      element_evenement.style.transition = "all 1s ease"

      const carre_jour = document.querySelectorAll(".day")[parseInt(evenements[i][3].slice(0, 2)) + paddingDays - 1];
      carre_jour.style.display = "flex";
      carre_jour.style.flexDirection = "column";
      carre_jour.style.justifyContent="space-between";
      carre_jour.appendChild(element_evenement);
    }
  }
}

function initButtons() {
  document.getElementById('next').addEventListener('click', () => {
    mois_precedent = month;
    nav++;
    load();
  });

  document.getElementById('prev').addEventListener('click', () => {
    mois_precedent = month;
    nav--;
    load();
  });
}

initButtons();
load();
