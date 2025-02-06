import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PedidosComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PedidosModule { }
