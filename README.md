# EindProject_SIS
Nieuws Website

## Setup 
### **Angular(_FRONT_)**
**Stap 1**

Voor frontend gebruiken wij Angular. Om Angular te laten werken moet jij de volgende command uitvoeren in jouw angular directory(_FRONT_)

```
npm install
```
Dit installeert al uw dependent packages van angular en meer...

**Stap 2**

Start jouw frontend server:
```
ng serve
```

### **Symfony 4(_BACK_)**
**Stap 1**
> **TIP**:
> Jij moet eerst [Composer](https://getcomposer.org/download/) package manager globaal installeren.

Voor backend gebruiken wij Symfony 4. Om Symfony te laten werken moet jij de volgende command uitvoeren in jouw symfony directory(_BACK_)
```
composer install
```
Dit installeert al je nodige packages.

**Step 2: Configureer de databse in .env file**

Zoek naar de .env file in de _BACK_ folder. In de file is er een gedeelte `DATABASE_URL`. Pas het aan naar jouw lokale database.
Bijvorbeeld:


**Stap 3: Installeer de database en de dummy data**
```
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```
Als jij error krijgt dat de database bestaat, zou dat normaal gezien geen probleem zijn, dus werk gewoon verder aan jouw project. Maar als jij problemen krijgt met de database, dan verwijder de hele database met de volgende commando:
```
php bin/console doctrine:database:drop --force
```
Probeer nu opnieuw de database te installeren.

**Stap 2**

Start jouw backend server:
```
php bin/console server:run
```

## Git

### **Nieuwe branch voor nieuwe features/component**

Als jij wilt iets nieuw inbouwen, maak een nieuwe branch. 
```Commando
git branch <<nieuw_Branch>>
```

> **TIP**:
> Vergeet niet naar nieuwe branch te springen.
> ```
> git checkout <<nieuw_Branch>>
> ```

### **Commiten en Pushen**

Wanneer jij commit doet, voeg jij de nieuwe veranderingen aan jij project. Dit kan handig zijn wanneer jij een bug of nog andere problemen tegen komt. Omdat later kunnen we version rollback doen naar laatste commit.

Om te committen doe jij de volgende stappen:

**Stap 1: git status**

Check eerst welke files jij veradendering heeft gebracht:
```
git status
```

**Stap 2: git add**

Jij kunt één per één jouw changes van jouw file toevoegen:
```
git add <<naam_file>>
```
Of gewoon alle changes in één keer:
```
git add .
```

Dit command voegt jij changes in jouw project naar de 'staging area'. Wanneer jij commit doet, al jouw changes in 'staging area' gaat dan committen.

**Stap 3: git commit**

Na al jouw changes toegevoegd te hebben naar de 'staging area', kan jij committen:
```
git commit -m "<<korte beschrijving van jouw changes>>"
```

**Stap 4: git push**

Na elke commit kan jij ook pushen, maar ik zou aanraden om maar één keer per 1 dag/2 dagen.

```
git push origin <<huidege_Branch_naam>>
```

### **Merges en conflicten**

Na elke meetings/springs gaan wij mergen. 


**Stap 1**

Ga naar jouw branch die jij wenst te mergen. In dit geval naar _master_ branch.
```
git checkout master
```

**Stap 2**

```
git merge <<naam_branch_die_jij_wenst_te_mergen>>
```

**Stap 3**

Los het eventuele conflicten op. 

> **TIP**:
> Gebruik Visual Studio Code terminal.
> VSCode heeft handige feature om het gemakkelijker te maken.
> ![Vscode merger conflict editor](https://i.stack.imgur.com/5QGkf.gif)