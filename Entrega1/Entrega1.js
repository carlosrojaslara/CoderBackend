class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre =nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }

    getFullName(){
        return `Mi nombre es ${this.name} ${this.apelido}`
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre:nombre, autor: autor})

    }

    getBookNames(){
        const nombres = this.libros.map(libro =>{
            libro.nombre;
        })
        return nombres;
    }

}

let usuario1 = new Usuario ("Carlos", "Rojas", [{autor:"Meryl",nombre:"Frankestein"},{autor: "xxxx" , nombre:"sasdas"}], ["gato","perro","canario"]);
usuario1.addBook("ksjakdjs","asdasdas")

console.log(usuario1);