import { Component, DestroyRef, effect, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-multi-select-search',
  templateUrl: './multi-select-search.html',
  styleUrl: './multi-select-search.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
})
export class MultiSelectSearch implements OnInit {
  items = input<any[]>([]);
  label = input('');
  control = input<FormControl<any[] | null>>(new FormControl([]));

  selectionChange = output<{ value: any[] }>();

  filterCtrl = new FormControl<string | null>('');
  filteredItems = signal<any[]>([]);

  constructor(private destroyRef: DestroyRef) {
    // Esperar a que control esté definido
    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;

      ctrl.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value: any) => {
          this.selectionChange.emit({ value });
        });
    });

    // Refiltrar cuando cambien los items
    effect(() => {
      const allItems = this.items() || [];
      const search = this.filterCtrl.value?.toLowerCase() || '';
      this.filteredItems.set(
        allItems.filter(item =>
          item.description?.toLowerCase().includes(search)
        )
      );
    });

    // Refiltrar cuando cambie el texto de búsqueda
    this.filterCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const search = this.filterCtrl.value?.toLowerCase() || '';
        const allItems = this.items() || [];
        this.filteredItems.set(
          allItems.filter(item =>
            item.description?.toLowerCase().includes(search)
          )
        );
      });
  }

  ngOnInit(): void {
    const ctrl = this.control();
    if (ctrl) {
      ctrl.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value: any) => this.selectionChange.emit({ value }));
    }
  }
}

