export interface TableColumn {
    columnDef: string; // Nombre de la columna (como "userID", "user", "email", etc.)
    header: string;    // Título de la columna visible en el encabezado
    cell: (element: any) => string;  // Función para renderizar los datos de cada celda
}
  
export interface TableData {
    dataSource: any[]; // Los datos a mostrar en la tabla
}