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
exports.JokerJoker = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var JokerJoker = /** @class */ (function (_super) {
    __extends(JokerJoker, _super);
    function JokerJoker(nombre) {
        var _this = _super.call(this, nombre) || this;
        _this.setCargarCarretes();
        return _this;
    }
    JokerJoker.prototype.getSimboloEspecial = function () {
        return JokerJoker.simboloEspecialWild;
    };
    JokerJoker.prototype.getListaDePagos = function () {
        return JokerJoker.listaDePagos;
    };
    JokerJoker.prototype.getApuestasDisponibles = function () {
        return JokerJoker.apuestasDisponibles;
    };
    JokerJoker.prototype.getCombinacionesGanadoras = function () {
        return JokerJoker.combinacionesGanadoras;
    };
    JokerJoker.prototype.getNombre = function () {
        return _super.prototype.getNombre.call(this);
    };
    JokerJoker.prototype.setNombre = function (nombre) {
        return _super.prototype.setNombre.call(this, nombre);
    };
    JokerJoker.prototype.getResultado = function () {
        return _super.prototype.getResultado.call(this);
    };
    JokerJoker.prototype.setResultado = function (resultado) {
        _super.prototype.setResultado.call(this, resultado);
    };
    JokerJoker.prototype.getCarretes = function () {
        return this.carretes;
    };
    //se cargan los carretes aleatoriamente tomando las claves del objeto listaDePagos como un arreglo con los nombres de todos los simbolos disponibles
    JokerJoker.prototype.setCargarCarretes = function () {
        var filas = 3;
        var columnas = 5;
        var simbolos = Object.keys(JokerJoker.listaDePagos);
        this.carretes = [];
        for (var i = 0; i < filas; i++) {
            this.carretes[i] = [];
            for (var j = 0; j < columnas; j++) {
                var indiceAleatorio = Math.floor(Math.random() * simbolos.length);
                this.carretes[i][j] = simbolos[indiceAleatorio];
            }
        }
    };
    JokerJoker.prototype.jugar = function (apuesta) {
        this.setCargarCarretes();
        //si el metodo calcular ganancia retorno 0 entonces no se multiplica por la apuesta
        var ganancia = this.calcularGanancia() * apuesta > 0 ? this.calcularGanancia() * apuesta : 0;
        this.setResultado(ganancia);
    };
    JokerJoker.prototype.calcularGanancia = function () {
        //se buscan combinaciónes ganadoras y se almacenan sus ganancias correspondientes
        var ganancia = this.lecturaVertical();
        ganancia += this.lecturaHorizontal();
        ganancia += this.lecturaDiagonal();
        return ganancia;
    };
    JokerJoker.prototype.lecturaVertical = function () {
        var contador = 1;
        for (var fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === this.carretes[0][0] || this.carretes[fila][0] === JokerJoker.simboloEspecialWild)
                contador++;
        if (contador === 3)
            if (JokerJoker.combinacionesGanadoras[contador] &&
                JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
                return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];
        return 0;
    };
    JokerJoker.prototype.lecturaHorizontal = function () {
        var contador = 1;
        for (var columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === this.carretes[0][0] || this.carretes[0][columna] === JokerJoker.simboloEspecialWild)
                contador++;
        if ((contador === 5 || contador === 4 || contador === 3) &&
            JokerJoker.combinacionesGanadoras[contador] &&
            JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];
        return 0;
    };
    JokerJoker.prototype.lecturaDiagonal = function () {
        var contador = 1;
        var fila = 1;
        var columna = 1;
        while (fila < this.carretes.length) {
            if (this.carretes[fila][columna] === this.carretes[0][0] || this.carretes[fila][columna] === JokerJoker.simboloEspecialWild)
                contador++;
            fila++;
            columna++;
        }
        if (contador === 3 &&
            JokerJoker.combinacionesGanadoras[contador] &&
            JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];
        return 0;
    };
    JokerJoker.prototype.imprimirCarretes = function () {
        console.log("\nCarretes de " + this.getNombre() + ":\n");
        for (var fila = 0; fila < this.carretes.length; fila++) {
            var filaStr = "";
            for (var col = 0; col < this.carretes[fila].length; col++) {
                filaStr += this.carretes[fila][col] + " | ";
            }
            console.log(filaStr);
        }
    };
    JokerJoker.simboloEspecialWild = "wild";
    // Se crea un objeto estatico que asocia un número (3, 4 o 5) con un arreglo de símbolos ganadores (strings).
    JokerJoker.combinacionesGanadoras = {
        5: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        4: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        3: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"]
    };
    // Se crea un objeto estatico donde cada clave es el nombre de un símbolo y su valor es un arreglo de pagos correspondientes a las apuestas ganadoras.
    // Cada arreglo representa los pagos por 3, 4 o 5 símbolos iguales (en ese orden).
    JokerJoker.listaDePagos = {
        "diamante": [20, 5, 1], "siete": [10, 3, 0.6],
        "bar": [8, 2, 0.3], "estrella": [5, 1.5, 0.2],
        "campana": [5, 1.5, 0.2], "sandia": [0.8, 0.3, 0.075],
        "uvas": [0.8, 0.3, 0.075], "mango": [0.8, 0.3, 0.075],
        "durazno": [0.5, 0.2, 0.05], "limon": [0.5, 0.2, 0.05],
        "cereza": [0.5, 0.2, 0.05], "wild": [0, 0, 0]
    };
    JokerJoker.apuestasDisponibles = [
        10, 20, 30, 40, 50, 60, 70, 80, 90,
        100, 120, 140, 160, 180,
        200, 250, 300, 350, 400, 450,
        500, 600, 700, 800, 900,
        1000, 1200, 1400, 1600, 1800,
        2000
    ];
    return JokerJoker;
}(Tragamonedas_1.Tragamonedas));
exports.JokerJoker = JokerJoker;
