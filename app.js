"use strict";
const liensMenu = Array.from(document.querySelectorAll('li'));

const arrowBackTop = document.getElementById('backMenu');

const header    = document.querySelector('header');
const nav       = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');
const box       = document.querySelector('.box');

let activeToggle = false;

//  au chargement de la page le menu adequat est selectionné
// en fonction de la taille de l'écran
window.addEventListener('load', ()=>{
    if (window.innerWidth>970)
        { nav.classList.add('active')}
});



// active le menu déroulant en format écran < 970px
function activeMenu(activeToggle)
{
    if (activeToggle == true)
    {
        header.classList.add('active');
        nav.classList.add('active');
        box.classList.add('active');
        liensMenu.forEach(i => {
            i.classList.add('active')
        });
    }
    else
    {
        header.classList.remove('active');
        nav.classList.remove('active');
        box.classList.remove('active');
        liensMenu.forEach(i => {
            i.classList.remove('active')
        });
    }    
};
activeMenu();

// Affiche NAV ou Hamburger en fonction de la taille de l'écran
function resizeMenu()
{   if (window.innerWidth>970)
    {   
        hamburger.classList.remove('active');
        header.classList.remove('active');
        box.classList.remove('active');
        liensMenu.forEach(i => {
            i.classList.remove('active')
        });
        nav.classList.add('active');
        activeToggle = false;
    }
    else
    if (window.innerWidth<970 && activeToggle==false)
    {   
        nav.classList.remove('active');
        hamburger.classList.add('active');
    }
};
resizeMenu();

// En fonction de la taille de l'écran le menu hamburger est activé ou pas
window.addEventListener('resize', () =>
{
    resizeMenu()
    scrollHorizontal(0);
});

// renvoie boolean lorsque le menu hamburger est activé
box.addEventListener('click', () =>
{
    if  (   activeToggle == false)
        {   activeToggle = true;
        }
    else
        {   activeToggle = false;
        }
    activeMenu(activeToggle);
});

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------

// scroll horizontal uniquement si window.innerhtml > 970px donc desktop PC
// Le scroll horizontal peut être activée par la roulette mais aussi par le menu
// il faut donc au click.menu calculer posX
let posX = 0;
// ici calcul de posX au clik Menu
liensMenu.forEach(li =>{
    li.addEventListener('click',(e) => {
    for (let i=0; i<liensMenu.length;i++)
    {
        if (liensMenu[i] == li){
            posX = window.innerWidth*i;
            console.log(posX);
        }
    }
    });
});

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------

// SCREEN > 970 DESKTOP PC
// CALCUL POSX according to quantity of pages
// calcul de posX en fonction de la roulette haut ou bas (deltaY)
// ATTENTION if you change quantity of pages you must change nbPages
const nbPages = 4;
// page 1 > posX = 0
// page 2 > posX = window.innerWidth x 1
// page 3 > posX = window.innerWidth x 2 = last scroll to page 4
// page 4 > posX = window.innerWidth x 3 = scroll impossible
window.addEventListener('mousewheel', (e)=>{
    if (window.innerWidth>970)
    {
        if (e.deltaY > 0)
        {   if (posX <= window.innerWidth*(nbPages-2))
            {   posX += window.innerWidth;
                scrollHorizontal(posX);
            }
        }
        else
        {   if (posX > 0)
            {   posX -= window.innerWidth;
                scrollHorizontal(posX);
            }
        }
    }
});
// fonction de déplacement horizontal 'window.scrollTo'
function scrollHorizontal(posX){
    window.scrollTo({
        left: posX,
        behavior: 'smooth'
    });
};

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ArrowBackTop
window.addEventListener('scroll', (e)=>
{   // console.dir(document.documentElement)
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // console.log(scrollTop, clientHeight, scrollHeight);
    if  (scrollTop>600)
        {   arrowBackTop.classList.add('active');   }
    else
        {   arrowBackTop.classList.remove('active');}
});
// A chaque 'click' retour home page Menu (écran<970)
// le menu déroulant redevient le hamburger
arrowBackTop.addEventListener
('click', () =>
    { if (window.innerWidth<970)
        {   header.classList.remove('active');
            nav.classList.remove('active');
            box.classList.remove('active');
            activeToggle = false;
            liensMenu.forEach(lien => {lien.classList.remove('active');})
        }
    }
);