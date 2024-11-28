import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../core/services/article.service';
import { CommentService } from '../../../core/services/comment.service';
import { Article } from '../../models/article';
import { Comment } from '../../models/comment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-read-article',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './read-article.component.html',
  styleUrls: ['./read-article.component.css'],
})
export class ReadArticleComponent implements OnInit {
  article: Article | null = null;
  isCreator: boolean = false;
  likes: number = 0;
  commentContent: string = '';
  comments: Comment[] = [];
  menuVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticle(+articleId).subscribe({
        next: (data) => {
          this.article = data;
          this.loadComments(+articleId);  // Cargar los comentarios del artículo
        },
        error: (err) => {
          console.error('Error al cargar el artículo:', err);
        }
      });
    }
  }

  loadComments(articleId: number): void {
    this.commentService.getCommentsByArticle(articleId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.error('Error al cargar los comentarios:', err);
      }
    });
  }

  onComment(): void {
    if (this.commentContent.trim()) {
      const newComment = {
        content: this.commentContent,
        articleId: this.article?.id,
        userId: 1,  // Aquí se debe reemplazar por el ID del usuario autenticado
      };
      this.commentService.addComment(newComment).subscribe({
        next: (comment) => {
          this.comments.push(comment);
          this.commentContent = ''; // Limpiar el campo de texto
        },
        error: (err) => {
          console.error('Error al agregar comentario:', err);
        }
      });
    }
  }

  onLike(): void {
    this.likes++;
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  editArticle(): void {
    alert('Editar artículo');
    this.menuVisible = false;
  }

  deleteArticle(): void {
    alert('Eliminar artículo');
    this.menuVisible = false;
  }

  editComment(comment: Comment): void {
    const newContent = prompt('Editar comentario:', comment.content);
    if (newContent && newContent !== comment.content) {
      const updatedComment = { ...comment, content: newContent };
      this.commentService.editComment(comment.id, updatedComment).subscribe({
        next: (updated) => {
          const index = this.comments.findIndex((c) => c.id === comment.id);
          if (index !== -1) {
            this.comments[index] = updated;
          }
        },
        error: (err) => {
          console.error('Error al editar el comentario:', err);
        }
      });
    }
  }

  deleteComment(comment: Comment): void {
    if (!comment || !comment.id) {
      console.error('El comentario no es válido o no tiene un ID.');
      return;
    }

    const confirmation = confirm('¿Estás seguro de que deseas eliminar este comentario?');
    if (confirmation) {
      this.commentService.deleteComment(comment.id).subscribe({
        next: () => {
          const index = this.comments.findIndex((c) => c.id === comment.id);
          if (index !== -1) {
            this.comments.splice(index, 1);
          }
        },
        error: (err) => {
          console.error('Error al eliminar el comentario:', err);
        }
      });
    }
  }

  renderContentWithMentions(content: string): string {
    return content.split(' ').map(word => 
      word.startsWith('@') ? `<span class="mention">${word}</span>` : word
    ).join(' ');
  }
}
