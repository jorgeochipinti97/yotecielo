export const capitalizarPrimeraLetraPalabras = (frase: string | any) => {
    if (typeof frase != 'string') {
        throw TypeError('El argumento debe ser una cadena de caracteres.');
    }

    return frase.replace(/\w\S*/g, (palabra) => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
}

export const capitalizarPrimeraLetraSolamente = (frase: string | any) => {
    if (typeof frase != 'string') {
        throw TypeError('El argumento debe ser una cadena de caracteres.');
    }

    return frase.charAt(0).toUpperCase() + frase.slice(1).toLowerCase();

}

