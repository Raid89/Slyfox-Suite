import { Component, OnInit } from '@angular/core';

export interface User {
  id: string; // For trackBy and unique identification
  name: string;
  email: string;
  identityNumber: string;
  role: string;
  avatarText: string;
  avatarColor: any; // Changed from any to string
}

@Component({
  selector: 'app-users-table',
  standalone: false,
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  users: User[] = [
    // Updated to have unique IDs from "1" to "24"
    { id: '1', name: 'Juan Perez', email: 'juan.perez1@example.com', identityNumber: '123456789', role: 'Desarrollador', avatarText: 'JP', avatarColor: 'primary' },
    { id: '2', name: 'Ana Garcia', email: 'ana.garcia2@example.com', identityNumber: '987654321', role: 'Diseñadora UX', avatarText: 'AG', avatarColor: 'secondary' },
    { id: '3', name: 'Carlos Lopez', email: 'carlos.lopez3@example.com', identityNumber: '112233445', role: 'Gerente de Proyecto', avatarText: 'CL', avatarColor: 'success' },
    { id: '4', name: 'Laura Martinez', email: 'laura.martinez4@example.com', identityNumber: '556677889', role: 'Analista QA', avatarText: 'LM', avatarColor: 'warning' },
    { id: '5', name: 'Pedro Gomez', email: 'pedro.gomez5@example.com', identityNumber: '101010101', role: 'Desarrollador Backend', avatarText: 'PG', avatarColor: 'primary' },
    { id: '6', name: 'Sofia Hernandez', email: 'sofia.hernandez6@example.com', identityNumber: '202020202', role: 'Desarrollador Frontend', avatarText: 'SH', avatarColor: 'secondary' },
    { id: '7', name: 'Diego Rodriguez', email: 'diego.rodriguez7@example.com', identityNumber: '303030303', role: 'Líder Técnico', avatarText: 'DR', avatarColor: 'success' },
    { id: '8', name: 'Valentina Diaz', email: 'valentina.diaz8@example.com', identityNumber: '404040404', role: 'Analista de Sistemas', avatarText: 'VD', avatarColor: 'warning' },
    { id: '9', name: 'Martin Silva', email: 'martin.silva9@example.com', identityNumber: '505050505', role: 'Ingeniero DevOps', avatarText: 'MS', avatarColor: 'primary' },
    { id: '10', name: 'Camila Torres', email: 'camila.torres10@example.com', identityNumber: '606060606', role: 'Scrum Master', avatarText: 'CT', avatarColor: 'secondary' },
    { id: '11', name: 'Lucas Morales', email: 'lucas.morales11@example.com', identityNumber: '707070707', role: 'Diseñador Gráfico', avatarText: 'LM', avatarColor: 'success' },
    { id: '12', name: 'Isabella Vargas', email: 'isabella.vargas12@example.com', identityNumber: '808080808', role: 'Product Owner', avatarText: 'IV', avatarColor: 'warning' },
    { id: '13', name: 'Mateo Castillo', email: 'mateo.castillo13@example.com', identityNumber: '909090909', role: 'Desarrollador Fullstack', avatarText: 'MC', avatarColor: 'primary' },
    { id: '14', name: 'Julieta Mendez', email: 'julieta.mendez14@example.com', identityNumber: '121212121', role: 'Especialista SEO', avatarText: 'JM', avatarColor: 'secondary' },
    { id: '15', name: 'Nicolas Rojas', email: 'nicolas.rojas15@example.com', identityNumber: '131313131', role: 'Redactor Técnico', avatarText: 'NR', avatarColor: 'success' },
    { id: '16', name: 'Renata Flores', email: 'renata.flores16@example.com', identityNumber: '141414141', role: 'Soporte Técnico', avatarText: 'RF', avatarColor: 'warning' },
    { id: '17', name: 'Emilio Castro', email: 'emilio.castro17@example.com', identityNumber: '151515151', role: 'Administrador de BD', avatarText: 'EC', avatarColor: 'primary' },
    { id: '18', name: 'Victoria Romero', email: 'victoria.romero18@example.com', identityNumber: '161616161', role: 'Consultor BI', avatarText: 'VR', avatarColor: 'secondary' },
    { id: '19', name: 'Daniel Paredes', email: 'daniel.paredes19@example.com', identityNumber: '171717171', role: 'Arquitecto Cloud', avatarText: 'DP', avatarColor: 'success' },
    { id: '20', name: 'Paula Herrera', email: 'paula.herrera20@example.com', identityNumber: '181818181', role: 'Gerente de Marketing', avatarText: 'PH', avatarColor: 'warning' },
    { id: '21', name: 'Samuel Rios', email: 'samuel.rios21@example.com', identityNumber: '191919191', role: 'Analista Financiero', avatarText: 'SR', avatarColor: 'primary' },
    { id: '22', name: 'Gabriela Soto', email: 'gabriela.soto22@example.com', identityNumber: '212121212', role: 'Recursos Humanos', avatarText: 'GS', avatarColor: 'secondary' },
    { id: '23', name: 'Adrian Benitez', email: 'adrian.benitez23@example.com', identityNumber: '232323232', role: 'CEO', avatarText: 'AB', avatarColor: 'success' },
    { id: '24', name: 'Elena Acosta', email: 'elena.acosta24@example.com', identityNumber: '242424242', role: 'CTO', avatarText: 'EA', avatarColor: 'warning' }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 5; // Set to 10 for 2 pages for 24 users, good for testing complex pagination

  constructor() {
    // You can generate more dynamic avatarText if needed, e.g., from initials
    this.users.forEach(user => {
      if (!user.avatarText) {
        const nameParts = user.name.split(' ');
        user.avatarText = nameParts.length > 1
          ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
          : `${nameParts[0][0]}${nameParts[0][1] || ''}`.toUpperCase();
      }
    });
  }

  ngOnInit(): void { }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  get displayedPageNumbers(): (number | string)[] {
    const cp = this.currentPage;
    const tp = this.totalPages;

    if (tp === 0) return [];
    if (tp === 1) return [1];

    // Threshold for showing all pages vs. complex view.
    // The structure 1 ... cWin ... endWin can have up to 7 numbers + 2 ellipses.
    // If total pages is less than or equal to this (e.g. 7), show all.
    const SHOW_ALL_THRESHOLD = 7;
    if (tp <= SHOW_ALL_THRESHOLD) {
      return Array.from({ length: tp }, (_, i) => i + 1);
    }

    const pagesSet = new Set<number>();

    // 1. Add page 1
    pagesSet.add(1);

    // 2. Add pages for current window (cp-1, cp, cp+1)
    // These should be > 1 and < tp
    for (let i = cp - 1; i <= cp + 1; i++) {
      if (i > 1 && i < tp) {
        pagesSet.add(i);
      }
    }

    // 3. Add pages for end window (tp-2, tp-1)
    // These should be > 1 and < tp (tp is added separately)
    for (let i = tp - 2; i <= tp - 1; i++) {
      if (i > 1 && i < tp) {
        pagesSet.add(i);
      }
    }

    // 4. Add page tp (if not 1)
    if (tp > 1) { // tp is always > 1 here due to earlier checks
      pagesSet.add(tp);
    }

    const sortedPages = Array.from(pagesSet).sort((a, b) => a - b);

    const result: (number | string)[] = [];
    let lastPage = 0;
    for (const page of sortedPages) {
      if (lastPage !== 0 && page - lastPage > 1) {
        result.push('...');
      }
      result.push(page);
      lastPage = page;
    }
    return result;
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  trackByUser(index: number, user: User): string {
    return user.id;
  }
}
