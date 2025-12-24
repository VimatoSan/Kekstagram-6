import {renderPictures} from './pictures.js';
import {getRandomElementsFromArray} from './utils.js';
import {filterTypes, RANDOM_FILTER_PICTURES_COUNT} from './constants.js';
import {debounce} from './utils.js';


function showFilters(pictures) {
  const filterForm = document.querySelector('.img-filters__form');
  const filtersContainer = document.querySelector('.img-filters');
  filtersContainer.classList.remove('img-filters--inactive');

  let clickedFilterButton;
  const setClickedButtonStyles = (evt) => {
    clickedFilterButton = evt.target.closest('.img-filters__button');
    const curFilter = document.querySelector('.img-filters__button--active');
    curFilter.classList.remove('img-filters__button--active');
    clickedFilterButton.classList.add('img-filters__button--active');
  };

  const debouncedSort = debounce(() => useFilters(clickedFilterButton, pictures));
  filterForm.addEventListener('click', (evt) => {
    setClickedButtonStyles(evt);
    debouncedSort();
  });
}

function sortByCommentsCounts(pictureA, pictureB) {
  return pictureB.comments.length - pictureA.comments.length;
}

function useFilters(button, pictures) {
  let sortedPictures;
  document.querySelectorAll('.picture').forEach((el) => el.remove());
  switch (button.id) {
    case filterTypes.DEFAULT:
      sortedPictures = pictures;
      break;
    case filterTypes.RANDOM:
      sortedPictures = getRandomElementsFromArray(pictures, RANDOM_FILTER_PICTURES_COUNT);
      break;
    case filterTypes.COMMENT_COUNT:
      sortedPictures = pictures.slice().sort(sortByCommentsCounts);
      break;
  }
  renderPictures(sortedPictures);
}

export {showFilters};
