import { CalculadorDeGanancia } from './CalculadorDeGanancia';
import { Tragamonedas } from './Tragamonedas';

export class JokerJoker extends Tragamonedas implements CalculadorDeGanancia {
    private static readonly simboloEspecialWild = "wild";
    // Se crea un objeto estatico que asocia un número (3, 4 o 5) con un arreglo de símbolos ganadores (strings).
    private static readonly combinacionesGanadoras: { [key: number]: string[] } = {
        5: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        4: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        3: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"]
    };

    // Se crea un objeto estatico donde cada clave es el nombre de un símbolo y su valor es un arreglo de pagos correspondientes a las apuestas ganadoras.
    // Cada arreglo representa los pagos por 3, 4 o 5 símbolos iguales (en ese orden).
    private static readonly listaDePagos: { [key: string]: number[] } = {
        "diamante": [20, 5, 1], "siete": [10, 3, 0.6],
        "bar": [8, 2, 0.3], "estrella": [5, 1.5, 0.2],
        "campana": [5, 1.5, 0.2], "sandia": [0.8, 0.3, 0.075],
        "uvas": [0.8, 0.3, 0.075], "mango": [0.8, 0.3, 0.075],
        "durazno": [0.5, 0.2, 0.05], "limon": [0.5, 0.2, 0.05],
        "cereza": [0.5, 0.2, 0.05], "wild": [0, 0, 0]
    };

    private static readonly apuestasDisponibles: number[] = [
        10, 20, 30, 40, 50, 60, 70, 80, 90,
        100, 120, 140, 160, 180,
        200, 250, 300, 350, 400, 450,
        500, 600, 700, 800, 900,
        1000, 1200, 1400, 1600, 1800,
        2000
    ];

    private carretes: string[][];

    public constructor(nombre: string) {
        super(nombre);
        this.setCargarCarretes();
    }

    public getSimboloEspecial(): string {
        return JokerJoker.simboloEspecialWild;
    }

    public getListaDePagos(): { [key: string]: number[] } {
        return JokerJoker.listaDePagos;
    }

    public getApuestasDisponibles(): number[] {
        return JokerJoker.apuestasDisponibles;
    }

    public getCombinacionesGanadoras(): { [key: number]: string[] } {
        return JokerJoker.combinacionesGanadoras;
    }

    public getNombre(): string {
        return super.getNombre();
    }

    public setNombre(nombre: string): void {
        return super.setNombre(nombre);
    }

    public getResultado(): number {
        return super.getResultado();
    }

    public setResultado(resultado: number): void {
        super.setResultado(resultado);
    }

    public getCarretes(): string[][] {
        return this.carretes;
    }

    //se cargan los carretes aleatoriamente tomando las claves del objeto listaDePagos como un arreglo con los nombres de todos los simbolos disponibles
    public setCargarCarretes(): void {
        const filas = 3;
        const columnas = 5;
        const simbolos = Object.keys(JokerJoker.listaDePagos);
        this.carretes = [];

        for (let i = 0; i < filas; i++) {
            this.carretes[i] = [];
            for (let j = 0; j < columnas; j++) {
                const indiceAleatorio = Math.floor(Math.random() * simbolos.length);
                this.carretes[i][j] = simbolos[indiceAleatorio];
            }
        }
    }

    public jugar (apuesta: number): void {
        this.setCargarCarretes();
        //si el metodo calcular ganancia retorno 0 entonces no se multiplica por la apuesta
        let ganancia = this.calcularGanancia() * apuesta > 0 ? this.calcularGanancia() * apuesta : 0;
        this.setResultado(ganancia);
    }

    public calcularGanancia(): number {
        //se buscan combinaciónes ganadoras y se almacenan sus ganancias correspondientes
        let ganancia = this.lecturaVertical();
        ganancia += this.lecturaHorizontal();
        ganancia += this.lecturaDiagonal();
        return ganancia;
    }

    public lecturaVertical(): number {
        let contador = 1;

        for (let fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === this.carretes[0][0] || this.carretes[fila][0] === JokerJoker.simboloEspecialWild)
                contador++;

        if (contador === 3)
            if (JokerJoker.combinacionesGanadoras[contador] &&
                JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
                return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];

        return 0;
    }

    public lecturaHorizontal(): number {
        let contador = 1;

        for (let columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === this.carretes[0][0] || this.carretes[0][columna] === JokerJoker.simboloEspecialWild)
                contador++;

        if ((contador === 5 || contador === 4 || contador === 3) &&
            JokerJoker.combinacionesGanadoras[contador] &&
            JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];

        return 0;
    }

    public lecturaDiagonal(): number {
        let contador = 1;
        let fila = 1;
        let columna = 1;

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
    }
    
    public imprimirCarretes(): void {
        console.log("\nCarretes de " + this.getNombre() + ":\n");
        for (let fila = 0; fila < this.carretes.length; fila++) {
            let filaStr = "";
            for (let col = 0; col < this.carretes[fila].length; col++) {
                filaStr += this.carretes[fila][col] + " | ";
            }
            console.log(filaStr);
        }
    }
}