import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ClientesModule } from './clientes/clientes.module';

import { FormsModule } from '@angular/forms';
import { HeaderModule } from './header/header.module';
import { ProductsComponent } from './products/products/products.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    
    FormsModule,

    ProductsModule,
    LoginModule,
    ClientesModule,
    PedidosModule,
    HeaderModule,
    
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
