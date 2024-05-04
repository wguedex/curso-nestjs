// Define un arreglo de objetos que representan carros. Inicialmente contiene un solo carro.
export const car = [{
    model: 'Model S',   // Modelo del carro.
    brand: 'Tesla',     // Marca del carro.
    type: 'Electric'    // Tipo de carro, en este caso, eléctrico.
}]

// Agrega un nuevo objeto carro al arreglo 'car' y luego imprime la nueva longitud del arreglo.
console.log(car.push({
    model: 'A4',        // Modelo del carro a agregar.
    brand: 'Audi',      // Marca del carro a agregar.
    type: 'Sedan'       // Tipo del carro a agregar.
}));

// Define una interfaz TypeScript para estandarizar la estructura de los objetos vehículo.
interface Vehicle {
    model: string;      // Modelo del vehículo.
    brand: string;      // Marca del vehículo.
    type: string;       // Tipo de vehículo.
    year?: number;      // Año del vehículo, es una propiedad opcional.
}

// Crea un objeto que sigue la interfaz 'Vehicle', representando un Tesla Model 3.
const tesla: Vehicle = {
    model: 'Model 3',   // Modelo del vehículo.
    brand: 'Tesla',     // Marca del vehículo.
    type: 'Electric',   // Tipo de vehículo, eléctrico.
    year: 2020          // Año del vehículo.
};

// Crea otro objeto que sigue la interfaz 'Vehicle', representando un Audi Q5.
const audi: Vehicle = {
    model: 'Q5',        // Modelo del vehículo.
    brand: 'Audi',      // Marca del vehículo.
    type: 'SUV'         // Tipo de vehículo, SUV.
};

// Agrega el objeto 'tesla' al arreglo 'car' y luego imprime la nueva longitud del arreglo.
console.log(car.push(tesla));

// Agrega el objeto 'audi' al arreglo 'car' y luego imprime la nueva longitud del arreglo.
console.log(car.push(audi));
