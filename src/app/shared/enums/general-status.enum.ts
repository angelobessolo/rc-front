import { stat } from "fs";

export enum GeneralStatus {
    Active = '🟢 Activo',
    Inactive = '🔴 Inactivo'
}

export const updateStatusValues: any = [
    {
        isActive: true,
        label: GeneralStatus.Active,
        
    },
    {
        isActive: false,
        label: GeneralStatus.Inactive,
    }
];