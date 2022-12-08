//variables de gestion du tableau
let tabLargeur = 8 ;
let tabHauteur = 8 ;
let nbCasesTotal = 64 ;
//taux d'apparition des cases normales
let tabchance = 
{
    normal : 0.7,
    desavantage : 0.2,
    avantage : 0.1
}
// clarifie le type, plus parlant que des chiffres
let genreType = 
{
    avantage : 0,
    desavantage : 1,
    normal : 2,
    tresor : 3, 
    avantageColonne : 4,
    avantageLigne : 5
}
//variables création de tableau
let collection = [];
let clicMemeCase = new Array ;
let monTableau = new tablal2D(tabLargeur, tabHauteur) ; // équivalent new tablal2D(8,8) ici 
// variables d'initialisation
let htmlTab = "" ;
let cpt = 0 ;
// variables aléatoires + variable de F5
//let refreshPage = nbCasesTotal-(tabHauteur*5) ;  // 24 (nombres de coups avant d'alerter au joueur qu'il a perdu)
let aleaX = Math.floor(Math.random() * tabLargeur) ;
let aleaY = Math.floor(Math.random() * tabHauteur) ;
let tresor = new Surprise(genreType.tresor, "trésor" ,"Vous avez trouvé 600 pièces d'or, de quoi prendre de très bonnes bouteilles et renforcer l'équipage!",
String(aleaX), String(aleaY), 0) ;

//génération d'un tablal JS à deux dimensions parce que même s'il a deux dimensions, un tablal, des tableaux 
function tablal2D(x, y) 
{
    let array2D = new Array(x) ;
    for (let i = 0; i < array2D.length; i++) 
    {
        array2D[i] = new Array(y) ;
    } ;
    return array2D ;
} ;
// génération du tableau en HTML  // ajout de laCase en tant que Surprise, et ajout de chaque objet laCase dans la collection
for (let i = 0; i < monTableau.length; i++) 
{
    htmlTab += "<tr height='80px' >" ;
    for (let j = 0; j < monTableau.length; j++) 
    {
        cpt++ ;
        htmlTab += `<td class='Case' width='190px' id='${i},${j}' onclick='clic(this)'></td>` ; // i et j coordonnées
        let _type = genType();
        let laCase = new Surprise(_type, '', '', String(i), String(j), 2);
        collection.push(laCase);
    } ;
    htmlTab += "</tr>" ;
} ;
document.getElementById("tablal").innerHTML = htmlTab ;

// def la valeur du type : 0 1 2 avantage desavantage normal
function genType()
{
    // nombre aléatoire entre 0 et 1 inclus     // toFixed nb après la "," 
    let val = parseFloat((Math.random() * (0 - 1) + 1).toFixed(2)); 
    if (val<tabchance.avantage) // 0,1   
        return genreType.avantage; 
    else if (val<tabchance.desavantage)
        return genreType.desavantage;
    else
        return genreType.normal;
}
//récupère la case à partir des coordonnées 
function getCaseFromCol(coords)
{
    coords = coords.split(","); // sépare en tableau --> [i,j] --> ID HTML de la case plus haut
    let casereturn; // nécessaire car le for each fait appel à d'autres fonctions et ne retournait pas _case initialement. 
    collection.forEach(_case => //elm col
    { 
        let caseCoords = _case.getCoord(); // la classe surprise donne les coordonnées 
        if (caseCoords[0] == coords[0] && caseCoords[1] == coords[1]) // [idX[0], idY[1]] == [colX[0], colY[1]] 
        {
            casereturn = _case; 
        }
    });
    return casereturn; 
}
//--------------------------------------------------ONCLICK-------------------------------------------------------------------
//Vérifie si la case du tableau a déjà été cliquée 
//Si non, colore la case du tableau et gère le compteur ; si (gain) => recharge la page et indique le gain du trésor 
let compteur = document.getElementById("compte").innerHTML ;
function clic(laCase) 
{
    if (clicMemeCase.includes(laCase))
    {
        return;
    } 
    else
    {
        clicMemeCase.push(laCase);
    }
    let elmcol = getCaseFromCol(laCase.id);

    if (elmcol.coordX == tresor.coordX && elmcol.coordY == tresor.coordY) 
    {
        laCase.style.backgroundColor = "#10721a" ;
        laCase.descJournal2Bord = "Le vent en poupe ! Le trésor est à VOUS !";
        alert(laCase.descJournal2Bord);
        location.reload() ;
    } 
    else if (elmcol.coordX == tresor.coordX)
    {
        laCase.style.backgroundColor = "#40a497" ;
        laCase.descJournal2Bord = "Vous repêchez une bouteille contenant une carte... <br> Elle indique le méridien sur lequel est situé le trésor ! <br> Il n'y a plus qu'à descendre, ou à monter. ";
        compteur++
    }
    else if (elmcol.coordY == tresor.coordY)
    {
        laCase.style.backgroundColor = "#2b7067" ;
        laCase.descJournal2Bord = "Vous repêchez une bouteille contenant une carte... <br> Elle indique le parallèle sur lequel est situé le trésor ! <br> Il n'y a plus qu'à parcourir l'horizon.";
        compteur++
    }else if (elmcol.getType() == genreType.desavantage)
    {
        laCase.style.backgroundColor = "#bd0102" ;
        laCase.descJournal2Bord = "Nous sommes en guerre : le bateau a faibli mon capitaine ! Il nous faudra bien deux jours pour le réparer ..."
        compteur+=2;
    } 
    else if (elmcol.getType() == genreType.avantage) 
    {
        laCase.style.backgroundColor = "#486ed5" ;
        laCase.descJournal2Bord = "Un homme à la mer! <br> Un homme à la mer! <br> Il doit certainement savoir quelque chose sur le trésor ... <br> Vous gagnez deux jours de recherche, n'est-ce pas génial ?"
        compteur-=2;
    } 
    else //normal
    {
        laCase.style.backgroundColor = "black" ;
        laCase.descJournal2Bord = "T'es dans l'faux l'ami !"
        compteur++
    } ;
    document.getElementById("displayLegende").innerHTML = laCase.descJournal2Bord;
    document.getElementById("compte").innerHTML = compteur;
} ; 
//--------------------------------------------------FIN_ONCLICK----------------------------------------------------------------