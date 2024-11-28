import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionPlanService } from '../../../core/services/subscription-plans.service';
import { SubscriptionPlan } from '../../../shared/models/subscription-plans';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-create-subscription-plan',
  templateUrl: './create-subscription-plans.component.html',
  styleUrls: ['./create-subscription-plans.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class CreateSubscriptionPlanComponent implements OnInit {
  createPlanForm: FormGroup;
  userId: number | null = null;  // Para almacenar el id del usuario

  constructor(
    private fb: FormBuilder,
    private subscriptionPlanService: SubscriptionPlanService,
    private router: Router,
    private storageService: StorageService  // Inyectamos StorageService para obtener los datos del usuario
  ) {
    this.createPlanForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration_days: ['', [Validators.required]],
      level: ['', [Validators.required]],
      creator: [1]    });
  }

  ngOnInit(): void {
    this.loadUserId();  // Cargar el id del usuario cuando se inicialice el componente
  }

  loadUserId(): void {
    const authData = this.storageService.getAuthData();  // Obtiene los datos de autenticación
    if (authData) {
      this.userId = authData.id;  // Aquí extraemos el id del objeto AuthResponse
    }
  }

  /**
   * Método para manejar el evento onSubmit del formulario.
   */
  onSubmit(): void {
    if (this.createPlanForm.invalid) {
      return;
    }

    this.createSubscriptionPlan();
  }

  /**
   * Método para crear un nuevo plan de suscripción.
   */
  createSubscriptionPlan(): void {
    const planData: SubscriptionPlan = this.createPlanForm.value;

    if (this.userId) {
      planData.userId = this.userId;  // Agregar el id del usuario a los datos del plan
    }

    this.subscriptionPlanService.createPlan(planData).subscribe({
      next: (response) => {
        console.log('Plan de suscripción creado', response);
        this.router.navigate(['/my-subscription-plans']); // Redirige al listado de planes
      },
      error: (error) => {
        console.error('Error al crear el plan de suscripción', error);
      }
    });
  }
}
