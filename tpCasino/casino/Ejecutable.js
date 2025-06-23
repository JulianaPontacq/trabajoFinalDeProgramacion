"use strict";
exports.__esModule = true;
var readlineSync = require("readline-sync");
var Persona_1 = require("./Persona");
var Casino_1 = require("./Casino");
var HotHot_1 = require("./HotHot");
var JokerJoker_1 = require("./JokerJoker");
var Dados_1 = require("./Dados");
var Ruleta_1 = require("./Ruleta");
var casino = new Casino_1.Casino("codigo de la suerte", 1000000);
var jugador1 = new Persona_1.Persona("Juan", 20000);
var joker = new JokerJoker_1.JokerJoker("Tragamonedas_Joker");
var hot = new HotHot_1.HotHot("Tragamonedas_Hot");
var dados = new Dados_1.Dados(10000, 2, 1, "Dados");
var ruleta = new Ruleta_1.Ruleta(1, 1, 1, 1, "", 1, 1, 1, 1, "Ruleta", 20000, 60000, [], ["rojo"], false, []);
casino.setJuegos(joker);
casino.setJuegos(hot);
casino.setJuegos(dados);
casino.setJuegos(ruleta);
var juego = elegirJuego(casino);
//se inicia el juego elegido por el jugador.
iniciarJuego(casino, juego, jugador1);
function elegirJuego(casino) {
    var juego;
    var juegoSeleccionado;
    console.log("Bienvenidos a " + casino.getNombre() + ".");
    console.log("Juegos disponibles:");
    //se publica una lista enumerada de juegos disponibles para el jugador
    var juegos = casino.getJuegos();
    for (var i = 0; i < juegos.length; i++) {
        console.log((i + 1) + ") " + juegos[i].getNombre());
    }
    while (true) {
        //se elije una opción de la lista y se almacena con -1 para garantizar la relación entre la opción elegida y la posicion del juego como elemento del array en Casino
        juego = readlineSync.question("Elegir un juego (1/2/...): ");
        juegoSeleccionado = parseInt(juego) - 1;
        if (juegoSeleccionado >= 0 && juegoSeleccionado < juegos.length) {
            return juegoSeleccionado;
        }
        else {
            console.log("Opción no válida. Por favor, eliga un número válido.");
        }
    }
}
function iniciarJuego(casino, juegoIndex, jugador1) {
    var juegos = casino.getJuegos();
    var juegoSeleccionado = juegos[juegoIndex];
    var seguirJugando = true;
    while (seguirJugando) {
        switch (juegoSeleccionado.getNombre()) {
            case "Dados":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                //se inicio la partida de los dados
                dados.jugar(100);
                break;
            case "Ruleta":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                //se inicio la partida de la ruleta
                ruleta.jugar();
                break;
            case "Tragamonedas_Joker":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                var apuesta = elegirApuesta(jugador1, joker.getApuestasDisponibles());
                //se verifica si el jugador tiene saldo disponible antes de apostar
                //podria ser un metodo boleano saldoDisponible () de la clase Persona, para modularizar el codigo debido a que todos los juegos requieren realizar esa comprobación
                //if (apuesta > jugador1.getSaldo() && jugador1.getSaldoDisponible () > 0) 
                if (apuesta > jugador1.getSaldo() && jugador1.getSaldo() > 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.");
                    return;
                }
                console.log("Iniciando juego...");
                joker.imprimirCarretes();
                joker.jugar(apuesta);
                //resultado total de la apuesta realizada, 0 si perdio la apuesta, x > apuesta si la gano
                console.log("Resultado: " + joker.getResultado());
                // si el resultado no dio 0 entonces el jugador gano la apuesta y aumento su saldo, y por efecto el casino redució su saldo por el resultado que el jugador obtuvo
                if (joker.getResultado() !== 0) {
                    jugador1.setSaldo(jugador1.getSaldo() + joker.getResultado());
                    casino.setSaldo(casino.getSaldo() - joker.getResultado());
                }
                else {
                    //el jugador pierde la apuesta y disminuye su saldo, mientras que el casino lo aumento
                    jugador1.setSaldo(jugador1.getSaldo() - apuesta);
                    casino.setSaldo(casino.getSaldo() + apuesta);
                }
                //se informa el saldo actual del jugador
                console.log("Saldo acual del jugador: " + jugador1.getSaldo());
                break;
            case "Tragamonedas_Hot":
                //misma logica que la variante anterior
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                apuesta = elegirApuesta(jugador1, hot.getApuestasDisponibles());
                if (apuesta > jugador1.getSaldo() && jugador1.getSaldo() > 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.");
                    return;
                }
                console.log("Iniciando juego HotHot...");
                hot.imprimirCarretes();
                hot.jugar(apuesta);
                console.log("Resultado: " + hot.getResultado());
                if (hot.getResultado() !== 0) {
                    jugador1.setSaldo(jugador1.getSaldo() + hot.getResultado());
                    casino.setSaldo(casino.getSaldo() - hot.getResultado());
                }
                else {
                    jugador1.setSaldo(jugador1.getSaldo() - apuesta);
                    casino.setSaldo(casino.getSaldo() + apuesta);
                }
                console.log("Saldo acual del jugador: " + jugador1.getSaldo());
                break;
        }
        var respuesta = readlineSync.questionInt("¿Desea seguir jugando? (1 para continuar, 0 para salir): ");
        if (respuesta === 0) {
            seguirJugando = false;
            console.log("Gracias por jugar. ¡Vuelva pronto!");
        }
        else if (respuesta !== 1) {
            console.log("Opción no válida. Por favor, elija 1 para continuar o 0 para salir.");
        }
    }
}
function elegirApuesta(jugador, apuestasDisponibles) {
    var apuestaTotal = 0;
    var apuestasString = '';
    //se publican las apuestas disponibles de cada juego almacenadas en un array
    for (var i = 0; i < apuestasDisponibles.length; i++) {
        apuestasString += apuestasDisponibles[i];
        if (i < apuestasDisponibles.length - 1) {
            apuestasString += ' | ';
        }
    }
    console.log("Apuestas disponibles: " + apuestasString);
    while (true) {
        //se elije un elemento del array de apuestas (el valor de uno de los elementos del array)
        var eleccion = readlineSync.questionInt("Eliga su apuesta: ");
        if (apuestasDisponibles.indexOf(eleccion) === -1) {
            //es invalida porque el numero ingresado no existe en el array de apuestas disponibles del juego seleccionado.
            console.log("Opción no válida. Elija una apuesta disponible.");
        }
        else {
            //+= para seguir eligiendo apuestas disponibles y formar una apuesta mayor, si el jugador elige 2 fichas de 40 entonces la apuesta es de 80.
            apuestaTotal += eleccion;
            console.log("Ha apostado " + eleccion + " monedas.");
            console.log("Apuesta total acumulada: " + apuestaTotal + " monedas.");
            if (apuestaTotal > jugador.getSaldo()) {
                //si el jugador no tiene suficiente saldo entonces no puede aumentar la apuesta
                console.log("No tiene suficiente saldo para esta apuesta acumulada.");
                return apuestaTotal;
            }
            var continuarApostando = readlineSync.questionInt("¿Desea seguir apostando? (1 para continuar, 0 para salir): ");
            if (continuarApostando === 0) {
                console.log("Ha decidido no seguir apostando. La apuesta total es de " + apuestaTotal + " monedas.");
                return apuestaTotal;
            }
            else if (continuarApostando !== 1) {
                console.log("Opción no válida. Por favor, elija 1 para continuar o 0 para salir.");
            }
        }
    }
}
