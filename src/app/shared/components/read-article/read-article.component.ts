import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-read-article',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importa CommonModule para usar directivas como *ngIf
  templateUrl: './read-article.component.html',
  styleUrls: ['./read-article.component.css'],
})
export class ReadArticleComponent implements OnInit {
  article: Article | null = null;
  isCreator: boolean = false; // Diferenciar entre lector y creador
  likes: number = 0;
  comment: string = '';
  menuVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticle(+articleId).subscribe({
        next: (data) => {
          this.article = data;
      },
      error: (err) => {
        console.error('Error al cargar el artículo:', err);
      }
    });
  }
}
  
  loadArticle(id: number): void {
    this.articleService.getArticle(id).subscribe({
      next: (data) => {
        this.article = data;
        this.likes = this.article.numLikes || 0; // Inicializar likes
      },
      error: (err) => {
        console.error('Error loading article:', err);
      },
    });
  }

  checkIfCreator(): boolean {
    return true; // Simulación: siempre es creador
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible; // Alterna el estado del menú
  }

  editArticle(): void {
    alert('Editar artículo');
    this.menuVisible = false;
  }

  deleteArticle(): void {
    alert('Eliminar artículo');
    this.menuVisible = false;
  }

  onComment(): void {
    if (this.comment.trim()) {
      console.log(`Comentario enviado: ${this.comment}`);
      alert(`Comentario enviado: ${this.comment}`);
      this.comment = ''; // Limpia el campo después de enviar el comentario
    }
  }
  
  onLike(): void {
    this.likes++;
  }
}
