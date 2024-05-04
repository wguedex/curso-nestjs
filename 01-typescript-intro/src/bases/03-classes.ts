// Define una clase llamada 'Vehicle' que representará vehículos en general.
export class Vehicle {
    // Propiedades públicas: accesibles desde fuera de la clase.
    public model: string;
    public brand: string;

    // Propiedades privadas: solo pueden ser accedidas o modificadas dentro de la clase.
    private _type: string;
    private _year?: number;

    /**
     * Constructor de la clase 'Vehicle'.
     * @param model Modelo del vehículo.
     * @param brand Marca del vehículo.
     * @param type Tipo del vehículo (como 'Sedan', 'SUV', 'Eléctrico', etc.).
     * @param year Año del vehículo, es opcional.
     */
    constructor(model: string, brand: string, type: string, year?: number) {
        this.model = model;
        this.brand = brand;
        this._type = type;
        this._year = year;
    }

    // Getter para acceder de forma segura a la propiedad privada '_type'.
    get type(): string {
        return this._type;
    }

    // Getter para acceder de forma segura a la propiedad privada '_year'.
    get year(): number | undefined {
        return this._year;
    }

    // Setter para actualizar el tipo del vehículo de forma controlada.
    set type(newType: string) {
        this._type = newType;
    }

    // Setter para actualizar el año del vehículo de forma controlada.
    set year(newYear: number | undefined) {
        this._year = newYear;
    }

    /**
     * Devuelve una descripción del vehículo.
     * @returns Descripción completa del vehículo.
     */
    get description(): string {
        return `Este es un ${this.brand} ${this.model}, tipo ${this.type}${this.year ? ", año " + this.year : ""}.`;
    }

    /**
     * Comprueba si el vehículo es antiguo.
     * @returns true si el vehículo tiene más de 10 años.
     */
    get isClassic(): boolean {
        if (this.year) {
            const currentYear = new Date().getFullYear();
            return currentYear - this.year > 10;
        }
        return false;
    }
}

// Ejemplo de uso:
const myCar = new Vehicle('Mustang', 'Ford', 'Coupe', 1968);
console.log(myCar.description);  // Usa el getter para obtener la descripción.
myCar.type = 'Convertible';      // Cambia el tipo usando el setter.
console.log("¿Es clásico?:", myCar.isClassic);  // Usa el getter para verificar si es clásico.
console.log(`Tipo actualizado: ${myCar.type}`); // Muestra el tipo actualizado.
