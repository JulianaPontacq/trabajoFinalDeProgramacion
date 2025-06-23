import { Juego } from "./Juego"; //importo la clase base juego.
import { CalculadorDeGanancia } from "./CalculadorDeGanancia";//importo la interfaz CalculadorDeGanancia.

export class Dados extends Juego implements CalculadorDeGanancia {
    private cantidadDados: number; //atributo privado que almacena la cantidad de dados en el juego.
    private creditoInicial: number;
    private apuesta: number

    constructor (pApuesta:number,pCreditoInicial: number, pCantidadDados: number, pNombreDeJuego:string) { //se heredan tres parametros.
        super(pNombreDeJuego, pCreditoInicial) // se llama al constructor de la clase base juego con los parametros heredados.
        this.cantidadDados = pCantidadDados= 2, //inicializo la cantidad de dados en 2 por defecto.
        this.creditoInicial = Math.floor(pCreditoInicial); // redondeo el credito inicial para adegurar que el numero sea entero.
        //this.nombreDeJuego = "Juego de Dados"; //asigno un nombre fijo al juego.
        this.apuesta=pApuesta
    }

    //metodo get y set de cantidad de dados.
    setCantidadDados (pCantidadDados:number){
        this.cantidadDados= pCantidadDados;
    }

    getCantidadDados(){
        return this.cantidadDados
    }

    calcularGanancia(): number { // implementacion de la interface CalculadorDeGanancia.
        return 1; //retorna un numero fijo como ganancia.
    };

    //--------------------------------------------------------------------------------
    jugar (pApuesta:number): void { //metodo que ejecuta una ronda del juego de dados.
        console.log(`Juego creado con crédito inicial: ${this.getCreditoActual ()}`); 
        pApuesta = Math.floor(pApuesta); // Aseguramos que siempre sea entero
        console.log(`Apuesta inicial: ${pApuesta}`);

        if (pApuesta > this.getCreditoActual () || this.getCreditoActual () <= 0) { //si apuesto más que mi credito no tengo suficiente saldo para jugar
            console.log("No tienes suficiente crédito para apostar.");
            return;
        }
        this.setCreditoActual (this.getCreditoActual() - pApuesta); //restamos la apuesta al credito actual.
        console.log(`Crédito después de apostar: ${super.getCreditoActual()}`);

        let resultados: number[] = []; //creo un arreglo para almacenar los resultados de los dados.
        let suma = 0; // inicializo la suma de los valores de los dados en cero.

        for (let i = 0; i < this.getCantidadDados(); i++) {
            const dado = Math.floor(Math.random() * 6) + 1;
            resultados.push(dado);
            suma += dado;
        }
        console.log(`Resultados de los dados: ${resultados} (Suma: ${suma})`);

        if (suma === 7) {
            console.log("¡Sacaste 7! Ganaste el doble de tu apuesta.");
            this.setCreditoActual (this.getCreditoActual()+ Math.floor(pApuesta * 2));
        } else if (suma === 11) {
            console.log("¡Sacaste 11! Ganaste el triple de tu apuesta.");
            this.setCreditoActual (this.getCreditoActual() +Math.floor(pApuesta * 3));
        } else if (suma === 2) {
            console.log("¡Sacaste 2! Ganaste cinco veces tu apuesta.");
            this.setCreditoActual (this.getCreditoActual() + Math.floor(pApuesta * 5));
        } else if ([3, 4, 5, 6, 8, 9, 10, 12].indexOf(suma) !== -1) {
            console.log(`Sacaste ${suma}. Perdiste toda tu apuesta.`);
        }

        console.log(`Crédito final después de la partida: ${super.getCreditoActual()}`);
    }
}

//const juegoDeDados = new Dados(10000, 2, 1, "h", 20000); //hay que inicializar los parametros desde el inicio. ??
//juegoDeDados.jugar(1000); //lo que quiero que sea la apuesta
