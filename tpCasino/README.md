# trabajoFinalDeProgramacion

// archivo: escribirTxt.ts
import * as fs from 'fs';

// Escribir en el archivo (sobrescribe si existe)
fs.writeFileSync('archivo.txt', 'Hola mundo desde TypeScript!');

// Añadir contenido al archivo (sin borrar lo anterior)
fs.appendFileSync('archivo.txt', '\nLínea adicional');
