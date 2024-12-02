const CONFIG = {
  KEY : '0cac6589af70d1ac20fd714813f0dfd8',
  BASE_URL : 'https://api.themoviedb.org/3/',
  BASE_IMAGE_URL: 'https://image.tmdb.org/t/p/w500/',
  DEFAULT_LANGUAGE: 'en-us',
  //key cache
  // CACHE_NAME: 'MovieCatalogue-V1'
  //kita ubah cache_name supaya lebih dinamis, sesuai waktu. ini hanya saat pengambangan saja

  //setelah dibuild tak dipakai lagi
  //CACHE_NAME: new Date().toISOString(),



  //konfigurasi IndexedDB, digunakan untuk menyimpan film favorit
  DATABASE_NAME: 'movie-catalogue-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'movies',
};

export default CONFIG;
