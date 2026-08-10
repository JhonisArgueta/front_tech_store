import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'',
        loadComponent:()=>import("./home/home").then(m=>m.Home)
    },

     
    {
        path:"nosotros",
        loadComponent:()=> import("./nosotros/nosotros").then(m=>m.Nosotros),
    },
    

    {
        path:"auth",
        loadComponent:()=> import("./auth-component/auth-component").then(m=>m.AuthComponent)
    }, 

    {
        path:"welcome",
        loadComponent:()=> import("./welcome/welcome").then(m=>m.Welcome)
    }
];
