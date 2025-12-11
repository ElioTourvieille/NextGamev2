# NextGame SAE

Plateforme de vente et gestion de jeux vidéo développée avec Next.js 16, TypeScript, et PostgreSQL.

## 📋 Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Base de données](#base-de-données)
- [Développement](#développement)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Authentification](#authentification)

## 🎮 À propos

NextGame SAE est une plateforme complète de gestion de jeux vidéo permettant aux utilisateurs de :
- Créer un compte et se connecter
- Parcourir un catalogue de jeux par genre
- Gérer leur bibliothèque de jeux
- Acheter des jeux (système de solde utilisateur)

## ✨ Fonctionnalités

- ✅ Authentification complète (inscription, connexion, sessions)
- ✅ Gestion de bibliothèque de jeux personnelle
- ✅ Catalogue de jeux organisé par genres
- ✅ Système de solde utilisateur
- ✅ Interface responsive avec mode sombre/clair
- ✅ Validation de formulaires avec Zod et React Hook Form
- ✅ Notifications toast avec Sonner

## 🛠 Technologies

### Framework & Langages
- **Next.js 16.0.8** (App Router)
- **React 19.2.1**
- **TypeScript 5**

### Base de données & ORM
- **PostgreSQL**
- **Prisma 7.1.0** (ORM)
- **@prisma/adapter-pg**

### Authentification
- **Better Auth 1.4.6**
- Sessions sécurisées avec expiration configurable

### UI & Styling
- **Tailwind CSS 4**
- **Radix UI** (composants accessibles)
  - Avatar, Dropdown Menu, Select, Tabs, Toggle, etc.
- **next-themes** (thème sombre/clair)
- **Lucide React** (icônes)
- **Sonner** (notifications toast)

### Validation & Formulaires
- **React Hook Form 7.68.0**
- **Zod 4.1.13** (validation de schémas)
- **@hookform/resolvers**

### Outils de développement
- **ESLint** (linting)
- **tsx** (exécution TypeScript)
- **pnpm** (gestionnaire de paquets)

## 📦 Prérequis

- **Node.js** 20+ 
- **pnpm** 10.14.0+ (voir `packageManager` dans `package.json`)
- **PostgreSQL** (serveur de base de données)
- **Git**

## 🚀 Installation

1. **Cloner le dépôt**
```bash
git clone <url-du-repo>
cd nextgame-sae
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditer `.env` et ajouter :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/nextgame?schema=public"
BETTER_AUTH_SECRET="votre-secret-jwt-super-securise"
BETTER_AUTH_URL="http://localhost:3000"
```

4. **Configurer la base de données**
Initier Prisma
```bash
pnpm prisma init
```
Exécuter les migrations :
```bash
pnpm prisma migrate dev --name
```
Générer le client Prisma :
```bash
pnpm prisma generate
```
(Optionnel) Seed la base de données avec des données de test :
```bash
pnpm prisma db seed
```

5. **Lancer le serveur de développement**
```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `BETTER_AUTH_SECRET` | Secret pour JWT (générer avec `openssl rand -base64 32`) | `votre-secret` |
| `BETTER_AUTH_URL` | URL de l'application | `http://localhost:3000` |

### Configuration Prisma

Le fichier `prisma/schema.prisma` définit le schéma de base de données. Pour modifier :

1. Modifier `schema.prisma`
2. Créer une migration : `pnpm prisma migrate dev --name nom-de-la-migration`
3. Générer le client : `pnpm prisma generate`

## 🗄️ Base de données

### Schéma principal

Le projet utilise les modèles suivants :

- **User** : Utilisateurs (email, nom, solde, rôle)
- **Account** : Comptes d'authentification (OAuth, email/password)
- **Session** : Sessions utilisateur actives
- **Verification** : Tokens de vérification email
- **Game** : Jeux vidéo du catalogue
- **GameInLibrary** : Relation utilisateur ↔ jeux possédés

### Seed de données

Le fichier `prisma/seed.ts` contient un script pour peupler la base avec des jeux de test :

- Cyberpunk 2077
- The Witcher 3
- Valorant
- Stardew Valley
- Elden Ring
- Civilization VI
- Portal 2
- Resident Evil Village

## 💻 Développement

### Structure du projet

```
nextgame-sae/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Routes d'authentification (groupe)
│   │   ├── login/         # Page de connexion
│   │   └── register/      # Page d'inscription
│   ├── api/               # API Routes
│   │   └── auth/          # Routes Better Auth
│   ├── layout.tsx         # Layout racine
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables (shadcn/ui)
│   ├── Header.tsx        # En-tête de l'application
│   ├── ModeToggle.tsx    # Toggle thème sombre/clair
│   └── theme-provider.tsx # Provider de thème
├── constants/            # Constantes de l'application
│   └── categories.ts     # Catégories de jeux
├── lib/                  # Utilitaires et configurations
│   ├── auth.ts          # Configuration Better Auth
│   ├── auth-client.ts   # Client Better Auth
│   ├── prisma.ts        # Instance Prisma
│   ├── utils.ts         # Utilitaires généraux
│   └── validations/     # Schémas Zod
│       ├── auth.ts      # Validation auth
│       └── game.ts      # Validation jeux
├── prisma/              # Prisma
│   ├── schema.prisma    # Schéma de base de données
│   ├── migrations/      # Migrations
│   └── seed.ts          # Script de seed
└── types.ts             # Types TypeScript globaux
```

### Scripts disponibles

```bash
# Développement
pnpm dev              # Lancer le serveur de développement (port 3000)

# Build & Production
pnpm build            # Construire l'application pour la production
pnpm start            # Lancer le serveur de production

# Base de données
pnpm prisma generate  # Générer le client Prisma
pnpm prisma migrate dev # Créer et appliquer une migration
pnpm prisma studio    # Ouvrir Prisma Studio (interface graphique)
pnpm prisma db seed   # Exécuter le script de seed

# Code quality
pnpm lint             # Lancer ESLint
```

## 🔐 Authentification

Le projet utilise **Better Auth** pour gérer l'authentification :

### Configuration

- **Méthode** : Email/Password
- **Longueur minimale du mot de passe** : 6 caractères
- **Vérification email** : Désactivée (configurable)
- **Durée de session** : 7 jours
- **Adaptateur** : Prisma (PostgreSQL)

### Pages d'authentification

- `/login` : Page de connexion
- `/register` : Page d'inscription

### Utilisation côté client

```typescript
import { signIn, signUp, signOut } from "@/lib/auth-client"

// Connexion
await signIn.email({ email, password })

// Inscription
await signUp.email({ email, password, name })

// Déconnexion
await signOut()
```


## 🎨 Interface utilisateur

- **Thème** : Support du mode sombre/clair (système par défaut)
- **Design** : Composants Radix UI avec Tailwind CSS
- **Responsive** : Design adaptatif mobile/desktop
- **Notifications** : Toast notifications avec Sonner

## 📝 Licence

Ce projet est privé et développé dans le cadre d'un projet SAE (Situations d'Apprentissage et d'Évaluation).

## 🤝 Contribution

Pour contribuer au projet :

1. Créer une branche depuis `main`
2. Développer vos fonctionnalités
3. Vérifier avec `pnpm lint`
4. Créer une Pull Request

## 📞 Support

Pour toute question ou problème, ouvrir une issue sur le dépôt.

---

**Développé avec ❤️ en utilisant Next.js et TypeScript**
