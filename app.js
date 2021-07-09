"use strict";

const header    = document.querySelector('header');
const nav       = document.querySelector('nav');
const liensMenu        = Array.from(document.querySelectorAll('li'));
const liensBackMenu     = Array.from(document.querySelectorAll('a.backMenu'));
const hamburger = document.querySelector('.hamburger');
const box       = document.querySelector('.box');
const container = document.querySelector('.container');
let activeToggle = false;

window.addEventListener('load', ()=>{
    if (window.innerWidth>970)
        { nav.classList.add('active')}
});

liensBackMenu.forEach
(   a =>
    {   
        a.addEventListener
        (   'click', () =>
            {   
                if (window.innerWidth<970)
                {       
                    header.classList.remove('active');
                    nav.classList.remove('active');
                    box.classList.remove('active');
                    container.classList.remove('active');
                    activeToggle = false;
                    liensMenu.forEach(i => {
                        i.classList.remove('active')
                    });                        
                                       
                }
            }
        )
        
    }
);

// activation du menu déroulant en format écran < 970px
function activeMenu(activeToggle)
{
    if (activeToggle == true)
    {
        header.classList.add('active');
        nav.classList.add('active');
        box.classList.add('active');
        container.classList.add('active');
        
        liensMenu.forEach(i => {
            i.classList.add('active')
        });
    }
    else
    {
        header.classList.remove     ('active');
        nav.classList.remove        ('active');
        box.classList.remove        ('active');
        container.classList.remove  ('active');
          
        liensMenu.forEach(i => {
            i.classList.remove('active')
        });
    }    
};
activeMenu();

function resizeMenu()
{
    if (window.innerWidth>970)
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

// renvoie boolean lorsque le menu hamburger est cliqué
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


// 
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

// fonction de déplacement
function scrollHorizontal(posX){
    window.scrollTo({
        left: posX,
        behavior: 'smooth'
    });
};

// ici calcul de posX en fonction de la roulette haut ou bas (deltaY)
window.addEventListener('mousewheel', (e)=>{
    if (window.innerWidth>970)
    {
        if (e.deltaY > 0)
        {   if (posX <= window.innerWidth*2)
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