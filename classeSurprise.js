class Surprise 
{
    constructor(_type, description, descJournal2Bord, coordX, coordY, nbreHeure)
    {
        this.description = description; 
        this.descJournal2Bord = descJournal2Bord;
        this.coordX = coordX;
        this.coordY = coordY; 
        this.nbreHeure = nbreHeure; 
        this._type = _type;
    }
    getCoord()
    {
      return [this.coordX, this.coordY];
    }
    getType()
    {
      return this._type;
    }
}















































/*
class Personnage {
    constructor(nom, sante, force) {
      this.nom = nom;
      this.sante = sante;
      this.force = force;
      this.xp = 0; // Toujours 0 au début
    }
    // Renvoie la description du personnage
    decrire() {
      return `${this.nom} a ${this.sante} points de vie, ${
        this.force
      } en force et ${this.xp} points d'expérience`;
    }
  }
const aurora = new Personnage("Aurora", 150, 25);
const glacius = new Personnage("Glacius", 130, 30);

// "Aurora a 150 points de vie, 25 en force et 0 points d'expérience"
console.log(aurora.decrire());
// "Glacius a 130 points de vie, 30 en force et 0 points d'expérience"
console.log(glacius.decrire());
*/