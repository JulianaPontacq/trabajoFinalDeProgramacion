"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Dados = void 0;
var Juego_1 = require("./Juego"); //importo la clase base juego.
var Dados = /** @class */ (function (_super) {
    __extends(Dados, _super);
    function Dados(pApuesta, pCreditoInicial, pCantidadDados, pNombreDeJuego) {
        var _this = _super.call(this, pNombreDeJuego) // se llama al constructor de la clase base juego con los parametros heredados.
         || this;
        _this.cantidadDados = pCantidadDados = 2, //inicializo la cantidad de dados en 2 por defecto.
            _this.creditoInicial = Math.floor(pCreditoInicial); // redondeo el credito inicial para adegurar que el numero sea entero.
        //this.nombreDeJuego = "Juego de Dados"; //asigno un nombre fijo al juego.
        _this.apuesta = pApuesta;
        return _this;
    }
    //metodo get y set de cantidad de dados.
    Dados.prototype.setCantidadDados = function (pCantidadDados) {
        this.cantidadDados = pCantidadDados;
    };
    Dados.prototype.getCantidadDados = function () {
        return this.cantidadDados;
    };
    Dados.prototype.calcularGanancia = function () {
        return 1; //retorna un numero fijo como ganancia.
    };
    ;
    //--------------------------------------------------------------------------------
    Dados.prototype.jugar = function (pApuesta) {
        console.log("Juego creado con cr\u00E9dito inicial: ".concat(this.getCreditoActual()));
        pApuesta = Math.floor(pApuesta); // Aseguramos que siempre sea entero
        console.log("Apuesta inicial: ".concat(pApuesta));
        if (pApuesta > this.getCreditoActual() || this.getCreditoActual() <= 0) { //si apuesto más que mi credito no tengo suficiente saldo para jugar
            console.log("No tienes suficiente crédito para apostar.");
            return;
        }
        this.setCreditoActual(this.getCreditoActual() - pApuesta); //restamos la apuesta al credito actual.
        console.log("Cr\u00E9dito despu\u00E9s de apostar: ".concat(_super.prototype.getCreditoActual.call(this)));
        var resultados = []; //creo un arreglo para almacenar los resultados de los dados.
        var suma = 0; // inicializo la suma de los valores de los dados en cero.
        for (var i = 0; i < this.getCantidadDados(); i++) {
            var dado = Math.floor(Math.random() * 6) + 1;
            resultados.push(dado);
            suma += dado;
        }
        console.log("Resultados de los dados: ".concat(resultados, " (Suma: ").concat(suma, ")"));
        if (suma === 7) {
            console.log("¡Sacaste 7! Ganaste el doble de tu apuesta.");
            this.setCreditoActual(this.getCreditoActual() + Math.floor(pApuesta * 2));
        }
        else if (suma === 11) {
            console.log("¡Sacaste 11! Ganaste el triple de tu apuesta.");
            this.setCreditoActual(this.getCreditoActual() + Math.floor(pApuesta * 3));
        }
        else if (suma === 2) {
            console.log("¡Sacaste 2! Ganaste cinco veces tu apuesta.");
            this.setCreditoActual(this.getCreditoActual() + Math.floor(pApuesta * 5));
        }
        else if ([3, 4, 5, 6, 8, 9, 10, 12].indexOf(suma) !== -1) {
            console.log("Sacaste ".concat(suma, ". Perdiste toda tu apuesta."));
        }
        console.log("Cr\u00E9dito final despu\u00E9s de la partida: ".concat(_super.prototype.getCreditoActual.call(this)));
    };
    return Dados;
}(Juego_1.Juego));
exports.Dados = Dados;
//const juegoDeDados = new Dados(10000, 2, 1, "h", 20000); //hay que inicializar los parametros desde el inicio. ??
//juegoDeDados.jugar(1000); //lo que quiero que sea la apuesta
