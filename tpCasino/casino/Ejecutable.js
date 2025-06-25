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
var dados = new Dados_1.Dados(10000, 500, 2, "Dados", 500);
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
    var apuesta = 0;
    while (seguirJugando) {
        switch (juegoSeleccionado.getNombre()) {
            case "Dados":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                dados.setCreditoActual(jugador1.getSaldo());
                dados.jugar(100);
                jugador1.setSaldo(dados.getCreditoActual() - jugador1.getSaldo());
                break;
            case "Ruleta":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                //se inicio la partida de la ruleta
                ruleta.setCreditoActual(jugador1.getSaldo());
                ruleta.jugar();
                jugador1.setSaldo(ruleta.getCreditoActual() - jugador1.getSaldo());
                break;
            case "Tragamonedas_Joker":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                if (jugador1.getSaldo() === 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.");
                    return;
                }
                joker.printApuestasDisponibles();
                apuesta = joker.elegirApuesta(jugador1.getSaldo());
                joker.imprimirCarretes();
                joker.jugar(apuesta);
                //resultado total de la apuesta realizada, 0 si perdio la apuesta, x > apuesta si la gano
                console.log("Resultado: " + joker.getResultado());
                //se informa el saldo actual del jugador
                console.log("Saldo acual del jugador: " + jugador1.getSaldo());
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
                console.log("Apuesta del jugador: " + apuesta);
                console.log("Saldo acual del casino: " + casino.getSaldo());
                apuesta = 0;
                break;
            case "Tragamonedas_Hot":
                //misma logica que la variante anterior
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                if (jugador1.getSaldo() === 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.");
                    return;
                }
                console.log("Saldo acual del jugador: " + jugador1.getSaldo());
                console.log("Saldo acual del casino: " + casino.getSaldo());
                hot.printApuestasDisponibles();
                apuesta = hot.elegirApuesta(jugador1.getSaldo());
                joker.imprimirCarretes();
                joker.jugar(apuesta);
                //resultado total de la apuesta realizada, 0 si perdio la apuesta, x > apuesta si la gano
                console.log("Resultado: " + hot.getResultado());
                // si el resultado no dio 0 entonces el jugador gano la apuesta y aumento su saldo, y por efecto el casino redució su saldo por el resultado que el jugador obtuvo
                if (hot.getResultado() !== 0) {
                    jugador1.setSaldo(jugador1.getSaldo() + hot.getResultado());
                    casino.setSaldo(casino.getSaldo() - hot.getResultado());
                }
                else {
                    //el jugador pierde la apuesta y disminuye su saldo, mientras que el casino lo aumento
                    jugador1.setSaldo(jugador1.getSaldo() - apuesta);
                    casino.setSaldo(casino.getSaldo() + apuesta);
                }
                //se informa el saldo actual del jugador
                console.log("Apuesta del jugador: " + apuesta);
                console.log("Resultado de la apuesta: " + hot.getResultado());
                console.log("Saldo acual del jugador: " + jugador1.getSaldo());
                console.log("Saldo acual del casino: " + casino.getSaldo());
                break;
        }
        var respuesta = readlineSync.questionInt("¿Desea seguir jugando? (1 para continuar, 0 para salir del juego): ");
        if (respuesta === 0) {
            seguirJugando = false;
            console.log("Gracias por jugar. ¡Vuelva pronto!");
        }
        else if (respuesta !== 1) {
            console.log("Opción no válida. Por favor, elija 1 para continuar jugando o 0 para salir.");
        }
    }
}
