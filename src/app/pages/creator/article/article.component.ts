import { CommonModule } from '@angular/common'; 
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/services/article.service'; 
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service'; // Importamos el servicio de almacenamiento

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
    private router: Router,
    private storageService: StorageService // Inyectamos el StorageService
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
      scheduledDate: [new Date().toISOString()]
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

  // Envía los datos del formulario al backend
  onSubmit() {
    if (this.articleForm.valid) {
      // Obtener el ID del creador desde el StorageService
      const creatorId = this.storageService.getCreatorId(); // Cambiado de userId a creatorId

      if (!creatorId) {
        console.error('No se encontró el ID del creador.');
        this.showSnackBar('Error al identificar al creador. Intenta iniciar sesión nuevamente.');
        return;
      }

      const articleData = {
        ...this.articleForm.value, // Mapea todos los valores del formulario
        creatorId: creatorId, // Asigna el ID del creador automáticamente
        type: this.articleForm.value.category, // Asegúrate de incluir la categoría como "type"
        images: this.images
      };

      console.log('Datos del artículo a enviar:', articleData);

      // Llamada al servicio para crear el artículo
      this.articleService.createArticle(articleData).subscribe({
        next: (response: any) => {
          console.log('Artículo creado:', response);
          this.showSuccessModal = true; // Muestra el modal de éxito
        },
        error: (error: any) => {
          console.error('Error al crear el artículo:', error);
          this.showSnackBar('Error al crear el artículo. Por favor, intenta nuevamente.');
        }
      });
    } else {
      console.log('Formulario no válido');
      this.showSnackBar('Por favor, completa todos los campos correctamente.');
    }
  }

  // Muestra un mensaje de retroalimentación
  private showSnackBar(message: string): void {
    alert(message); // Puedes usar MatSnackBar o cualquier otra librería para mostrar mensajes
  }

  redirectToHome() {
    this.showSuccessModal = false; // Oculta el modal
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }
}
