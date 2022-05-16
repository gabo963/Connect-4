// Tamanio del tablero.
const height = $('tr').length;
const width = $('tr').eq(0).children().length;
var gameOn = true;

// Escuchar nombres.
var player1Name;
var player2Name;
while ( player1Name == undefined || player1Name == ""  ) {
  var player1Name = prompt("Player 1: Enter your name. You will be Blue.");
}

while ( player2Name == undefined || player2Name == "" ) {
  var player2Name = prompt("Player 2: Enter your name. You will be Red.");
}

// Iniciar Turnos.
var turno = true;
$("h3").text( player1Name + ": Its your turn, please pick a column to drop your blue chip.");

var player1Color = "rgb(86, 151, 255)";
var player2Color = "rgb(237, 45, 73)";

// Inicializar Posiciones
var listItems = $('button');
var arreglo = [];

let iteri = 0
let iterj = 0
let fila = [];

for( let i = 0; i < listItems.length; i++ )
{
  if( iterj < width ){
    fila.push(listItems.eq(i));
  }
  else {
    arreglo.push(fila);
    fila = [];
    fila.push(listItems.eq(i));
    iteri++;
    iterj = 0;
  }
  iterj++;
}
arreglo.push(fila);

// Logica de presionar un botón.
function PresionadaCol( col ) {
  if (gameOn){
    let cambio = cambiaUltima(col);
    if(cambio){
      // Pasa el turno, ya jugo.
      turno = !turno
      if( turno ){
        $("h3").text( player1Name + ": Its your turn, please pick a column to drop your blue chip.");
      }
      else {
        $("h3").text( player2Name + ": Its your turn, please pick a column to drop your red chip.");
      }
      let victoria = -1;
      let h = verificarHorizontales();
      let v = verificarVerticales();
      let dp = verificarDiagonalesPos();
      let dn = verificarDiagonalesNeg();
      (h != -1) ? victoria = h: undefined;
      (v != -1) ? victoria = v: undefined;
      (dp != -1) ? victoria = dp: undefined;
      (dn != -1) ? victoria = dn: undefined;
      if (victoria != -1){
        gameOn = false;
        $("h3").text("");
        $("h2").text("");
        ( victoria == 1 ) ? $("h1").text( player1Name + " has won! Refresh your browser to play again!") : $("h1").text(player2Name + " has won! Refresh your browser to play again!");
      }
    }
  }
}
// Llena la ultiuma columna de el tablero del color.
function cambiaUltima( col ) {
  // Encuentra y cambia la ultima no llena.
  let cambio = false;
  for( let i = height-1; i >= 0; i--  ){
    if(arreglo[i][col].css("background-color") == "rgb(128, 128, 128)"){
      if(turno){
        arreglo[i][col].css("background-color",player1Color);
      }
      else {
        arreglo[i][col].css("background-color",player2Color);
      }
      cambio = true;
      break;
    }
  }
  return cambio;
}
// Verifica si gano algun jugador por las horizontales.
function verificarHorizontales(){
  let gana = -1;

  for( let i = 0; i < height; i++ ){
    let vic = 0;
    let ply = 0;
    for( let j = 0; j < width; j++ ){
      if( j > 0 )
      {
        if( arreglo[i][j].css("background-color") == arreglo[i][j-1].css("background-color") && arreglo[i][j].css("background-color") != "rgb(128, 128, 128)" )
        {
          vic++;
          arreglo[i][j].css("background-color") == player1Color ? ply = 1: undefined
          arreglo[i][j].css("background-color") == player2Color ? ply = 2: undefined
        }
        else {
          vic = 0;
        }
      }
      if (vic == 3){
        gana = ply;
        break;
        break;
      }
    }
  }
  return gana;
}

function verificarVerticales(){
  let gana = -1;

  for( let j = 0; j < width; j++ ){
    let vic = 0;
    let ply = 0;
    for( let i = 0; i < height; i++ ){
      if( i > 0 )
      {
        if( arreglo[i][j].css("background-color") == arreglo[i-1][j].css("background-color") && arreglo[i][j].css("background-color") != "rgb(128, 128, 128)" )
        {
          vic++;
          arreglo[i][j].css("background-color") == player1Color ? ply = 1: undefined
          arreglo[i][j].css("background-color") == player2Color ? ply = 2: undefined
        }
        else {
          vic = 0;
        }
      }
      if (vic == 3){
        gana = ply;
        break;
        break;
      }
    }
  }
  return gana;
}

function verificarDiagonalesPos(){
  let gana = -1;

  for( let i = 0; i < height; i++){
    for( let j = 0; j < width; j++ ){
      let vic = 0;
      let ply = 0;
      if (arreglo[i][j].css("background-color") != "rgb(128, 128, 128)"){
        let col = arreglo[i][j].css("background-color");
        for( let k = 0; k < 4; k++ ){
          if(i+k < height && j+k < width ){
            if( arreglo[i+k][j+k].css("background-color") == col ){
              vic++;
              arreglo[i+k][j+k].css("background-color") == player1Color ? ply = 1: undefined
              arreglo[i+k][j+k].css("background-color") == player2Color ? ply = 2: undefined
            }
            else {
              vic = 0;
              ply = -1;
            }
          }
          else {
            break;
          }
        }
        if (vic == 4) {
          gana = ply;
          break;
          break;
        }
      }
    }
  }
  return gana;
}

function verificarDiagonalesNeg(){
  let gana = -1;

  for( let i = 0; i < height; i++){
    for( let j = 0; j < width; j++ ){
      let vic = 0;
      let ply = 0;
      if (arreglo[i][j].css("background-color") != "rgb(128, 128, 128)"){
        let col = arreglo[i][j].css("background-color");
        for( let k = 0; k < 4; k++ ){
          if(i+k < height && j-k >= 0 ){
            if( arreglo[i+k][j-k].css("background-color") == col ){
              vic++;
              arreglo[i+k][j-k].css("background-color") == player1Color ? ply = 1: undefined
              arreglo[i+k][j-k].css("background-color") == player2Color ? ply = 2: undefined
            }
            else {
              vic = 0;
              ply = -1;
            }
          }
          else {
            break;
          }
        }
        if (vic == 4) {
          gana = ply;
          break;
          break;
        }
      }
    }
  }
  return gana;
}

// Event Listeners.
for( let i = 0; i < height; i++ ){
  for( let j = 0; j < width; j++ ){
    arreglo[i][j].on("click", function(){
      PresionadaCol( j );
    });
  }
}
