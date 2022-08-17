(function () {
  'use strict';

  const dropdownMenu = document.querySelectorAll('#dropdown-big-menu');
  if (dropdownMenu.length !== 0) {
    dropdownMenu.forEach((dropdownMenuItem) => {
      dropdownMenuItem.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });
  }

})();
//# sourceMappingURL=site-header--inline.js.map
