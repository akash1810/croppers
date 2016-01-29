/*global $*/
/*eslint no-unused-vars: 0, new-cap: 0 */

'use strict';

$(function () {
  function getCell(table, cell) {
    return document.getElementById(table).getElementsByClassName(cell)[0];
  }

  function getTable(tableId) {
    const table = {};

    ['x0', 'x1', 'y0', 'y1', 'width', 'height'].forEach(cell => table[cell] = getCell(tableId, cell));

    return table;
  }

  function cropperjs () {
    const Cropper = window.Cropper;
    const image = document.getElementById('cropperjs-image');
    const table = getTable('cropperjs-data');

    let cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 2,
      crop: (data) => {
        table.x0.innerHTML = data.x;
        table.x1.innerHTML = data.width - data.x;
        table.y0.innerHTML = data.y;
        table.y1.innerHTML = data.height - data.y;
        table.width.innerHTML = data.width;
        table.height.innerHTML = data.height;
      }
    });
  }

  function jcrop () {
    const image = document.getElementById('jcrop-image');
    const initialCoords = [0, 0, image.naturalWidth, image.naturalHeight];
    const table = getTable('jcrop-data');

    const options = {
      onSelect: (data) => {
        table.x0.innerHTML = data.x;
        table.x1.innerHTML = data.x2;
        table.y0.innerHTML = data.y;
        table.y1.innerHTML = data.y2;
        table.width.innerHTML = data.w;
        table.height.innerHTML = data.h;
      },
      setSelect: initialCoords,
      trueSize: [image.naturalWidth, image.naturalHeight]
    };

    $(image).Jcrop(options, function () {
      this.setOptions({
        aspectRatio: 1.0
      });
    });
  }

  cropperjs();
  jcrop();
});

