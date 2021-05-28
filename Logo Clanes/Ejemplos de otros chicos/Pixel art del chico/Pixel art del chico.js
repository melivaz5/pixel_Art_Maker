// Create a grid that a user can color with clicks
//   - allows grid size entry and color selection

// When size is submitted by the user, call makeGrid()

// Set the inital 'paint' changes happen in click event
const PAINT = 'PAINT';
const ERASE = 'ERASE';
const doc = $(document);
const gridCanvas = $('#gridCanvas');
const grid = $('#pixelCanvas');
const userHeight = $('#inputHeight');
const userWidth = $('#inputWidth');
const displayHeight = $('#gridHeightDisplay');
const displayWidth = $('#gridWidthDisplay');
const userColor = $('#colorPicker');
const tileMode = $('.paintOrErase');
const clear = $('#clearGrid');

let gridTileMode = PAINT // controls paint or erase of grid cells (td's)

$('#createGrid').on('click', function makeGrid(event) {
    // prevent page refreshing when clicking submit
    event.preventDefault();
    let mouseIsDown = false;
    let rows = userHeight.val();
    let columns = userWidth.val();

    grid.children().remove(); // delete any previous table rows

//Build the grid row by row and then append to the table
//  project rubrics requires use of for and while loops

    let tableRows = '';
    let r = 1;
    while (r <= rows) {
        tableRows += '<tr>';
        for (let c=1; c <= columns; c++) {
            tableRows += '<td></td>';
        }
        tableRows += '</tr>';
        r += 1;
    } // end while loop
    grid.append(tableRows); // add grid to DOM
    $('.legend').show(); // <p> tag with instructions for mouseover
    grid.toggleClass('flyItIn'); // fly in effect for grid
    grid.toggleClass('flyItIn2') // Twice to trigger reflow
// Listen for click to paint or erase a tile

    grid.on('click', 'td', function() {
        paintEraseTiles($(this));
    });

// Listen for mouse down, up and over for continuous paint and erase

    grid.on('mousedown', function(event) {
        event.preventDefault();
        mouseIsDown = event.which === 1 ? true : false;
    });

    doc.on('mouseup', function() {
        mouseIsDown = false;
    });

    grid.on('mouseover', 'td', function() {
        if (mouseIsDown) {paintEraseTiles($(this));}
    }); // end continuous paint and erase
}); // end grid

// paint or erase cells based on the mode (girdTileMode)

function paintEraseTiles(targetCell) {
    targetCell.css('background-color', gridTileMode === PAINT ? userColor.val() : 'transparent');
}

userHeight.on('input', function() {
    displayHeight.text(' ' + $(this).val());
});

userWidth.on('input', function() {
    displayWidth.text(' ' + $(this).val());
});

userColor.on('input', function() {
    gridTileMode = PAINT;
    tileMode.text(' ' + gridTileMode);
});

// Erase colors from the grid

clear.on('click', function() {
    gridCanvas.toggleClass('rotateCanvas');
    grid.children().children().removeAttr("style");
});

// set the mode to PAINT or ERASE

$('#mode').on('click', function(event) {
    gridTileMode = event.target.className.indexOf('paint') >=0 ? PAINT : ERASE;
    // gridTileMode = event.target.id === 'paintBtn' ? PAINT : ERASE;
    tileMode.text(' ' + gridTileMode);
}); // end button on click
