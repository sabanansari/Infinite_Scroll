const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded =0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;


// Unsplash API
let count=3;
let apiUrl =  `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to Set Attributes
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements For Links & Photos

function displayPhotos(){
      
      imagesLoaded =0;
    totalImages = photosArray.length;
    
    photosArray.forEach((photo)=>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });
        // Event Listener to check when each img is finished loading
        img.addEventListener('load',imageLoaded);
        //Put <img> inside <a>, then put both in imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos(); 
        
        if(initialLoad)
        {
            count = 10;
            apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
            initialLoad=false;
        }
         

    }catch(error){
        console.log(error);
    }
    
}

// Check to see if reached to bottom then Load More Photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight -1000 && ready)
    {   
        ready =false;
        getPhotos();
    }
})

// On Load
getPhotos();