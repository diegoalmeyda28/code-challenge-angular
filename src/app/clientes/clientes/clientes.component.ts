import { Component } from '@angular/core';

interface Cliente {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  newCliente: Cliente = { nombre: '', email: '', telefono: '', direccion: '' };
  editIndex: number | null = null;
  searchTerm: string = '';

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  
  constructor() {}
  
  ngOnInit(): void {
    this.loadClientes();
  }
  
  loadClientes() {
    const storedClientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    this.clientes = storedClientes.length ? storedClientes : [];
    this.filtrarClientes();
  }
  
  addCliente() {
    if (this.newCliente.nombre && this.newCliente.email && this.newCliente.telefono && this.newCliente.direccion) {
      if (this.editIndex !== null) {
        this.clientes[this.editIndex] = { ...this.newCliente };
        this.editIndex = null;
      } else {
        this.clientes.push({ ...this.newCliente });
      }
      this.saveClientes();
      this.resetForm();
    }
  }
  
  editCliente(index: number) {
    this.newCliente = { ...this.clientes[index] };
    this.editIndex = index;
  }
  
  deleteCliente(index: number) {
    this.clientes.splice(index, 1);
    this.saveClientes();
  }
  
  searchClientes() {
    this.filtrarClientes();
  }
  
  filtrarClientes() {
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  saveClientes() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    this.filtrarClientes();
  }
  
  resetForm() {
    this.newCliente = { nombre: '', email: '', telefono: '', direccion: '' };
    this.editIndex = null;
  }
  
  // Métodos de paginación
  get paginatedClientes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.clientesFiltrados.slice(start, start + this.itemsPerPage);
  }
  
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.clientesFiltrados.length) {
      this.currentPage++;
    }
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
