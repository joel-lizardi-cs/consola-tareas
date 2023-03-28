const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach( (tarea, index) => {

            const idx = `${index + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);

        });

    }

    listarPendientesCompletadas(completadas = true) {

        console.log();
        this.listadoArr.forEach( (tarea, index) => {

            let contador = 0;
            const idx = `${index + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;

            if(completadas) {
                if(completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                if(!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').red} ${desc} :: ${estado}`);
                }
            }

        });

    }

    borrarTarea(id = '') {
        
        if(this._listado[id]) {
            delete this._listado[id];
        }

    }

    toggleCompletadas( ids = []) {
        
        ids.forEach(id => {

            const tarea = this._listado[id];

            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }

}

module.exports = Tareas;