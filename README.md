# MASOP - Maison de Soins Psychologiques

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://www.javascript.com/)

## 📖 À propos du projet

**MASOP** (Maison de Soins Psychologiques) est une organisation à but non lucratif haïtienne fondée en 2016 et basée à Delmas, Haïti. Cette plateforme web présente les services, actions et équipe de MASOP, dédiée à la promotion de la santé mentale, l'éducation psychologique, et la lutte contre la violence.

### 🎯 Mission

Mettre les soins psychologiques à la portée de tous et soutenir la communauté haïtienne dans son ensemble avec une approche inclusive, respectueuse et adaptée aux besoins spécifiques de chaque individu.

## ✨ Caractéristiques

### 🖼️ Galerie Interactive
- **Galerie de photos** avec filtrage par mois
- **Lightbox élégante** avec navigation
- **Flèches de navigation** (← →) pour consulter les images
- **Compteur de photos** (X sur Y) pour suivre votre position
- **Support clavier** (Escape pour fermer, Flèches pour naviguer)

### 🎨 Expérience Utilisateur
- **Animations au scroll** - Les sections se révèlent progressivement lors du défilement
- **Bouton "Retour au haut"** - Navigue rapidement vers le haut de la page
- **Design responsive** - Parfait sur desktop, tablette et mobile
- **Menu mobile** - Navigation fluide sur tous les appareils

### 📱 Sections du Site
1. **Accueil** - Présentation et appel à l'action
2. **Qui sommes-nous?** - Historique et mission de MASOP
3. **Nos services** - Programme Vallorepps, Campagne CSFDC, Département R&F
4. **Nos actions** - Événements et campagnes passées
5. **Notre équipe** - Profils des membres de MASOP
6. **Faire un don** - Options de paiement national et international
7. **Contact** - Formulaire et informations de contact
8. **Galerie** - Archive complète des photos

## 🚀 Guide d'utilisation

### Installation locale

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/photo_membres_Masop.git
cd photo_membres_Masop
```

2. **Ouvrir dans un navigateur**
```bash
# Option 1: Ouvrir directement le fichier
open index.html

# Option 2: Utiliser un serveur local (Python)
python -m http.server 8000
# Puis accéder à http://localhost:8000

# Option 3: Utiliser Live Server (VS Code)
# Installation: Extension "Live Server" dans VS Code
# Utilisation: Click droit sur index.html → "Open with Live Server"
```

### Structure du projet

```
photo_membres_Masop/
├── index.html              # Page principale
├── reports.html            # Page des rapports
├── css/
│   └── styles.css         # Styles personnalisés
├── js/
│   └── main.js            # Scripts JavaScript
├── images/
│   ├── gallery/           # Photos de galerie
│   └── team/              # Photos d'équipe
├── README.md              # Ce fichier
└── IMAGES_MANQUANTES.txt  # Inventaire des images manquantes
```

## 🎮 Utilisation des fonctionnalités

### 📸 Naviguer dans la galerie
- **Cliquez** sur une photo pour l'agrandir
- **Utilisez les flèches** ← → pour voir l'image précédente/suivante
- **Clavier**: 
  - `Échap` pour fermer
  - `←` ou `→` pour naviguer
- **Filtre par mois** - Sélectionnez un mois pour voir seulement les photos de cette période

### 🔝 Bouton Retour au haut
- Apparaît automatiquement après avoir scrollé de plus de 300px
- Clique pour revenir au haut avec une animation fluide

### 🎬 Animations au scroll
- Les sections de services et actions s'animent quand vous les atteignez
- Effet progressif et subtil pour une meilleure expérience

## 🛠️ Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| **HTML5** | Structure sémantique du contenu |
| **CSS3** | Styling avec animations et transitions |
| **JavaScript** | Interactivité et logique côté client |
| **Tailwind CSS** | Framework CSS utilitaire (CDN) |
| **Font Awesome** | Icônes vectorielles (CDN) |

## 📋 Dépendances

Toutes les dépendances sont chargées via CDN - **aucune installation requise** :

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

## 🎨 Personnalisation

### Changer les couleurs
Modifiez les classes Tailwind dans `index.html`:
- `teal-600`, `teal-700` - Couleur principale
- Remplacez par votre palette préférée

### Ajouter une nouvelle section
1. Ajoutez une nouvelle `<section>` dans `index.html`
2. Ajoutez la classe `fade-in-section` pour l'animation
3. Ajouter le lien dans la navigation

### Ajouter des photos
1. Placez les images dans `images/gallery/`
2. Ajoutez un élément `<figure>` dans la section galerie
3. Spécifiez le mois avec l'attribut `data-month="YYYY-MM"`

## 🔒 Sécurité

- Site statique - aucune base de données
- Pas d'authentification requise
- Images optimisées et compressées

## 📊 Performance

- **Animations légères** utilisant Intersection Observer
- **Images optimisées** pour le web
- **Pas de dépendances lourdes** (CDN uniquement)
- **Temps de chargement rapide**

## 📝 Versions et historique

### v1.5.0 (Février 2026) - Amélioration Final
- ✨ Ajout des flèches de navigation dans la lightbox
- ✨ Compteur de photos (X sur Y)
- ✨ Bouton "Retour au haut" flottant
- ✨ Animations au scroll pour les sections
- 📚 Création du README professionnel

### v1.4.0
- Galerie interactive avec filtrage par mois
- Lightbox améliorée

### v1.0.0
- Lancement initial du site MASOP

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📧 Contact

**MASOP - Maison de Soins Psychologiques**
- **Email** : maisondesoinspsychologiques@gmail.com
- **Téléphone** : +509 4748-7078 (MonCash)
- **Adresse** : Delmas, Port-au-Prince, Haïti
- **Site Web** : [masop.org](http://masop.org)

## 📄 Licence

Ce projet est sous licence MIT - Voir le fichier [LICENSE](LICENSE) pour les détails.

## 🙏 Remerciements

- **Équipe MASOP** pour la vision et la mission
- **Communauté haïtienne** pour le soutien continu
- **Font Awesome** pour les icônes
- **Tailwind CSS** pour le framework CSS

---

<p align="center">
  <strong>Votre bien-être psychologique, notre priorité.</strong>
</p>

<p align="center">
  <a href="#-à-propos-du-projet">Retour au haut</a>
</p>
