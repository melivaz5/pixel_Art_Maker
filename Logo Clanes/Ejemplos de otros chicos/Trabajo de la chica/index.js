// Since script tag is at end of body, $(document).ready() not required

const pixelCanvas = $('.pixel-canvas');

let color = $('.color-picker').val();

$('.color-picker').change(function() {
    color = $('.color-picker').val();
});

// Creates default-sized grid immediately on page load
$(window).on('load', makeGrid);

// Creates grid
function makeGrid(e) {
  // preventDefault() method intercepts 'submit' event, which would normally submit form and cause page to refresh, preventing makeGrid() function from being processed
  if (e) {
    e.preventDefault();
  }
  $('body').css('cursor', 'url(brush.png) 0 32, auto');
  // If grid already present, clears any cells that have been filled in
  $('table tr').remove();
  // Grid height value entered by user
  const heightInput = $('.input-height').val();
  // Grid width value entered by user
  const widthInput = $('.input-width').val();
  // Outer for loop adds desired number of rows (grid height)
  for (let i = 1; i <= heightInput; i++) {
    $('table').append('<tr></tr>');
    // Inner loop adds desired number of columns as cells (td) within rows (tr) and creates a class called 'Cell' for each cell (td). Class is used later, allowing user to color cells on click. (Capitalized class 'Cell' because Udacity Frontend Nanodegree Style Guide (JavaScript page) advises using Pascal Case for class names)
    for (let j = 1; j <= widthInput; j++) {
      // ':last' is a jQuery extension (not part of CSS specification) that selects a single element by filtering current jQuery collection and matching last element within it. For best performance using ':last', first select element(s) using pure CSS selector, then use .filter(":last")
      $('tr').filter(':last').append('<td></td>');
      // here, .attr() method sets attribute (class) to name provided as second argument for matched elements (td)
      $('td').attr('class', 'Cell');
    }
  }
  // Fills in cell with chosen color when mouse button is pressed down over it. Unlike function dragColor(), doesn't require mouse to enter a cell while mouse button is being held down. Note: 'mousedown' event is fired when mouse button is pressed but before it's released, whereas click event is fired after mousedown (click) and mouseup (release) events have completed
  $('.Cell').mousedown(function() {
  // Adds chosen color to cell upon click event. Selector 'this' refers to cell (with class 'Cell') being clicked
    $(this).css('background-color', color);
  });
  dragColor();
};

$('.size-picker').submit(makeGrid);

// Resets on clicking reset icon
$('.fa-redo').on('click', makeGrid);

// Enables mouse-drag coloring (default mode). Fills in cell when mouse pointer enters it and mouse is pressed down
function dragColor() {
  // Filters clicks by those in cells
  $(pixelCanvas).on('mousedown', 'td', function() {
    mousedown = true;
  });

  // 'mouseup': when pointer is over element and mouse button has been clicked then released (unlike click event, doesn't have to be on same element on which mousedown occurred)
  $(document).mouseup(function() {
    mousedown = false;
  });

  // 'mouseover' triggered when mouse pointer enters an element
  $(pixelCanvas).on('mouseover', 'td', function() {
    if (mousedown) {
      $(this).css('background-color', color);
    }
  });
}

// Removes color from cell on double-click
$(pixelCanvas).on('dblclick', 'td', function() {
  $(this).removeAttr('style');
});
// Adds color-fill functionality
$('.quick-fill').click(function() {
  pixelCanvas.children().find('td').css('background-color', color);
});

// (NONDEFAULT) DRAW AND ERASE MODES:

// Allows for drag erasing upon clicking 'erase' button
$('.erase-mode').click(function() {
  $('body').css('cursor', 'url(eraser.png) 0 32, auto');
  // Removes event handler (mousedown) enabling single-cell coloring while in default mode (inside makeGrid()). Without this, after clicking 'erase' mode upon page load, mousedown fills cell with color (but re-removes color on mouseup)
  $('.Cell').off();
  function dragErase() {
    // Filters clicks by those in cells
    $(pixelCanvas).on('mousedown', 'td', function(evt) {
      mousedown = true;
    });
    $(document).mouseup(function() {
      mousedown = false;
      evt.preventDefault(); // Prevents unwanted behavior
    });
    $(pixelCanvas).on('mouseover', 'td', function() {
      if (mousedown) {
        $(this).css('background-color', '');
      }
    });
  }
  // Enables single-cell erase while in erase mode
  $(pixelCanvas).on('mousedown', 'td', function() {
    $(this).removeAttr('style');
  });
  dragErase();
});

// Allows user to return to (default) draw mode after using 'erase' button. Fills in cell when mouse pointer enters it and mouse is pressed down
$('.draw-mode').click(function() {
  $('body').css('cursor', 'url(brush.png) 0 32, auto');
  // Removes event handlers that were attached to the grid with .on(). Without this, code for single-cell erase while in erase mode prevents single-cell coloring while in draw mode
  $(pixelCanvas).off();
  function dragDrawMode() {
    $(pixelCanvas).on('mousedown', 'td', function() {
      mousedown = true;
    });
    $(document).mouseup(function() {
      mousedown = false;
    });
    $(pixelCanvas).on('mouseover', 'td', function() {
      if (mousedown) {
        $(this).css('background-color', color);
      }
    });
  }
  // Enables single-cell coloring while in draw mode
  $('td').mousedown(function() {
    $(this).css('background-color', color);
  });
  dragDrawMode();
});