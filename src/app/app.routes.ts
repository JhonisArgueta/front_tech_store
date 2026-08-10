import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'',
        loadComponent:()=>import("./home/home").then(m=>m.Home)
    },

    {
        path:'contador',
        loadComponent:()=> import("./contador/contador").then(m=>m.Contador)

    }, 
    {
        path:"nosotros",
        loadComponent:()=> import("./nosotros/nosotros").then(m=>m.Nosotros),
    },
    {
        path:"productos",
        loadComponent:()=> import("./productos/productos").then(m=>m.Productos)
    }, 

    {
        path:"auth",
        loadComponent:()=> import("./auth-component/auth-component").then(m=>m.AuthComponent)
    }
];
