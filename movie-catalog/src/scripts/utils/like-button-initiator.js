import FavoriteMovieIdb from '../data/favorite-movie-idb';
import { createLikeButton, createLikedButton } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, movie }){
    this._likeButtonContainer = likeButtonContainer;
    this._movie = movie;

    await this._renderButton();
  },

  //tombol like dirender berdasarkan sudah belumnya movie berada di database
  async _renderButton(){
    const { id } = this._movie;

    if (await this._isMovieExist(id)){
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isMovieExist(id){
    const movie = await FavoriteMovieIdb.getMovie(id);
    return !!movie;
  },

  _renderLike(){
    this._likeButtonContainer.innerHTML = createLikeButton();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.putMovie(this._movie);
      this._renderButton();
    });
  },

  _renderLiked(){
    this._likeButtonContainer.innerHTML = createLikedButton();

    const likedButton = document.querySelector('#likeButton');
    likedButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.deleteMovie(this._movie.id);
      this._renderButton();
    });
  }
};

export default LikeButtonInitiator;