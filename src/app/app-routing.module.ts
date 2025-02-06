import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { ProductsComponent } from './products/products/products.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { PedidosComponent } from './pedidos/pedidos/pedidos.component';
import { authGuard } from './auth.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductsComponent, canActivate: [authGuard] }, 
  { path: 'clientes', component: ClientesComponent, canActivate: [authGuard] },    
  { path: 'pedidos', component: PedidosComponent, canActivate: [authGuard] },    
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule) } ,


  // { path: 'login', component: LoginComponent },
  // { path: 'productos', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canActivate: [authGuard] },
  // { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule), canActivate: [authGuard] },
  // { path: 'pedidos', loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule), canActivate: [authGuard] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
