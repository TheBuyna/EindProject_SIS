# EindProject_SIS
Nieuws Website

## Setup

**Stap 1**

Om Angular te laten werken moet jij de volgende command uitvoeren in jouw angular directory(_FRONT_)

```
npm install
```
Dit installeert al uw dependent packages van angular en meer...

**Stap 2**

Start jouw frontend server:
```
ng serve
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

Wanneer jij commit doet, voeg jij de nieuwe veranderingen aan jij project. Dit kan handig zijn wanneer jij een bug of nog andere problemen tegen. Omdat later kunnen we version rollback doen naar laatste commit.

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