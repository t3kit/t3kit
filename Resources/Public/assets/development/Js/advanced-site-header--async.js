(function () {
  'use strict';

  var dropdownMenu = document.querySelectorAll("#dropdown-big-menu");
  if (dropdownMenu.length != 0) {
    dropdownMenu.forEach((dropdownMenuItem) => {
      dropdownMenuItem.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });
  }

})();
//# sourceMappingURL=advanced-site-header--async.js.map
