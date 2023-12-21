// Fonction pour obtenir le texte explicatif 
function gethowItWorks() {
    return "Cette API servira à minifier votre lien.<br>Vous devez entrer le lien dans votre formulaire et il renverra votre lien minifier correspondant.";
}

// Fonction pour afficher le texte expliquant comment marche l'API
function displayhowItWorks(howItWorks) {
    const popUPModal = document.getElementById('popUP-modal');
    const howItWorksContent = document.getElementById('popUP-content');
    
    // Construire le contenu HTML
    const howItWorksHTML = `
        <h2>Comment ça marche ?</h2>
        <p>${howItWorks}</p>
    `;

    // Afficher la pop-up
    howItWorksContent.innerHTML = howItWorksHTML;
    popUPModal.style.display = 'block';
}

// Fonction pour fermer la pop-up
function closePopUPModal() {
    const popUPModal = document.getElementById('popUP-modal');
    popUPModal.style.display = 'none';
}

// Ajouter un gestionnaire d'événements pour le clic sur l'icône d'ampoule
document.getElementById('howItWorks').addEventListener('click', function() {
    // Appeler la fonction pour obtenir le texte
    const howItWorksText = gethowItWorks();
    // Appeler la fonction pour afficher le texte
    displayhowItWorks(howItWorksText);
});

function createShortUrl() {
    var nomInput = document.getElementById('nom');
    var prenomInput = document.getElementById('prenom');
    var lienInput = document.getElementById('lien');
    var lienValue = lienInput.value;

    // Utilisez une expression régulière pour vérifier le format du lien
    var lienRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (lienRegex.test(lienValue)) {
        // Si le format du lien est correct, génère un raccourci d'URL simulé
        var shortUrl = 'https://' + Math.random().toString(36).substring(2, 8);

        // Enregistre les données dans localStorage
        var userData = {
            nom: nomInput.value,
            prenom: prenomInput.value,
            lien: lienValue,
            shortUrl: shortUrl
        };

        var allUserData = JSON.parse(localStorage.getItem('userData')) || [];
        allUserData.push(userData);
        localStorage.setItem('userData', JSON.stringify(allUserData));

        // Redirige vers la page lien.html
        window.location.href = 'lien.html';
    } else {
        // Si le format du lien est incorrect, affichez un message d'erreur
        alert('Format de lien incorrect');
    }
}

function deleteRow(index) {
    var confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ?");

    if (confirmDelete) {
        var userData = JSON.parse(localStorage.getItem('userData')) || [];
        userData.splice(index, 1);
        localStorage.setItem('userData', JSON.stringify(userData));

        // Rafraîchit la page pour mettre à jour le tableau
        location.reload();
    }
}

// Récupère les données depuis localStorage et les affiche dans un tableau
var userData = JSON.parse(localStorage.getItem('userData')) || [];
var userDataBody = document.getElementById('userDataBody');

userData.forEach(function(user, index) {
    var row = document.createElement('tr');
    row.innerHTML = `<td>${user.nom}</td><td>${user.prenom}</td><td>${user.lien}</td><td>${user.shortUrl}</td><td><span  onclick="deleteRow(${index})"><i class="fa-solid fa-trash" style="color: #d21919;cursor:pointer;"></i></span></td>`;
    userDataBody.appendChild(row);
});
