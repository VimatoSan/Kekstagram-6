import {renderPictures} from './pictures.js';
import {getRandomElementsFromArray} from './utils.js';
import {RANDOM_FILTER_PICTURES_COUNT} from './constants.js';
import {debounce} from './utils.js';

function showFilters(pictures) {
  const filterForm = document.querySelector('.img-filters__form');
  const filtersContainer = document.querySelector('.img-filters');
  filtersContainer.classList.remove('img-filters--inactive');

  const foo = (evt) => {
    const filterButton = evt.target.closest('.img-filters__button');
    if (filterButton) {
      const curFilter = document.querySelector('.img-filters__button--active');
      curFilter.classList.remove('img-filters__button--active');
      filterButton.classList.add('img-filters__button--active');
      useFilters(filterButton, pictures);
    }
  };
  filterForm.addEventListener('click', debounce((evt) => foo(evt)));
}

function sortComments(pictureA, pictureB) {
  return pictureB.comments.length - pictureA.comments.length;
}

function useFilters(button, pictures) {
  let sortedPictures;
  document.querySelectorAll('.picture').forEach((el) => el.remove());
  switch (button.id) {
    case 'filter-default':
      sortedPictures = pictures;
      break;
    case 'filter-random':
      sortedPictures = getRandomElementsFromArray(pictures, RANDOM_FILTER_PICTURES_COUNT);
      break;
    case 'filter-discussed':
      sortedPictures = pictures.slice().sort(sortComments);
      break;
  }
  renderPictures(sortedPictures);
}

export {showFilters};
