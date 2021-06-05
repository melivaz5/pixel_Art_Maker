

window.onload = function() {
    var mouse = false;
    var borrando = false;
    var canvas = document.getElementById("canvas1");
    var cuadritos = [];

    //   600/38= 16 cuadrados.   
    var sizeCuadro = { ancho: 38, alto: 38 };
    var color = "";
    var inputColor = document.getElementById("color-picker");
    var botonDescarga = document.getElementById("botonDescarga");
    var botonBorrarTodo = document.getElementById("clearGrid");
    var botonBorrar = document.getElementById("erase");
    var botonDibujar = document.getElementById("draw");
    var botonLlenar = document.getElementById("quick-fill");
    var botonConfirmar = document.getElementById("submit-button");
    var canvasImage = document.getElementById("canvasImage");
    var formulario = document.getElementById("formulario");

    var ctx = canvas.getContext("2d");
  
    if (canvas && canvas.getContext) {
      var ctx = canvas.getContext("2d");
      if (ctx) {
        function dibujaGrid(disX, disY, anchoLinea, color) {
          ctx.strokeStyle = color;
          ctx.lineWidth = anchoLinea;
          var columnas = [];
          var filas = [];
          for (i = disX; i < canvas.width; i += disX) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
            columnas.push(i);
          }
          for (i = disY; i < canvas.height; i += disY) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(ctx.canvas.width, i);
            ctx.stroke();
            filas.push(i);
          }
          columnas.push(0);
          filas.push(0);
          for (x = 0; x < columnas.length; x++) {
            for (y = 0; y < filas.length; y++) {
              cuadritos.push([columnas[x], filas[y], disX, disY]);
            }
          }
        }
  
        function fillCell(x, y) {
          color = inputColor.value;

          if (borrando === true) {
            color = "#FFFFFF" ;
          }

          ctx.fillStyle = color;

          for (i = 0; i < cuadritos.length; i++) {
            var cuadro = cuadritos[i];
            if (
              x > cuadro[0] &&
              x < cuadro[0] + cuadro[2] &&
              y > cuadro[1] &&
              y < cuadro[1] + cuadro[3]
            ) {
              ctx.fillRect(
                cuadro[0],
                cuadro[1],
                sizeCuadro.ancho,
                sizeCuadro.alto
              );
              break;
            }
          }
          dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 0.4, "#44414B");
        }

        canvas.onmousemove = function(e) {
          if (mouse) {
            var canvaspos = canvas.getBoundingClientRect();
            fillCell(e.clientX - canvaspos.left, e.clientY - canvaspos.top);
          }
        };
  
        canvas.onclick = function(e) {
          var canvaspos = canvas.getBoundingClientRect();
          fillCell(e.clientX - canvaspos.left, e.clientY - canvaspos.top);
        };
  
        canvas.onmousedown = function() {
          mouse = true;
        };

        document.onmouseup = function() {
          mouse = false;
        };



        botonConfirmar.addEventListener(
          "click",
          function() {
            var imagenActual = canvas.toDataURL();
            canvasImage.value = imagenActual;
            formulario.submit();
          },
          false
        );


        botonDescarga.addEventListener(
          "click",
          function() {
            botonDescarga.href = canvas.toDataURL();
            botonDescarga.download = "mypainting.png";
          },
          false
        );

       
        botonBorrarTodo.addEventListener(
          "click",
          function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 1, "#44414B");
          },
          false
        );

        botonLlenar.addEventListener(
          "click",
          function(e) {
            ctx.fillStyle = inputColor.value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 1, "#44414B");
          },
          false
        );

        botonDibujar.addEventListener(
          "click",
          function() {
            borrando = false;
          },
          false
        );

        botonBorrar.addEventListener(
          "click",
          function() {
            borrando = true;
          },
          false
        );


        dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 1, "#44414B");
      } else {
        alert("No se pudo cargar el contexto");
      }
    }
  };