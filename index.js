import { guardar, obtener, eliminarMarcador,obtenerUno,editarMarcador } from "./firebase.js"
//pagina,url,nombre_corto,creador,diminutivo
let id=''
let editStatud=false

document.getElementById('form').addEventListener('submit',(e) => {
    e.preventDefault()
    const pagina=document.getElementById('pagina').value
    const url=document.getElementById('url').value
    const nombre_corto=document.getElementById('nombre_corto').value
    const creador=document.getElementById('creador').value
    const diminutivo=document.getElementById('diminutivo').value

if(validar()){
    console.log(id,pagina,url,nombre_corto,creador,diminutivo)
    if(!editStatud){
        guardar(pagina,url,nombre_corto,creador,diminutivo)
        limpiar();
    }else{
        editarMarcador(id,{pagina:pagina,url:url,nombre_corto:nombre_corto,creador:creador,diminutivo:diminutivo})
        id=''
        editStatud=false
        limpiar();
        document.getElementById('btn-guardar').classList.remove('btn-warning')
        document.getElementById('btn-guardar').classList.add('btn-primary')
        document.getElementById('btn-guardar').value='Guardar'
    }
} 

})

window.addEventListener('DOMContentLoaded',async () =>{
    console.log('hola')
})


window.addEventListener('DOMContentLoaded',async () =>{
    obtener((querySnapshot) => {
        let tabla=''
        querySnapshot.forEach((doc) => {
            const Marcador = doc.data()
            //console.log(doc.id)
            tabla += `
            <tr>
                <td>${Marcador.pagina}</td>
                <td>${Marcador.url}</td>
                <td>${Marcador.nombre_corto}</td>
                <td>${Marcador.creador}</td>
                <td>${Marcador.diminutivo}</td>
                <td><img src="./img/eraser.png" width="15px" class="eliminar" id="${doc.id}" style="cursor: pointer;"></td>
                <td><img src="./img/lapiz.png" width="15px" class="editar" id="${doc.id}" style="cursor: pointer;"></td>
            </tr>
            `
        });
        document.getElementById('tbody').innerHTML=tabla

        document.querySelectorAll('.eliminar').forEach((botonEliminar) => {
            botonEliminar.addEventListener('click', (e) => {
                //eliminar Marcador
                Swal.fire({
                    title: 'Estás seguro que quieres eliminar?',
                    text: "No podrá recuperar el registro!",
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonColor: '#3085d6',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Eliminar!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        eliminarMarcador(e.target.id)
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Registro eliminado',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                  })
                
            })
        })

        document.querySelectorAll('.editar').forEach((botonEditar) => {
            botonEditar.addEventListener('click', async (e) => {
                //editar Marcador
                
                const documento= await obtenerUno(e.target.id)
                const data=documento.data();

                Swal.fire({
                    title: 'Desea editar el registro?', 
                    showCancelButton: true,
                    confirmButtonText: 'Editar',
                    denyButtonText: `No editar`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        //pagina,url,nombre_corto,creador,diminutivo
                        document.getElementById('pagina').value=data.pagina
                        document.getElementById('url').value=data.url
                        document.getElementById('nombre_corto').value=data.nombre_corto
                        document.getElementById('creador').value=data.creador
                        document.getElementById('diminutivo').value=data.diminutivo
                        document.getElementById('btn-guardar').value='Editar'
                        document.getElementById('btn-guardar').classList.remove('btn-primary')
                        document.getElementById('btn-guardar').classList.add('btn-warning')
                        id=documento.id
                        editStatud=true
                    }else{
                        limpiar();
                        document.getElementById('btn-guardar').classList.remove('btn-warning')
                        document.getElementById('btn-guardar').classList.add('btn-primary')
                        document.getElementById('btn-guardar').value='Guardar'
                    }
                })
            })
        })
    })
})

