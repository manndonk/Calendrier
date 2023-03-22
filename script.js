let nav = 0; // Initialisation de la variable nav, qui va être utilisé pour les changements de mois
let mois; // Initalisation de la variable mois, qui va stocker l'indice du mois (0 = Janvier, 11 = Décembre)
let mois_precedent; // Initalisation de la variable mois_precedent, qui va stocker l'indice du mois précédent (0 = Janvier, 11 = Décembre)
let an; // Initalisation de la variable an, qui va stocker l'année
let an_vision_annuelle; // Initalisation de la variable an_vision_annuelle, qui va stocker l'année affichée en vision annuelle lors du dézoom

const calendrier = document.getElementById('calendar'); // On stocke l'objet HTML représentant le calendrier dans la variable calendrier
const jours_semaine = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']; // Création de la liste stockant les jours de la semaine en ordre

let selection; // Initialisation de la variable, qui va stocker la dernière date ou le dernier évènement cliqué par l'utilisateur
let evenements = []; // Initialisation de la liste evenements, qui va stocker les évènement crées par l'utilisateur

let en_zoom = true; // Initialisation du booléen en_zoom, qui va s'en souvenir la vision actuelle (annuelle = false, ou mensuelle = true)
function dezoom() { // Fonction éxécutée lorsqu'on clique sur le bouton pour entrer en vision annuelle
  en_zoom = false; // Modification du booléen en_zoom
  document.getElementById("container").style.display = "none"; // Rend invisible les composants du calendrier lors de la vision mensuelle
  document.getElementById("dezoom").style.display = "block"; // Rend visible les composants du calendrier lors de la vision annuelle
  document.getElementById("afficheAnDezoom").innerText = an; // Affiche l'an sur la vision annuelle
  document.getElementById("creation_evenement").style.display = "none"; // On rend l'interface de création d'évènement invisible, en cas où il était visible
  document.getElementById("creation_evenement").style.transform = "translateX(-450px)";
  document.getElementById("container").style.transform = "translateX(0)";
}

function change_arriere_plan(image) { // Fonction chargée de changer l'arrière plan
  document.getElementsByTagName("body")[0].style.backgroundImage = "url('" + image + "')"; // Changement de l'arrière plan de l'élément "body" de la page
  // Précision des attributs de l'arrière plan
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

// POUR ANIMATIONS
// Initialisation des listes qui contiendront les éléments animés
const feuilles_ete = [];
const feuilles_automne = [];
const gouttes = [];
const neiges = [];

// Définition du nombre des éléments animés pour chaque saison
const nombre_feuilles_ete = 15;
const nombre_feuilles_automne = 9;
const nombre_gouttes = 30;
const nombre_neiges = 20;

// Définition des variables qui permetteront de commencer et arrêter les animations
let anime_ete;
let anime_automne;
let anime_printemps;
let anime_hiver;

// On remplit chaque listes liées aux animations avec leurs éléments à animés
function creer_elements_animes() {
  for (let i = 0; i < nombre_feuilles_ete; i++) { // Pour l'été
    const feuille = document.createElement("div"); // Création d'un élément div
    feuille.setAttribute("class", "feuille_ete"); // Grâce au fichier "style.css", cette instruction va donner l'arrière plan au div pour lui faire apparaître comme une feuille verte
    feuille.y = Math.random()*window.innerHeight; // Placement aléatoire de la feuille sur l'axe vertical
    feuille.x = i*window.innerWidth/nombre_feuilles_ete; // Placement unique pour chaque feuille pour avoir une dispersion égale à travers l'écran
    feuille.rotation = Math.random()*360; // Initialise la rotation de la feuille à un angle aléatoire
    feuilles_ete.push(feuille); // Cette feuille est ajoutée à la liste des éléments à animés pour l'été
  }
  for (let i = 0; i < nombre_feuilles_automne; i++) { // Pour l'automne
    const feuille = document.createElement("div"); // Création d'un élément div
    feuille.setAttribute("class", "feuille_automne"); // Grâce au fichier "style.css", cette instruction va donner l'arrière plan au div pour lui faire apparaître comme une feuille orange
    feuille.y = Math.random()*window.innerHeight; // Placement aléatoire de la feuille sur l'axe vertical
    feuille.x = i*window.innerWidth/nombre_feuilles_automne; // Placement unique pour chaque feuille pour avoir une dispersion égale à travers l'écran
    feuille.rotation = Math.random()*360; // Initialise la rotation de la feuille à un angle aléatoire
    feuilles_automne.push(feuille); // Cette feuille est ajoutée à la liste des éléments à animés pour l'automne
  }
  for (let i = 0; i < nombre_gouttes; i++) { // Pour le printemps
    const goutte = document.createElement("div"); // Création d'un élément div
    goutte.setAttribute("class", "goutte"); // Grâce au fichier "style.css", cette instruction va donner l'arrière plan au div pour lui faire apparaître comme une goutte
    goutte.y = Math.random()*window.innerHeight; // Placement aléatoire de la goutte sur l'axe vertical
    goutte.x = i*window.innerWidth/nombre_gouttes; // Placement unique pour chaque goutte pour avoir une dispersion égale à travers l'écran
    goutte.style.left = goutte.x.toString() + "px"; // Placement de la goutte sur l'écran
    gouttes.push(goutte); // Cette goutte est ajoutée à la liste des éléments à animés pour le printemps
  }
  for (let i = 0; i < nombre_neiges; i++) { // Pour l'hiver
    const neige = document.createElement("div"); // Création d'un élément div
    neige.setAttribute("class", "neige"); // Grâce au fichier "style.css", cette instruction va donner l'arrière plan au div pour lui faire apparaître comme un flacon de neige
    neige.y = Math.random()*window.innerHeight; // Placement aléatoire du flacon sur l'axe vertical
    neige.x = i*window.innerWidth/nombre_neiges; // Placement unique pour chaque flacon pour avoir une dispersion égale à travers l'écran
    neiges.push(neige); // Ce flacon est ajouté à la liste des éléments à animés pour l'hiver
  }
}

// Définition des fonction qui sont chargées d'animer les objets
function animation_ete() { // Pour l'été
  for (let i = 0; i < feuilles_ete.length; i++) { // Les instructions suivantes s'affectent à chaque feuille de l'été
      feuilles_ete[i].y += 1; // Augmente la valeur de la variable stockant la position de la feuille sur l'axe vertical
      feuilles_ete[i].rotation += 0.5; // Augmente la valeur de la variable stockant l'ange de la feuille
      if (feuilles_ete[i].y > window.innerHeight) { // Vérifie si la feuille a dépassé les limites de l'écran
          feuilles_ete[i].y = Math.random()*(-20) - 20; // Si les limites sont dépassés, la feuille est remontée
      }
      feuilles_ete[i].style.top = feuilles_ete[i].y.toString() + "px"; // Met à jour la position verticale de la feuille sur l'écran
      feuilles_ete[i].style.left = (Math.sin(feuilles_ete[i].y*0.01)+feuilles_ete[i].x).toString() + "px"; // Met à jour la position de la feuille sur l'axe horizontale, en utilisant la fonction sinus pour obtenir un mouvement oscillatoire
      feuilles_ete[i].style.webkitTransform = "rotate(" + feuilles_ete[i].rotation.toString() + "deg)"; // Met à jour la rotation de la feuille
  }
}
function animation_automne() { // Pour l'automne
  for (let i = 0; i < feuilles_automne.length; i++) { // Les instructions suivantes s'affectent à chaque feuille de l'automne
      feuilles_automne[i].y += 1; // Augmente la valeur de la variable stockant la position de la feuille sur l'axe vertical
      feuilles_automne[i].rotation += 0.5; // Augmente la valeur de la variable stockant l'ange de la feuille
      if (feuilles_automne[i].y > window.innerHeight) { // Vérifie si la feuille a dépassé les limites de l'écran
          feuilles_automne[i].y = Math.random()*(-20) - 20; // Si les limites sont dépassés, la feuille est remontée
      }
      feuilles_automne[i].style.top = feuilles_automne[i].y.toString() + "px"; // Met à jour la position verticale de la feuille sur l'écran
      feuilles_automne[i].style.left = (Math.sin(feuilles_automne[i].y*0.01)+feuilles_automne[i].x).toString() + "px"; // Met à jour la position de la feuille sur l'axe horizontale, en utilisant la fonction sinus pour obtenir un mouvement oscillatoire
      feuilles_automne[i].style.webkitTransform = "rotate(" + feuilles_automne[i].rotation.toString() + "deg)"; // Met à jour la rotation de la feuille
  }
}
function animation_printemps() { // Pour le printemps
  for (let i = 0; i < gouttes.length; i++) { // Les instructions suivantes s'affectent à chaque goutte
      gouttes[i].y += 20; // Augmente la valeur de la variable stockant la position de la goutte sur l'axe vertical
      if (gouttes[i].y > window.innerHeight) { // Vérifie si la goutte a dépassé les limites de l'écran
          gouttes[i].y = Math.random()*(-50); // Si les limites sont dépassés, la goutte est remontée
      }
      gouttes[i].style.top = gouttes[i].y.toString() + "px"; // Met à jour la position verticale de la goutte sur l'écran
  }
}
function animation_hiver() { // Pour l'hiver
  for (let i = 0; i < neiges.length; i++) { // Les instructions suivantes s'affectent à chaque flacon de neige
      neiges[i].y += 1; // Augmente la valeur de la variable stockant la position du flacon sur l'axe vertical
      if (neiges[i].y > window.innerHeight) { // Vérifie si le flacon a dépassé les limites de l'écran
          neiges[i].y = Math.random()*(-50); // Si les limites sont dépassés, le flacon est remonté
      }
      neiges[i].style.top = neiges[i].y.toString() + "px"; // Met à jour la position verticale du flacon sur l'écran
      neiges[i].style.left = (Math.sin(neiges[i].y*0.1)+neiges[i].x).toString() + "px"; // Met à jour la position de du flacon sur l'axe horizontale, en utilisant la fonction sinus pour obtenir un mouvement oscillatoire
  }
}

function remplir(numero) { // Définition de la fonction remplir qui transforme par exemple 9 en "09", 18 en "18", ou 2 en "02"
  numero = numero.toString(); // Transforme le nombre en chaîne de caractère
  if (numero.length == 1) { // Si la longueur de la chaîne est 1
    numero = "0" + numero; // Ajoute un 0 antécédant à la chaîne
  }
  return numero; // Renvoire la chaîne
}

function annuler() { // Fonction éxécutée lorsqu'on clique sur le bouton pour annuler la création ou la modification d'un évènement
  // Remise à défaut des champs de saisie
  document.getElementById('titre').value = '';
  document.getElementById('desc').value = '';
  document.getElementById('lieu').value = '';
  document.getElementById('couleur').value = "#d58585";
  document.getElementById('time').value = "00:00";

  // Cache l'interface de création d'évènement
  document.getElementById("creation_evenement").style.transform = "translateX(-450px)";
  document.getElementById("creation_evenement").style.zIndex = "-1";
  setTimeout(() => {
    document.getElementById("container").style.transform = "translateX(0)"
  }, 500);
}

function creer_evenement() {
  if (typeof(selection) == "number") { // Si un évènement à été séléctionné pour le modifier
    // Modification des détails de l'évènement
    evenements[selection][0] = document.getElementById('titre').value;
    evenements[selection][1] = document.getElementById('desc').value;
    evenements[selection][2] = document.getElementById('couleur').value;
    evenements[selection][3] = document.getElementById('lieu').value;
    evenements[selection][4] = document.getElementById('time').value;
  }
  else { // Si un jour à été séléctionné pour crée un évènement
    // Création d'une liste contenant toutes les informations de l'évènement
    const evenement = [document.getElementById('titre').value, document.getElementById('desc').value, document.getElementById('couleur').value, document.getElementById('lieu').value, document.getElementById('time').value, selection];
    evenements.push(evenement); // Ajouter l'évènement à la liste des évènements
  }
  // Remise à défaut des champs de saisie
  document.getElementById('titre').value = '';
  document.getElementById('desc').value = '';
  document.getElementById('lieu').value = '';
  document.getElementById('couleur').value = "#d58585";
  document.getElementById('time').value = "00:00";
  // Cache l'interface de création d'évènement
  document.getElementById("creation_evenement").style.transform = "translateX(-450px)";
  document.getElementById("creation_evenement").style.zIndex = "-1";
  setTimeout(() => {
    document.getElementById("container").style.transform = "translateX(0)"
  }, 500);
  load(); // Rechargement du calendrier pour afficher le nouveau évènement
}

function changer() { // Fonction éxécutée lorsqu'on clique sur le bouton pour importer un fichier calendrier
  document.getElementById("port").innerHTML = ""; // Efface les boutons
  const saisie_fichier = document.createElement("input"); // Crée un élément "input" pour saisir le fichier que l'utilisateur veut importer
  saisie_fichier.setAttribute("type", "file"); // Fixe le type de saisie de l'élément contenu dans saisie_fichier
  saisie_fichier.setAttribute("id", "fichier"); // Attribut un identifiant à l'élément HTML de saisie
  saisie_fichier.setAttribute("accept", "text/csv"); // Précise le type de fichier accépté
  saisie_fichier.setAttribute("onchange", "importer()"); // Dit au programme d'importer les évènement lorsque le fichier est disponible
  document.getElementById("port").appendChild(saisie_fichier); // Rend cette saisie de fichier visible sur l'écran
}

function exporter() { // Fonction éxécutée lorsqu'on clique sur le bouton pour exporter les évènements dans un fichier
  donnees = ""; // Initialise une chaine de caractère qui va contenir les données des évènements
  for (let i = 0; i < evenements.length; i++) { // Pour chaque évènement
    for (let j = 0; j < evenements[i].length; j++) { // Pour chaque détail de l'évènement (titre, description, couleur...)
      donnees += evenements[i][j] + ";"; // Les détails de l'évènement sont ajoutés au fichier, séparés par des ";"
    }
    donnees += "\n"; // Retour à la ligne après chaque évènement
  }
  const element = document.createElement('a'); // Création d'un élément HTML "a" temporaire
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(donnees)); // Les données sont 
  element.setAttribute('download', "calendrier.csv"); // Nomme le fichier "calendrier.csv" et permet son téléchargement
  element.style.display = 'none'; // Rend ce nouveau élément temporaire invisible
  element.click(); // Clique virtuel de l'élément pour installer le fichier
  container.removeChild(element); // L'élément temporaire est supprimé
}

function importer() { // Fonction éxécutée lorsqu'un fichier est mis pour être importé.
  const fichier = document.getElementById("fichier").files[0]; // Le fichier contenant les donnés est stocker dans la variable fichier
  const lecteur = new FileReader(); // Crée un objet FileReader() pour lire le fichier avec les prochaines instructions
  lecteur.readAsText(fichier); // Lecture du fichier
  lecteur.onload = function() { // Lorsque le fichier est complètement lu
    let donnees = lecteur.result.split("\n").slice(0, -1); // Stockage des donnés dans la variable donnees, sous forme de liste, où chaque évènement représente une chaîne de caractère
    for (let i = 0; i < donnees.length; i++) { // Pour chaque évènement, couramment sous forme de chaîne de caractère
      donnees[i] = donnees[i].split(";").slice(0, -1); // Transformation des chaînes de caractères en liste pour obtenir le bon format
    }
    evenements = donnees; // Stockage des évènements dans la variable evenements
    // Les boutons "Importer" et "Exporter" sont ré-affichés
    port.innerHTML = '<button id="import" onclick="changer();"><i class="fa-solid fa-upload"></i></button><button id="export" onclick="exporter();"><i class="fa-solid fa-download"></i></button>';
    load(); // Rechargement du calendrier pour afficher les évènements
  }
}

function load() {
  const dt = new Date(); // Création d'un objet JavaScript "Date"
  dt.setMonth(new Date().getMonth() + nav); // Change le moi de ce nouveau objet selon la variable nav
  const day = dt.getDate(); // Stocke le nombre du jour actuel dans la variable day
  mois = dt.getMonth(); // Mise à jour du nombre du moi (0 = Janvier, 11 = Décembre)
  an = an_vision_annuelle = dt.getFullYear(); // Mise à jour des variables an et an_vision_annuelle
  const premier_jour_du_mois = new Date(an, mois, 1); // Stocke le premier jour du mois sous la forme d'un objet Date dans premier_jour_du_mois
  const nombre_jour_dans_mois = new Date(an, mois + 1, 0).getDate(); // Stocke le nombre de jour de ce mois dans la variable nombre_jour_dans_mois
  
  // Stocke la chaîne de caractère pour le premier jour du mois sous ce format "mardi 14/03/2023" ou "samedi 12/07/2025"
  const dateString = premier_jour_du_mois.toLocaleDateString('fr', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const joursBlancs = jours_semaine.indexOf(dateString.split(' ')[0]); // Stocke le nombre de jours blancs dans la variable joursBlancs

  document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('fr', { month: 'long' })} ${an}`; // Affiche la date sur le calendrier

  calendrier.innerHTML = ''; // Effacement des jours du calendrier pour les regénérer

  for(let i = 1; i <= joursBlancs + nombre_jour_dans_mois; i++) { // Pour chaque carré à afficher
    const carreJour = document.createElement('div'); // Création d'un nouveau élément HTML "div"
    carreJour.classList.add('day'); // Grâce au fichier  "style.css", cette instruction va donner l'apparence esthétique aux carrés représentant les jours

    if (i > joursBlancs) { // Si le jour n'est pas un jour blanc
      carreJour.innerText = i - joursBlancs; // Afficher le nombre du jour dans le carré
      carreJour.date = remplir(i - joursBlancs) + remplir(mois) + an; // Création d'un nouveau attribut pour associer à chaque élément "div", représentant un jour, sa date associée. Si la date c'est le "mardi 14/03/2023", alors carreJour.date = "14022023"

      carreJour.addEventListener("click", function () { // Définit les instructions à éxecuter lorsqu'on clique sur un carré
        selection = this.date; // Stocke la date du jour selectionné dans la variable selection
        // Ré-affichage des boutons "importer" et "exporter" (au cas où l'utilisateur clique sur "importer" par accident, et ne peut donc plus "exporter" un fichier)
        port.innerHTML = '<button id="import" onclick="changer();"><i class="fa-solid fa-upload"></i></button><button id="export" onclick="exporter();"><i class="fa-solid fa-download"></i></button>';
        document.getElementById("container").style.transform = "translateX(-153px)"; // Déplace le calendrier vers la gauche
        setTimeout(() => { // Les prochains instructions sont éxecutées avec un delai de 500 ms
          document.getElementById("creation_evenement").style.transform = "translateX(-160.5px)"; // Déplace l'interface de création d'évènement vers la droite
          document.getElementById("creation_evenement").style.zIndex = "1"; // Avance l'interface de création d'évèmement sur l'axe Z (profondeur)
        }, 500);
      })

      if (i - joursBlancs === day && nav === 0) { // Si le jour correspond à aujourd'hui
        carreJour.id = 'currentDay'; // Grâce au fichier  "style.css", cette instruction va colorier le carré en orange
      }
    }
    else { // Si le jour est un jour blanc
      carreJour.classList.add('padding'); // Grâce au fichier  "style.css", cette instruction va donner l'apparence aux carrés des jours blancs
    }
    calendrier.appendChild(carreJour); // Affiche le carré sur l'écran  
  }

  try {
    if (((mois == 11 || mois < 2) && ((11 > mois_precedent && mois_precedent > 1) || mois_precedent == undefined))) { // Si le mois est dans l'hiver, mais l'hiver ne venait pas avant
      change_arriere_plan("images/winter.jpg"); // Change l'arrière plan
      for (let i = 0; i < nombre_neiges; i++) { // Pour chaque flacon de neige
        document.body.appendChild(neiges[i]); // Affiche le flacon sur l'écran
      }
      anime_hiver = setInterval(animation_hiver, 5); // Mise en route de l'animation de l'hiver
    }

    else if ((mois !== 11 && mois > 1) && (mois_precedent == 11 || mois_precedent < 2)) { // Si le mois n'est pas dans l'hiver, mais l'hiver venait avant
      for (let i = 0; i < nombre_neiges; i++) { // Pour chaque flacon de neige
        document.body.removeChild(neiges[i]); // Désaffiche le flacon de l'écran
      }
      clearInterval(anime_hiver); // Arrête l'animation de l'hiver
    }

    if ((mois > 7 && mois < 11) && ((mois_precedent == 11 || mois_precedent < 8) || mois_precedent == undefined)) { // Si le mois est dans l'autmone, mais l'autmone ne venait pas avant
      change_arriere_plan("images/autumn.jpg"); // Change l'arrière plan
      for (let i = 0; i < nombre_feuilles_automne; i++) { // Pour chaque feuille d'automne
        document.body.appendChild(feuilles_automne[i]); // Affiche la feuille sur l'écran
      }
      anime_automne = setInterval(animation_automne, 5); // Mise en route de l'animation de l'automne
    }

    else if ((mois < 8 || mois == 11) && (mois_precedent > 7 && mois_precedent < 11)) { // Si le mois n'est pas dans l'autmone, mais l'autmone venait avant
      for (let i = 0; i < nombre_feuilles_automne; i++) { // Pour chaque feuille d'automne
        document.body.removeChild(feuilles_automne[i]); // Désaffiche la fauille d'automne de l'écran
      }
      clearInterval(anime_automne); // Arrête l'animation de l'automne
    }

    if (((mois > 4 && mois < 8) && ((mois_precedent < 5 || mois_precedent > 7) || mois_precedent == undefined))) { // Si le mois est dans l'été, mais l'été ne venait pas avant
      change_arriere_plan("images/summer.jpg"); // Change l'arrière plan
      for (let i = 0; i < nombre_feuilles_ete; i++) { // Pour chaque feuille d'été
        document.body.appendChild(feuilles_ete[i]); // Affiche la feuille sur l'écran
      }
      anime_ete = setInterval(animation_ete, 5); // Mise en route de l'animation de l'été
    }

    else if ((mois_precedent > 4 && mois_precedent < 8) && (mois < 5 || mois > 7)) { // Si le mois n'est pas dans l'été, mais l'été venait avant
      for (let i = 0; i < nombre_feuilles_ete; i++) { // Pour chaque feuille d'été
        document.body.removeChild(feuilles_ete[i]); // Désaffiche la feuille d'été l'écran
      }
      clearInterval(anime_ete); // Arrête l'animation de l'été
    }

    if (((mois > 1 && mois < 5) && ((mois_precedent < 2 || mois_precedent > 4) || mois_precedent == undefined))) { // Si le mois est dans le printemps, mais le printemps ne venait pas avant
      change_arriere_plan("images/spring.jpg"); // Change l'arrière plan
      for (let i = 0; i < nombre_gouttes; i++) { // Pour chaque goutte
        document.body.appendChild(gouttes[i]); // Affiche la goutte sur l'écran
      }
      anime_printemps = setInterval(animation_printemps, 5); // Mise en route de l'animation du printemps
    }

    else if ((mois_precedent > 1 && mois_precedent < 5) && (mois < 2 || mois > 4)) { // Si le mois n'est pas dans le printemps, mais le printemps venait avant
      for (let i = 0; i < nombre_gouttes; i++) { // Pour chaque goutte
        document.body.removeChild(gouttes[i]); // Désaffiche la goutte de l'écran
      }
      clearInterval(anime_printemps); // Arrête l'animation du printemps
    }
  }
  finally {
  // Chargement des évènements
    for (let i = 0; i < evenements.length; i++) { // Pour chaque évènement dans la liste des évènements
      if (evenements[i][5].slice(2) == remplir(mois) + an.toString()) { // Si la date de l'évènement correspond à ce mois
        const element_evenement = document.createElement("newevents"); // Création d'un nouveau élément HTML
        element_evenement.addEventListener("click", function (event) { // Les instructions suivantes lorsqu'un évènement est cliqué
          event.stopPropagation(); // Pour ne pas cliquer à la fois sur l'évènement et le carré du jour
          selection = i; // Stocke l'indice de l'évènement selectionné dans la variable selection
          document.getElementById('titre').value = evenements[i][0];
          document.getElementById('desc').value = evenements[i][1];
          document.getElementById('couleur').value = evenements[i][2];
          document.getElementById('lieu').value = evenements[i][3];
          document.getElementById('time').value = evenements[i][4];
          // Ré-affichage des boutons "importer" et "exporter" (au cas où l'utilisateur clique sur "importer" par accident, et ne peut donc plus "exporter" un fichier)
          port.innerHTML = '<button id="import" onclick="changer();"><i class="fa-solid fa-upload"></i></button><button id="export" onclick="exporter();"><i class="fa-solid fa-download"></i></button>';
          document.getElementById("container").style.transform = "translateX(-153px)"; // Déplace le calendrier vers la gauche
          setTimeout(() => { // Les prochains instructions sont éxecutées avec un delai de 500 ms
            document.getElementById("creation_evenement").style.transform = "translateX(-160.5px)"; // Déplace l'interface de création d'évènement vers la droite
            document.getElementById("creation_evenement").style.zIndex = "1"; // Avance l'interface de création d'évèmement sur l'axe Z (profondeur)
          }, 500);
        });
        // Précision sur les apparences des évènement dans le calendrier
        element_evenement.style.backgroundColor = evenements[i][2];
        element_evenement.style.height = "5px";
        element_evenement.style.borderRadius = "5px";
        element_evenement.style.transition = "all 0.5s ease";
        element_evenement.style.textAlign = 'center';
        element_evenement.addEventListener('mouseover', () => { // Lorsque la souris est dessus un évènement
          element_evenement.style.transform = 'scale(110%)'; // Aggrandit l'évènement
          element_evenement.style.height = "fit-content"; // Ajuste la grandeur de l'évènement
          element_evenement.innerHTML = evenements[i][0]; // Affiche le titre de l'évènement
      })
        element_evenement.addEventListener('mouseout', () => { // Lorsque la souris n'est plus dessus un évènement
          element_evenement.innerHTML = ''; // Effacer le texte du titre
          // Remet l'évènement à sa taille de départ
          element_evenement.style.transform = 'scale(100%)';
          element_evenement.style.height = '5px';
      })

        const carre_jour = document.querySelectorAll(".day")[parseInt(evenements[i][5].slice(0, 2)) + joursBlancs - 1]; // Stocke le carré correspondant au jour spécifique de l'évènement dans la variable carre_jour
        // Détermine les propriétés du carré pour accommoder l'évènement
        carre_jour.style.display = "flex";
        carre_jour.style.flexDirection = "column";
        carre_jour.style.justifyContent="space-between";
        carre_jour.appendChild(element_evenement); // Affiche l'évènement sur l'écran
      }
    }
  }
}

mois_vue_annuelle = document.querySelectorAll("#dezoom > a"); // Stocke tous les éléments correspondant aux boutons pour les mois dans la vision annuelle
for (let i = 0; i < mois_vue_annuelle.length; i++) { // Pour chaque bouton des mois
  mois_vue_annuelle[i].addEventListener("click", mois_cliquer); // Éxécute la fonction mois_cliquer lorsqu'on clique sur ce mois
}

function mois_cliquer() { // Fonction éxécutée lorsqu'on clique sur un mois dans la vision annuelle
  let index_mois; // Initialise la varaible index_mois
  for (let i = 0; i < mois_vue_annuelle.length; i++) {
    if (mois_vue_annuelle[i] == this) {
      index_mois = i;
      break;
    }
  }
  en_zoom = true; // Rebasculement du booléen en_zoom
  document.getElementById("container").style.display = "block"; // Re-affiche des éléments pour revenir à l'écran du calendrier de la vision mensuelle
  document.getElementById("dezoom").style.display = "none"; // Cache les éléments de la vision annuelle
  // Remet le calendrier au centre
  document.getElementById("container").style.transform = "translateX(0)";
  document.getElementById("container").style.marginLeft = "calc(50% - 192.5px)";
  document.getElementById("creation_evenement").style.display = "block"; // Re-affiche l'interface de création d'évènement, mais derrière le calendrier, pour préparer la création d'un évènement
  nav += (an_vision_annuelle - an)*12 - mois + index_mois; // Ajustement de la variable nav
  mois_precedent = mois; // La varaible mois_precedent prend la valeur de la variable mois avant son changement
  load();
}

// Initialisation des boutons
function initBoutons() {
  document.getElementById('next').addEventListener('click', () => { // Instructions éxécutées lorsqu'on passe au prochain mois
    mois_precedent = mois; // La varaible mois_precedent prend la valeur de la variable mois avant son changement
    nav++; // Ajoute 1 à la varaible nav
    load(); // Met à jour l'affichage du calendrier
  });

  document.getElementById('prev').addEventListener('click', () => { // Instructions éxécutées lorsqu'on passe au mois précédent
    mois_precedent = mois; // La varaible mois_precedent prend la valeur de la variable mois avant son changement
    nav--; // Soustrait 1 à la varaible nav
    load(); // Met à jour l'affichage du calendrier
  });

  document.getElementById("next_annuelle").addEventListener('click', () => { // Instructions éxécutées lorsqu'on passe à l'an prochain dans la vision annuelle
    an_vision_annuelle++; // Ajoute 1 à la variable an_vision_annuelle
    document.getElementById("afficheAnDezoom").innerText = an_vision_annuelle; // Met à jour le texte affichant l'an dans la vision annuelle
  })
  document.getElementById("prev_annuelle").addEventListener('click', () => { // Instructions éxécutées lorsqu'on passe à l'an précédent dans la vision annuelle
    an_vision_annuelle--; // Ajoute 1 à la variable an_vision_annuelle
    document.getElementById("afficheAnDezoom").innerText = an_vision_annuelle; // Met à jour le texte affichant l'an dans la vision annuelle
  })

  document.onkeydown = function (touche) { // Lorsqu'une touche est pressée
    if (en_zoom) { // Si on est dans la vision mensuelle
      if (touche.key == 'ArrowLeft') { // Si la touche pressée est la flèche gauche
        document.getElementById('prev').click(); // Passe au mois précédent
      }
      else if (touche.key == 'ArrowRight') { // Si la touche pressée est la flèche droite
        document.getElementById('next').click(); // Passe au prochain mois
      }
    }
    else { // Si on est dans la vision annuelle
      if (touche.key == 'ArrowLeft') { // Si la touche pressée est la flèche gauche
        document.getElementById('prev_annuelle').click(); // Passe à l'an précédent
      }
      else if (touche.key == 'ArrowRight') { // Si la touche pressée est la flèche droite
        document.getElementById('next_annuelle').click(); // Passe à l'an prochain
      }
    }
  }
}

initBoutons(); // Initialise les boutons
creer_elements_animes(); // Créer les éléments à animer
load(); // Affiche le calendrier à l'écran
