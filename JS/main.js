// Descrizione
// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
// Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
// Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
// - id del post, numero progressivo da 1 a n
// - nome autore,
// - foto autore,
// - data in formato americano (mm-gg-yyyy),
// - testo del post,
// - immagine (non tutti i post devono avere una immagine),
// - numero di likes.
// *Non è necessario creare date casuali*
// *Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*
// Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// Milestone 3- Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// BONUS
//  1. Formattare le date in formato italiano (gg/mm/aaaa)
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
//  3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.


"use strict"

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];




// per prendere la data in formato DD/MM/YYYY

function formatDate(createdat){
    const d = new Date(createdat);
    let formattedDate = d.toLocaleDateString('it-IT');
    console.log(formattedDate);
    return formattedDate;
}





let container = document.getElementById('container')




// creazione post dinamica
posts.forEach(element => {

    let post = document.createElement('div');


    post.innerHTML = `
    <div class="post">
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
            ${getProfile(element.author)}                         
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${element.author.name}</div>
                <div class="post-meta__time">${formatDate(element.created)}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${element.content}
    </div>
    <div class="post__image">
        <img src="${element.media}" alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
            <a class="like-button js-like-button" href="#" data-postid="${element.id}">
                    <i class="like-button__icon fas fa-thumbs-up " aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
                
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
            </div>
        </div> 
    </div>            
</div>
    `;
    container.append(post);
   
    
});




let btnLikes  = document.querySelectorAll('.like-button');

let onClick = false;

// btnLikes.forEach(element =>  element.addEventListener('click',likesCounter));
btnLikes.forEach(element => {
    element.addEventListener('click',likesCounter);
    
function likesCounter(){
    onClick = !onClick
    const numLikes = document.querySelector(`#like-counter-${this.dataset.postid}`);
  if(onClick){
    this.classList.toggle('like-button--liked');
    let likes = parseInt(numLikes.textContent)
    likes++;
    numLikes.textContent = likes
  }else{
    this.classList.toggle('like-button--liked')
    let likes = parseInt(numLikes.textContent)
    likes--;
    numLikes.textContent = likes
  }
  event.preventDefault()
}});


// aggiungere un immagine profilo placeholder quando non è presente un immagine profilo


function getProfile(profile){
    if(profile.image){
     return `<img class="profile-pic" src="${profile.image}" alt="${profile.name}">`;          
    } else {
     let initials = profile.name.split(' ').reduce((acc,value)=>{
         return acc + value.charAt(0);
     },'');
     return `
         <div class="profile-pic-default">
             <span>${initials}</span>
         </div> 
     `;
    }
 }