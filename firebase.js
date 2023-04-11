 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 import {addDoc,collection,getFirestore,onSnapshot,deleteDoc,doc,getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
 // Your web app's Firebase configuration

 const firebaseConfig = {
  apiKey: "AIzaSyBvE3nZgzpTqazNjP7-0ncnpMgkkOjpJ6o",
  authDomain: "certamen1-1a6e3.firebaseapp.com",
  projectId: "certamen1-1a6e3",
  storageBucket: "certamen1-1a6e3.appspot.com",
  messagingSenderId: "470784155313",
  appId: "1:470784155313:web:d1ee02b8874d3d54ac0c90"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 //funcion que retorna la base de datos
 const db=getFirestore()

 export const guardar=(pagina,url,nombre_corto,creador,diminutivo)=>{
    addDoc(collection(db,'marcadores'),{pagina,url,nombre_corto,creador,diminutivo})
 }

 export const obtener = (retorno) => {
   onSnapshot(collection(db,'marcadores'),retorno)
 }

 export const eliminarMarcador = (id) => {
  //deleDoc es una funcion que recibe un documento y lo elimina
  //doc es una funcion que recibe una base de datos, una coleccion y un id y retorna un documento y luego lo elimina
    deleteDoc(doc(db,'marcadores',id))
 }

 //esta es una funcion que recibe un id y retorna un documento de la base de datos
 export const obtenerUno=(id)=>getDoc(doc(db,'marcadores',id))

 //esta es una funcion que recibe un id y un objeto con los datos a editar
 export const editarMarcador =(id,datos)=>{
    updateDoc(doc(db,'marcadores',id),datos)
 }