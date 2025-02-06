import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

    // Obtener el router para redirigir
    const router = inject(Router);
  
    // Verificar si el usuario está autenticado (se ha guardado en LocalStorage)
    const user = localStorage.getItem('user');
    
    // Si el usuario no está autenticado, redirigir al login
    if (!user) {
      router.navigate(['/login']);
      return false;  // Impide que el usuario acceda a la ruta
    }

  return true;
};
