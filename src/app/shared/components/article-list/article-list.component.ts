import { Component, OnInit, TemplateRef } from '@angular/core';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../models/article';
import { CommonModule, NgIfContext } from '@angular/common';
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

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (err) => {
        console.error('Error loading articles:', err);
      },
    });
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  onFilterChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    console.log('Categoría seleccionada:', selectedCategory);
  }
}
