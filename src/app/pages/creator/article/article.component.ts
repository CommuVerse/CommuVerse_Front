import { CommonModule } from '@angular/common'; 
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/services/article.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class CreateArticleComponent {
  articleForm: FormGroup;
  showSuccessModal = false;

  constructor(
    private fb: FormBuilder, 
    private articleService: ArticleService, 
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      publicationDate: [new Date().toISOString()],
      status: [true],
      numReads: [0],
      numComments: [0],
      numLikes: [0],
      scheduledDate: [new Date().toISOString()],
      creatorId: [1] // Ajusta según sea necesario
    });
  }

  onSubmit() {
    if (this.articleForm.valid) {
      const articleData = {
        ...this.articleForm.value, // Mapea todos los valores del formulario
        type: this.articleForm.value.category // Asegúrate de incluir la categoría como "tag"
      };
  
      console.log('Datos del artículo a enviar:', articleData);
  
      this.articleService.createArticle(articleData).subscribe({
        next: (response: any) => {
          console.log('Artículo creado:', response);
          this.showSuccessModal = true; // Muestra el modal de éxito
        },
        error: (error: any) => {
          console.error('Error al crear el artículo:', error);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  
  redirectToHome() {
    this.showSuccessModal = false; // Oculta el modal
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }
}
