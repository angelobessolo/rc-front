export interface GeneralListResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    columnMappings: any[];
    displayedColumns: any[];
    values: any[];
}