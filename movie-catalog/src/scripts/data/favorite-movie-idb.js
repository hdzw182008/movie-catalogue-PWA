//membuka/membuat DB
import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG; //ambil apa yang diperlukan dari object config di file config

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {//menambah/mengupdate db
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

//persiapan fungsi operasi database
const FavoriteMovieIdb = {
  async getMovie(id){
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllMovies(){
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putMovie(movie){
    return (await dbPromise).put(OBJECT_STORE_NAME, movie);
  },
  async deleteMovie(id){
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteMovieIdb;