## Getting Started for Edu saint-Exupéry


### Configurer le dashboard

#### Cloner le projet 

```BASH
git clone .git
```

#### Installer les packets 

```BASH
npm install
```
ou
```BASH
npm i
```

### Configurer la base de donnees

#### Creer la base de l'ecole
```BASH
use saint-vinci;
```
#### Changer de base 
```BASH
use admin;
```
#### Creer un utilisateur
```BASH
db.createUser({user: "student",pwd: "student", roles: [{ role: "readWrite", db: "vinci" }]});
```

#### Lancer le projet

```BASH
npm run dev
```





