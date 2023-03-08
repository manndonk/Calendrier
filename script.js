let nav = 0;
let month;
let mois_precedent;
let year;
let an_vision_annuelle; 

const calendar = document.getElementById('calendar');
const weekdays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

let date_selection;
let evenements = [];

let en_zoom = true;
function dezoom() {
  en_zoom = false;
  document.getElementById("container").style.display = "none";
  document.getElementById("dezoom").style.display = "block";
  document.getElementById("afficheAnDezoom").innerText = year;
  document.getElementById("creation_evenement").style.display = "none";
}

function change_arriere_plan(image) {
  document.getElementsByTagName("body")[0].style.backgroundImage = "url('" + image + "')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

// POUR ANIMATIONS

// POUR ANIMATION DE L'ÉTÉ
const feuilles_ete = [];
const nombre_feuilles_ete = 15;
let anime_ete;
for (let i = 0; i < nombre_feuilles_ete; i++) {
  const feuille = document.createElement("div");
  feuille.setAttribute("class", "feuille_ete");
  feuille.y = Math.random()*window.innerHeight;
  feuille.x = i*window.innerWidth/nombre_feuilles_ete;
  feuille.rotation = Math.random()*360;
  feuilles_ete.push(feuille);
}

function animation_ete() {
  for (let i = 0; i < feuilles_ete.length; i++) {
      feuilles_ete[i].y += 1;
      feuilles_ete[i].rotation += 0.5;
      if (feuilles_ete[i].y > window.innerHeight) {
          feuilles_ete[i].y = Math.random()*(-20);
      }
      
      feuilles_ete[i].style.top = feuilles_ete[i].y.toString() + "px";
      feuilles_ete[i].style.left = (Math.sin(feuilles_ete[i].y*0.01)+feuilles_ete[i].x).toString() + "px";
      feuilles_ete[i].style.webkitTransform = "rotate(" + feuilles_ete[i].rotation.toString() + "deg)";
  }
}

// POUR ANIMATION DE L'AUTOMNE
const feuilles_automne = [];
const nombre_feuilles_automne = 9;
let anime_automne;
for (let i = 0; i < nombre_feuilles_automne; i++) {
  const feuille = document.createElement("div");
  feuille.setAttribute("class", "feuille_automne");
  feuille.y = Math.random()*window.innerHeight;
  feuille.x = i*window.innerWidth/nombre_feuilles_automne;
  feuille.rotation = Math.random()*360;
  feuilles_automne.push(feuille);
}

function animation_automne() {
  for (let i = 0; i < feuilles_automne.length; i++) {
      feuilles_automne[i].y += 1;
      feuilles_automne[i].rotation += 0.5;
      if (feuilles_automne[i].y > window.innerHeight) {
          feuilles_automne[i].y = Math.random()*(-20) - 20;
      }
      
      feuilles_automne[i].style.top = feuilles_automne[i].y.toString() + "px";
      feuilles_automne[i].style.left = (Math.sin(feuilles_automne[i].y*0.01)+feuilles_automne[i].x).toString() + "px";
      feuilles_automne[i].style.webkitTransform = "rotate(" + feuilles_automne[i].rotation.toString() + "deg)";
  }
}

// POUR ANIMATION DE PRINTEMPS
const gouttes = [];
const nombre_gouttes = 30;
let anime_printemps;
for (let i = 0; i < nombre_gouttes; i++) {
    const goutte = document.createElement("div");
    goutte.setAttribute("class", "goutte");
    goutte.y = Math.random()*window.innerHeight;
    goutte.x = i*window.innerWidth/nombre_gouttes;
    gouttes.push(goutte);
}

function animation_printemps() {
  for (let i = 0; i < gouttes.length; i++) {
      gouttes[i].y += 20;
      if (gouttes[i].y > window.innerHeight) {
          gouttes[i].y = Math.random()*(-50);
      }
      gouttes[i].style.top = gouttes[i].y.toString() + "px";
      gouttes[i].style.left = gouttes[i].x.toString() + "px";
  }
}

// POUR ANIMATION DE L'HIVER
const neiges = [];
const nombre_neiges = 20;
let anime_hiver;
for (let i = 0; i < nombre_neiges; i++) {
  const neige = document.createElement("div");
  neige.setAttribute("class", "neige");
  neige.y = Math.random()*window.innerHeight;
  neige.x = i*window.innerWidth/nombre_neiges;
  neiges.push(neige);
}

function animation_hiver() {
  for (let i = 0; i < neiges.length; i++) {
      neiges[i].y += 1;
      if (neiges[i].y > window.innerHeight) {
          neiges[i].y = Math.random()*(-50);
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

function annuler() {
  document.getElementById("creation_evenement").style.display = "none";
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
  year = an_vision_annuelle = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('fr', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const paddingDays = weekdays.indexOf(dateString.split(' ')[0]);
  console.log(dateString);
  console.log(paddingDays);

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
  try {
    if (((month == 11 || month < 2) && ((11 > mois_precedent && mois_precedent > 1) || mois_precedent == undefined))) { // MOIS CORRESPONDANT À L'HIVER, L'HIVER NE VENAIT PAS AVANT
      change_arriere_plan("images/winter.jpg");
      for (let i = 0; i < nombre_neiges; i++) {
        document.body.appendChild(neiges[i]);
      }
      anime_hiver = setInterval(animation_hiver, 5);
    }

    else if ((month !== 11 && month > 1) && (mois_precedent == 11 || mois_precedent < 2)) { // MOIS CORRESPONDANT PAS À L'HIVER, L'HIVER VENAIT AVANT
      for (let i = 0; i < nombre_neiges; i++) {
        document.body.removeChild(neiges[i]);
      }
      clearInterval(anime_hiver);
    }

    if ((month > 7 && month < 11) && ((mois_precedent == 11 || mois_precedent < 8) || mois_precedent == undefined)) { // MOIS CORRESPONDANT À L'AUTOMNE, L'AUTOMNE NE VENAIT PAS AVANT
      change_arriere_plan("images/autumn.jpg");
      for (let i = 0; i < nombre_feuilles_automne; i++) {
        document.body.appendChild(feuilles_automne[i]);
      }
      anime_automne = setInterval(animation_automne, 5);
    }

    else if ((month < 8 || month == 11) && (mois_precedent > 7 && mois_precedent < 11)) { // MOIS CORRESPONDANT PAS À L'AUTOMNE, L'AUTOMNE VENAIT AVANT
      for (let i = 0; i < nombre_feuilles_automne; i++) {
        document.body.removeChild(feuilles_automne[i]);
      }
      clearInterval(anime_automne);
    }

    if (((month > 4 && month < 8) && ((mois_precedent < 5 || mois_precedent > 7) || mois_precedent == undefined))) { // MOIS CORRESPONDANT À L'ÉTÉ, L'ÉTÉ VENAIT PAS AVANT
      change_arriere_plan("images/summer.jpg");
      for (let i = 0; i < nombre_feuilles_ete; i++) {
        document.body.appendChild(feuilles_ete[i]);
      }
      anime_ete = setInterval(animation_ete, 5);
    }

    else if ((mois_precedent > 4 && mois_precedent < 8) && (month < 5 || month > 7)) { // MOIS CORRESPONDANT PAS À L'ÉTÉ, L'ÉTÉ VENAIT AVANT
      for (let i = 0; i < nombre_feuilles_ete; i++) {
        document.body.removeChild(feuilles_ete[i]);
      }
      clearInterval(anime_ete);
    }

    if (((month > 1 && month < 5) && ((mois_precedent < 2 || mois_precedent > 4) || mois_precedent == undefined))) { // MOIS CORRESPONDANT AU PRINTEMPS , LE PRINTEMPS VENAIT PAS AVANT
      change_arriere_plan("images/spring.jpg");
      for (let i = 0; i < nombre_gouttes; i++) {
        document.body.appendChild(gouttes[i]);
      }
      anime_printemps = setInterval(animation_printemps, 5);
    }

    else if ((mois_precedent > 1 && mois_precedent < 5) && (month < 2 || month > 4)) {
      for (let i = 0; i < nombre_gouttes; i++) {
        document.body.removeChild(gouttes[i]);
      }
      clearInterval(anime_printemps);
    }
  }
  finally {
  // Chargement des évènements
    for (let i = 0; i < evenements.length; i++) {
      if (evenements[i][3].slice(2) == remplir(month) + year.toString()) {
        const element_evenement = document.createElement("newevents");
        element_evenement.addEventListener("click", function (event) {
          event.stopPropagation();
          // ADD MORRE HERE MANNDON TO MAKE THE EVENT DESCRIPTION SHOW ON CLICK
        });
        element_evenement.style.backgroundColor = evenements[i][2];
        element_evenement.style.height = "5px";
        element_evenement.style.borderRadius = "5px";
        element_evenement.style.transition = "all 0.5s ease";
        element_evenement.style.textAlign = 'center';
        element_evenement.addEventListener('mouseover', () => {
          element_evenement.style.transform = 'scale(110%)';
          element_evenement.style.height = "fit-content";
          setTimeout(() => {
          element_evenement.innerHTML = evenements[i][0];
          }, 500);

        })
        element_evenement.addEventListener('mouseout', () => {
          element_evenement.innerHTML = '';
          element_evenement.style.transform = 'scale(100%)';
          element_evenement.style.height = '5px';
        })

        const carre_jour = document.querySelectorAll(".day")[parseInt(evenements[i][3].slice(0, 2)) + paddingDays - 1];
        carre_jour.style.display = "flex";
        carre_jour.style.flexDirection = "column";
        carre_jour.style.justifyContent="space-between";
        carre_jour.appendChild(element_evenement);
      }
    }
  }
}

mois_vue_annuelle = document.querySelectorAll("#dezoom > a");
for (let i = 0; i < mois_vue_annuelle.length; i++) {
  mois_vue_annuelle[i].addEventListener("click", mois_cliquer);
}

function mois_cliquer() {
  console.log(this);
  let index_mois;
  for (let i = 0; i < mois_vue_annuelle.length; i++) {
    if (mois_vue_annuelle[i] == this) {
      index_mois = i;
      break;
    }
  }
  en_zoom = true;
  document.getElementById("container").style.display = "block";
  document.getElementById("dezoom").style.display = "none";
  nav += (an_vision_annuelle - year)*12 - month + index_mois;
  mois_precedent = month;
  load();
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

  document.getElementById("next_annuelle").addEventListener('click', () => {
    an_vision_annuelle++;
    document.getElementById("afficheAnDezoom").innerText = an_vision_annuelle;
  })
  document.getElementById("prev_annuelle").addEventListener('click', () => {
    an_vision_annuelle--;
    document.getElementById("afficheAnDezoom").innerText = an_vision_annuelle;
  })

  document.onkeydown = function (touche) {
    if (en_zoom) {
      if (touche.key == 'ArrowLeft') {
        document.getElementById('prev').click();
      }
      else if (touche.key == 'ArrowRight') {
        document.getElementById('next').click();
      }
    }
  }
}

initButtons();
load();
