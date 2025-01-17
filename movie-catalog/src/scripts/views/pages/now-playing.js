import MovieDBSource from '../../data/movie-source';
import { createMovieItemTemplate } from '../templates/template-creator';
const NowPlaying = {
  async render(){
    return `
      <div class="content">
            <h2 class="content_heading">Now Playing in Cinema</h2>
            <div id="movies" class="movies">
                
            </div>
        </div>    
    `;
  },

  async afterRender(){
    //fungsi yang dipanggil setelah render
    const movies = await MovieDBSource.nowPlayingMovies();
    const moviesContainer = document.querySelector('#movies');
    movies.forEach((movie) => {
      moviesContainer.innerHTML += createMovieItemTemplate(movie);
    });
  },
};

export default NowPlaying;