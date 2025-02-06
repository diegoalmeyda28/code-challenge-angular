import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClientesComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ClientesModule { }
