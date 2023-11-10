const moviesContainer = document.querySelector(".movies");
const searchForm = document.querySelector(".header__serach-input-form");
const searchInput = document.querySelector(".header__serach-input");
const swiperWrapper = document.querySelector(".topPopular");
const swiperWrapper2 = document.querySelector(".premiere");
const swiperWrapper3 = document.querySelector(".releases");
const swiperWrapper4 = document.querySelector(".digitalReleases");
const searchResults = document.querySelector(".searchResults");
const saved = document.querySelector(".saved");

document.addEventListener("DOMContentLoaded", function(){
    getMovies();
    moviePrimere();
    closestReleases();
    digitalReleases();
    getLocalTodos();
});
searchForm.addEventListener("submit",searchMovies);


const apiKey = "e9926010-eee2-4969-a7ad-bbeaf0779c3b";
let topPopularMovies = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";



async function moviePrimere(){
    let month = "NOVEMBER"
    const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=${month}`,{
        headers:{
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
        }
    })

    let data = response.data.items
    createElement2(data);
}

async function digitalReleases(){
    let month = "NOVEMBER";
    let year = "2023"
    const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${year}&month=${month}&page=1`,{
        headers:{
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
        }
    })

    let data = response.data.releases
    createElement4(data);
    console.log(data)
}



async function closestReleases(){
    const response = await axios.get("https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1",{
        headers:{
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
        }
    })

    let data = response.data.items
    console.log(data)
    createElement3(data);
}





async function searchMovies(e){
    e.preventDefault();
    let q = searchInput.value;
    const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${q}&page=1`,{
        headers:{
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
        }
    })

    const data = response.data.films
    moviesContainer.innerHTML = "";
    searchInput.value=""
    createElement(data);
    

}




async function  getMovies (){
    try{
    const response = await axios.get(topPopularMovies,{
        headers:{
            "X-API-KEY": apiKey,
            "Content-Type": "application/json"
        }
    });

    const data = response.data.items;
    console.log(data)
    createElement(data);
  
} catch(error){
    console.error("Error fetching movies:", error);

}

}




function createElement(data){
    data.forEach((m)=>{
        const movie = document.createElement("div");
        movie.classList.add("movie");
        const movieCoverInner = document.createElement("div");
        movieCoverInner.classList.add("movie__cover-inner");
        const posterImage = document.createElement("img");
        posterImage.classList.add("movie__cover");
        posterImage.src = m.posterUrl;
        const darkened = document.createElement("div");
        darkened.classList.add("movie__cover-darkened");
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie__info");
        const movieTitle = document.createElement("div");
        movieTitle.classList.add("movie__title");
        movieTitle.innerHTML = m.nameRu;
        let genres = m.genres;
        for(let i = 0; i<genres.length&&i<2; i++){
        const category = document.createElement("span");
        category.classList.add("movie__category");
        category.innerHTML= `${genres[i].genre}, `
        movieInfo.append(category)

        }
        if(m.ratingImdb !== null && m.ratingImdb !== undefined){
        const rating = document.createElement("div");
        rating.classList.add("movie__average");
        rating.innerHTML= m.ratingImdb;
        if(m.ratingImdb>6){
            rating.classList.add("movie__average-green");
        }else{
            rating.classList.add("movie__average-orange");
        }
        movieInfo.append(rating);      
        }

        if(m.rating !== null && m.rating !== undefined){
            const rating = document.createElement("div");
            rating.classList.add("movie__average");
            rating.innerHTML= m.rating;
            if(m.rating>6){
                rating.classList.add("movie__average-green");
            }else{
                rating.classList.add("movie__average-orange");
            }
            movieInfo.append(rating);      
            }
      
      
        const label = document.createElement("label");
        label.classList.add("movie__favorite");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = m.imdbId ? m.imdbId : m.kinopoiskId;
        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa-solid", "fa-heart", "favorite__icon");
        label.append(input, likeIcon);
        movieInfo.append(movieTitle,label);
        movieCoverInner.append(posterImage,darkened,movieInfo);
        movie.append(movieCoverInner);
        moviesContainer.append(movie);

        let isChecked = false;
        let checkbox = document.getElementById(input.id);
         checkbox.addEventListener("change",function(){
            if(checkbox.checked){
                isChecked = true;
            }
             let formData = {
                id:input.id,
                 posterImageSrc: m.posterUrl,
                 movieTitle: m.nameRu,
                 genres: m.genres,
                 rating:m.ratingImdb,
                 check:isChecked,
             }

             saveToLocalStorage(formData)
         });     
});
};

function createElement2(data){
    data.forEach((m)=>{
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");
        const movie = document.createElement("div");
        movie.classList.add("movie");
        const movieCoverInner = document.createElement("div");
        movieCoverInner.classList.add("movie__cover-inner");
        const posterImage = document.createElement("img");
        posterImage.classList.add("movie__cover");
        posterImage.src = m.posterUrl;
        const darkened = document.createElement("div");
        darkened.classList.add("movie__cover-darkened");
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie__info");
        const movieTitle = document.createElement("div");
        movieTitle.classList.add("movie__title");
        movieTitle.innerHTML = m.nameRu;
        let genres = m.genres;
        for(let i = 0; i<genres.length&&i<2; i++){
        const category = document.createElement("span");
        category.classList.add("movie__category");
        category.innerHTML= `${genres[i].genre}, `
        movieInfo.append(category)

        }
        if(m.ratingImdb !== null && m.ratingImdb !== undefined){
        const rating = document.createElement("div");
        rating.classList.add("movie__average");
        rating.innerHTML= m.ratingImdb;
        if(m.ratingImdb>6){
            rating.classList.add("movie__average-green");
        }else{
            rating.classList.add("movie__average-orange");
        }
        movieInfo.append(rating);      
        }

        if(m.rating !== null && m.rating !== undefined){
            const rating = document.createElement("div");
            rating.classList.add("movie__average");
            rating.innerHTML= m.rating;
            if(m.rating>6){
                rating.classList.add("movie__average-green");
            }else{
                rating.classList.add("movie__average-orange");
            }
            movieInfo.append(rating);      
            }
      
      
        const label = document.createElement("label");
        label.classList.add("movie__favorite");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = m.kinopoiskId ? m.kinopoiskId : m.index;
        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa-solid", "fa-heart", "favorite__icon");
        label.append(input, likeIcon);
        movieInfo.append(movieTitle,label);
        movieCoverInner.append(posterImage,darkened,movieInfo);
        movie.append(movieCoverInner);
        swiperSlide.append(movie);
        swiperWrapper2.append(swiperSlide);
        let isChecked = false;
        let checkbox = document.getElementById(input.id);
         checkbox.addEventListener("change",function(){
            if(checkbox.checked){
                isChecked = true;
            }
             let formData = {
                id:input.id,
                 posterImageSrc: m.posterUrl,
                 movieTitle: m.nameRu,
                 genres: m.genres,
                 rating:m.ratingImdb,
                 check:isChecked,
             }

             saveToLocalStorage(formData)
         }); 
       
    })
}

function createElement3(data){
    data.forEach((m)=>{
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");
        const movie = document.createElement("div");
        movie.classList.add("movie");
        const movieCoverInner = document.createElement("div");
        movieCoverInner.classList.add("movie__cover-inner");
        const posterImage = document.createElement("img");
        posterImage.classList.add("movie__cover");
        posterImage.src = m.posterUrl;
        const darkened = document.createElement("div");
        darkened.classList.add("movie__cover-darkened");
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie__info");
        const movieTitle = document.createElement("div");
        movieTitle.classList.add("movie__title");
        movieTitle.innerHTML = m.nameRu;
        let genres = m.genres;
        for(let i = 0; i<genres.length&&i<2; i++){
        const category = document.createElement("span");
        category.classList.add("movie__category");
        category.innerHTML= `${genres[i].genre}, `
        movieInfo.append(category)

        }
        if(m.ratingImdb !== null && m.ratingImdb !== undefined){
        const rating = document.createElement("div");
        rating.classList.add("movie__average");
        rating.innerHTML= m.ratingImdb;
        if(m.ratingImdb>6){
            rating.classList.add("movie__average-green");
        }else{
            rating.classList.add("movie__average-orange");
        }
        movieInfo.append(rating);      
        }

        if(m.rating !== null && m.rating !== undefined){
            const rating = document.createElement("div");
            rating.classList.add("movie__average");
            rating.innerHTML= m.rating;
            if(m.rating>6){
                rating.classList.add("movie__average-green");
            }else{
                rating.classList.add("movie__average-orange");
            }
            movieInfo.append(rating);      
            }
      
      
        const label = document.createElement("label");
        label.classList.add("movie__favorite");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = m.imdbId ? m.imdbId : m.kinopoiskId;
        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa-solid", "fa-heart", "favorite__icon");
        label.append(input, likeIcon);
        movieInfo.append(movieTitle,label);
        movieCoverInner.append(posterImage,darkened,movieInfo);
        movie.append(movieCoverInner);
        swiperSlide.append(movie);
        swiperWrapper3.append(swiperSlide);
        let isChecked = false;
        let checkbox = document.getElementById(input.id);
         checkbox.addEventListener("change",function(){
            if(checkbox.checked){
                isChecked = true;
            }
             let formData = {
                id:input.id,
                 posterImageSrc: m.posterUrl,
                 movieTitle: m.nameRu,
                 genres: m.genres,
                 rating:m.ratingImdb,
                 check:isChecked,
             }

             saveToLocalStorage(formData)
         }); 
       
    })
}

 function createElement4(data){
     data.forEach((m)=>{
         const swiperSlide = document.createElement("div");
         swiperSlide.classList.add("swiper-slide");
         const movie = document.createElement("div");
         movie.classList.add("movie");
         const movieCoverInner = document.createElement("div");
         movieCoverInner.classList.add("movie__cover-inner");
         const posterImage = document.createElement("img");
         posterImage.classList.add("movie__cover");
         posterImage.src = m.posterUrl;
         const darkened = document.createElement("div");
         darkened.classList.add("movie__cover-darkened");
         const movieInfo = document.createElement("div");
         movieInfo.classList.add("movie__info");
         const movieTitle = document.createElement("div");
         movieTitle.classList.add("movie__title");
         movieTitle.innerHTML = m.nameRu;
         let genres = m.genres;
        for(let i = 0; i<genres.length&&i<2; i++){
         const category = document.createElement("span");
         category.classList.add("movie__category");
         category.innerHTML= `${genres[i].genre}, `
         movieInfo.append(category)

         }
         if(m.ratingImdb !== null && m.ratingImdb !== undefined){
         const rating = document.createElement("div");
         rating.classList.add("movie__average");
         rating.innerHTML= m.ratingImdb;
         if(m.ratingImdb>6){
             rating.classList.add("movie__average-green");
         }else{
             rating.classList.add("movie__average-orange");
         }
         movieInfo.append(rating);      
         }

         if(m.rating !== null && m.rating !== undefined){
             const rating = document.createElement("div");
             rating.classList.add("movie__average");
             rating.innerHTML= m.rating;
             if(m.rating>6){
                 rating.classList.add("movie__average-green");
             }else{
                 rating.classList.add("movie__average-orange");
             }
             movieInfo.append(rating);      
             }
      
      
         const label = document.createElement("label");
         label.classList.add("movie__favorite");
         const input = document.createElement("input");
         input.type = "checkbox";
         input.id = m.filmId  ? m.filmId  : m.index;
         const likeIcon = document.createElement("i");
         likeIcon.classList.add("fa-solid", "fa-heart", "favorite__icon");
         label.append(input, likeIcon);
         movieInfo.append(movieTitle,label);
         movieCoverInner.append(posterImage,darkened,movieInfo);
         movie.append(movieCoverInner);
         swiperSlide.append(movie);
         swiperWrapper4.append(swiperSlide);
         let isChecked = false;
         let checkbox = document.getElementById(input.id);
          checkbox.addEventListener("change",function(){
             if(checkbox.checked){
                 isChecked = true;
             }
              let formData = {
                 id:input.id,
                  posterImageSrc: m.posterUrl,
                  movieTitle: m.nameRu,
                  genres: m.genres,
                  rating:m.ratingImdb,
                  check:isChecked,
              }
 
              saveToLocalStorage(formData)
          }); 
       
     })
 }

 function saveToLocalStorage(movie){
    let movies;

    if(localStorage.getItem("movies")===null){
        movies = [];
    } else{
        movies = JSON.parse(localStorage.getItem("movies"));
    }
    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
}




function getLocalTodos (){
    let movies;
    if(localStorage.getItem("movies")===null){
        movies =[];
    } else{
        movies = JSON.parse(localStorage.getItem("movies"))
    }

    movies.forEach((m)=>{
        const movie = document.createElement("div");
        movie.classList.add("movie");
        const movieCoverInner = document.createElement("div");
        movieCoverInner.classList.add("movie__cover-inner");
        const posterImage = document.createElement("img");
        posterImage.classList.add("movie__cover");
        posterImage.src = m.posterImageSrc;
        const darkened = document.createElement("div");
        darkened.classList.add("movie__cover-darkened");
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie__info");
        const movieTitle = document.createElement("div");
        movieTitle.classList.add("movie__title");
        movieTitle.innerHTML = m.movieTitle;
        let genres = m.genres;
        for(let i = 0; i<genres.length&&i<2; i++){
        const category = document.createElement("span");
        category.classList.add("movie__category");
        category.innerHTML= `${genres[i].genre}, `
        movieInfo.append(category)

        }
        if(m.rating !== null && m.rating !== undefined){
        const rating = document.createElement("div");
        rating.classList.add("movie__average");
        rating.innerHTML= m.rating;
        if(m.rating>6){
            rating.classList.add("movie__average-green");
        }else{
            rating.classList.add("movie__average-orange");
        }
        movieInfo.append(rating);      
        }

        if(m.rating !== null && m.rating !== undefined){
            const rating = document.createElement("div");
            rating.classList.add("movie__average");
            rating.innerHTML= m.rating;
            if(m.rating>6){
                rating.classList.add("movie__average-green");
            }else{
                rating.classList.add("movie__average-orange");
            }
            movieInfo.append(rating);      
            }
      
      
        const label = document.createElement("label");
        if(m.check){
            label.classList.add("movie__favorite");
        }else{
            label.classList.remove("movie__favorite");
        }
        
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id=m.id;
        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa-solid", "fa-heart", "favorite__icon");
        label.append(input, likeIcon);
        movieInfo.append(movieTitle,label);
        movieCoverInner.append(posterImage,darkened,movieInfo);
        movie.append(movieCoverInner);
        saved.append(movie);

        const checkbox = document.getElementById(input.id);
        checkbox.setAttribute("checked","checked");
        checkbox.classList.add("liked");
        checkbox.addEventListener("change", function (event) {
            if (!event.target.checked) {
                movie.remove();
                removeLocalMovie(m.id);
            }
        });
        
      
   
});
};

function removeLocalMovie(movieId){
    let movies; 
    if(localStorage.getItem("movies")===null){
        movies =[];
    } else{
        movies = JSON.parse(localStorage.getItem("movies"));
    }

    const indexToRemove = movies.findIndex(m => m.id === movieId);
    if(indexToRemove!==-1){
        movies.splice(indexToRemove,1);
        localStorage.setItem("movies", JSON.stringify(movies))
    }
    

}

