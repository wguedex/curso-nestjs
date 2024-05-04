

export const name: string = "Wilmer";
export const age: number = 20;
export const isValid: boolean = true;
export const templateString: string = `
Esto es un string 
multilinea que puede 
tener comillas dobles " y 
simples ' inyectar valores ${ name }
expresiones ${1 + 1}
números ${ age }
booleanos: ${ isValid }`;


console.log(name);

console.log(templateString);

