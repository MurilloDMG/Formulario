//Variables
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail')
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//Variables para campo
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnReset = document.querySelector('#resetBtn');


eventListeners();

function eventListeners() {
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Enviar email
    formulario.addEventListener('submit',enviarEmail)

    //Reinicia el formulario
    btnReset.addEventListener('click',resetearFormulario);

}

//Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//Validar el formulario
function validarFormulario(e) {

    if (e.target.value.length > 0) {
        //Elimina los errores 
         const error = document.querySelector('p.error');
         if (error) {
            error.remove();  
          }

        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    } else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')

        mostrarError('Todos los campo son Obligatorios');

    }

    if(e.target.type === 'email'){
        
        if(re.test(e.target.value) ){
         //Elimina los errores 
         const error = document.querySelector('p.error');
         if (error) {
           error.remove();  
         }
         
        
         e.target.classList.remove('border', 'border-red-500')
         e.target.classList.add('border', 'border-green-500')

        }else{
            e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')

        mostrarError('Email no valido');
        }


    }

    if(re.test(email.value) && asunto.value !== '' && mensaje.value!==''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }


}

//Envia el Email
function enviarEmail(e){
e.preventDefault();
 //Mostrar el spinner
 const spinner = document.querySelector('#spinner');
 spinner.style.display = ' flex';

 // Despues de tres segundos ocultar el mensaje

        setTimeout(() => {
            spinner.style.display = 'none';
            //Mensaje que se envio correctamente
            const parrafo = document.createElement('p');
            parrafo.textContent = 'Los datos se enviaron correctamente';
            parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase')
            formulario.insertBefore(parrafo, spinner);
                
            setTimeout(() => {
                parrafo.remove();
                resetearFormulario();
            }, 3000);

        }, 3000);
}

//funcion que resete el formulario
function resetearFormulario(){
  
    formulario.reset();
    
    iniciarApp();
}