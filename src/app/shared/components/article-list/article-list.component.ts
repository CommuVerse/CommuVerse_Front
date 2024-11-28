import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  showFilterMenu = false;
  selectedCategory: string = '';  // Almacenar la categoría seleccionada

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();  // Cargar artículos al iniciar
  }

  // Método para cargar los artículos
  loadArticles(): void {
    if (this.selectedCategory) {
      // Si se ha seleccionado una categoría, obtener los artículos filtrados
      this.articleService.filterArticlesByType(this.selectedCategory).subscribe({
        next: (data: Article[]) => {
          this.articles = data;
        },
        error: (err: any) => {
          console.error('Error al cargar artículos filtrados:', err);
        },
      });
    } else {
      // Si no hay categoría seleccionada, cargar todos los artículos
      this.articleService.getAllArticles().subscribe({
        next: (data: Article[]) => {
          this.articles = data;
        },
        error: (err: any) => {
          console.error('Error al cargar artículos:', err);
        },
      });
    }
  }

  // Método para alternar la visibilidad del menú de filtro
  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  // Método para manejar el cambio de categoría
  onFilterChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.selectedCategory = selectedCategory;  // Actualizar la categoría seleccionada
    this.loadArticles();  // Recargar los artículos con el filtro aplicado
  }
}
