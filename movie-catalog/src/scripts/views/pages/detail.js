import MovieDBSource from '../../data/movie-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { createMovieDetailTemplate } from '../templates/template-creator';


const Detail = {
  async render(){
    return `
            <div id="movies" class="movies"></div>
            <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender(){
    //fungsi ini dipanggil setelah render
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const movie = await MovieDBSource.detailMovie(url.id);
    const moviesContainer = document.querySelector('#movies');

    moviesContainer.innerHTML = createMovieDetailTemplate(movie);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
      },
    });
  },
};

export default Detail;