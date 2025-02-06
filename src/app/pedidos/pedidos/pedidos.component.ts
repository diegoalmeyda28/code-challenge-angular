import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

interface Pedido {
  cliente: string;
  productos: string;
  cantidad: number;
  total: number;
  fecha: string;
}


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PedidosComponent implements OnInit{

  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  clientes: string[] = ['Cliente 1', 'Cliente 2', 'Cliente 3']; // Puedes obtener esto de LocalStorage o API
  newPedido: Pedido = { cliente: '', productos: '', cantidad: 1, total: 0, fecha: new Date().toISOString().split('T')[0] };
  editIndex: number | null = null;
  filtroCliente: string = '';
  ordenarAscendente: boolean = true;

   currentPage: number = 1;
   itemsPerPage: number = 5;
 
   constructor() {}
 
   ngOnInit(): void {
     this.loadPedidos();
   }
 
   loadPedidos() {
     const storedPedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
     this.pedidos = storedPedidos.length ? storedPedidos : [];
     this.filtrarPedidos();
   }
 
   addPedido() {
     if (this.newPedido.cliente && this.newPedido.productos && this.newPedido.cantidad > 0 && this.newPedido.total > 0) {
       if (this.editIndex !== null) {
         this.pedidos[this.editIndex] = { ...this.newPedido };
         this.editIndex = null;
       } else {
         this.pedidos.push({ ...this.newPedido });
       }
       this.savePedidos();
       this.resetForm();
     }
   }
 
   editPedido(index: number) {
     this.newPedido = { ...this.pedidos[index] };
     this.editIndex = index;
   }
 
   deletePedido(index: number) {
     this.pedidos.splice(index, 1);
     this.savePedidos();
   }
 
   filtrarPedidos() {
     this.pedidosFiltrados = this.pedidos.filter(pedido =>
       this.filtroCliente ? pedido.cliente.toLowerCase().includes(this.filtroCliente.toLowerCase()) : true
     );
   }
 
   ordenarPorFecha() {
     this.pedidosFiltrados.sort((a, b) =>
       this.ordenarAscendente ? a.fecha.localeCompare(b.fecha) : b.fecha.localeCompare(a.fecha)
     );
     this.ordenarAscendente = !this.ordenarAscendente;
   }
 
   savePedidos() {
     localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
     this.filtrarPedidos();
   }
 
   resetForm() {
     this.newPedido = { cliente: '', productos: '', cantidad: 1, total: 0, fecha: new Date().toISOString().split('T')[0] };
     this.editIndex = null;
   }
 
   get paginatedPedidos() {
     const start = (this.currentPage - 1) * this.itemsPerPage;
     return this.pedidosFiltrados.slice(start, start + this.itemsPerPage);
   }
 
   nextPage() {
     if (this.currentPage * this.itemsPerPage < this.pedidosFiltrados.length) {
       this.currentPage++;
     }
   }
 
   prevPage() {
     if (this.currentPage > 1) {
       this.currentPage--;
     }
   }
   
}
