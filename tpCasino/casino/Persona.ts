export class Persona {
    private nombreJugador: string;
    private saldo: number;

    constructor(nombreJugador: string, saldo: number) {
        this.nombreJugador = nombreJugador;
        this.saldo = saldo;
    }

    public getNombreJugador(): string {
        return this.nombreJugador;
    }

    public setNombreJugador(nombre: string): void {
        this.nombreJugador = nombre;
    }

    public getSaldo(): number {
        return this.saldo;
    }

    public setSaldo(saldo: number): void {
        //+= para acumular el saldo cargado o ganado, si es numero negativo entonces se le resta la perdida de la apuesta al saldo actual
        this.saldo += saldo;
    }
}
