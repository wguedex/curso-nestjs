

// Define una clase llamada 'Vehicle' que representará vehículos en general.
export class Vehicle {
    
    // Propiedades de la clase.
    model: string;
    brand: string;
    type: string;
    year?: number;

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
        this.type = type;
        this.year = year;
        console.log(this.describe());
    }

    /**
     * Devuelve una descripción del vehículo.
     * @returns Descripción completa del vehículo.
     */
    describe(): string {
        return `Este es un ${this.brand} ${this.model}, tipo ${this.type}${this.year ? ", año " + this.year : ""}.`;
    }

    /**
     * Actualiza el año del vehículo.
     * @param newYear Nuevo año del modelo.
     */
    updateYear(newYear: number): void {
        this.year = newYear;
    }

    /**
     * Comprueba si el vehículo es antiguo.
     * @returns true si el vehículo tiene más de 10 años.
     */
    isClassic(): boolean {
        if (this.year) {
            const currentYear = new Date().getFullYear();
            return currentYear - this.year > 10;
        }
        return false;
    }

    /**
     * Imprime detalles del vehículo en la consola.
     */
    printDetails(): void {
        console.log(this.describe());
    }
}

// Ejemplo de uso:
const myCar = new Vehicle('Mustang', 'Ford', 'Coupe', 1968);
console.log(myCar.describe());  // Muestra la descripción del vehículo.
myCar.updateYear(1969);         // Actualiza el año del vehículo.
myCar.printDetails();           // Imprime los detalles del vehículo.
console.log("¿Es clásico?:", myCar.isClassic());  // Verifica si es un vehículo clásico.
