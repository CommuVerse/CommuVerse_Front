import { CommonModule } from '@angular/common'; 
import { Component, ViewChild, ElementRef } from '@angular/core';
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
  images: string[] = [];
  @ViewChild('imageInput') imageInput!: ElementRef;


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

  // Abre el selector de archivos
  triggerImageUpload() {
    this.imageInput.nativeElement.click();
  }

  // Maneja las imágenes seleccionadas
  onImageSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result); // Guarda la imagen en formato base64
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  // Elimina una imagen seleccionada
  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onSubmit() {
    if (this.articleForm.valid) {
      const articleData = {
        ...this.articleForm.value, // Mapea todos los valores del formulario
        type: this.articleForm.value.category, // Asegúrate de incluir la categoría como "tag"
        images: this.images
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
