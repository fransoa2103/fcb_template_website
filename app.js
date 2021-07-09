"use strict";

const header    = document.querySelector('header');
const nav       = document.querySelector('nav');
const li        = Array.from(document.querySelectorAll('li'));
const liens     = Array.from(document.querySelectorAll('a.backMenu'));
const hamburger = document.querySelector('.hamburger');
const box       = document.querySelector('.box');
const container = document.querySelector('.container');
const page = document.getElementById('page1');
console.log(page);
let activeToggle = false;

window.addEventListener('load', ()=>{
    if (window.innerWidth>970)
        { nav.classList.add('active')}
});

liens.forEach
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
                    li.forEach(i => {
                        i.classList.remove('active')
                    });                        
                                       
                }
            }
        )
        
    }
);

function activeMenu(activeToggle)
{
    if (activeToggle == true)
    {
        header.classList.add('active');
        nav.classList.add('active');
        box.classList.add('active');
        container.classList.add('active');
        
        li.forEach(i => {
            i.classList.add('active')
        });
    }
    else
    {
        header.classList.remove('active');
        nav.classList.remove('active');
        box.classList.remove('active');
        container.classList.remove('active');
          
        li.forEach(i => {
            i.classList.remove('active')
        });
    }    
};

function resizeMenu()
{
    if (window.innerWidth>970)
    {
        hamburger.classList.remove('active');
        header.classList.remove('active');
        box.classList.remove('active');
        li.forEach(i => {
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
activeMenu();

window.addEventListener('resize', () =>
{
    resizeMenu()
});

box.addEventListener('click', () =>
{
    if (activeToggle == false)
        {
            activeToggle = true;
        }
    else
        {
            activeToggle = false;
        }
    activeMenu(activeToggle);
});


// 
// scroll horizontal
// 
let posX = 0;
let direction = true;
window.addEventListener('mousewheel', (e)=>{
    console.log(posX);
    if (direction == true)
        {   posX += window.innerWidth; 
            if (posX > (window.innerWidth*3))
            {   direction == false;
                posX -= window.innerWidth;
            }
        }
    else 
        {   posX -= window.innerWidth;
            if (posX < 0)
            {   posX -= window.innerWidth;
                direction = true;
            }
        }

    window.scrollTo({
        left: posX,
        behavior: 'smooth'
      });
});