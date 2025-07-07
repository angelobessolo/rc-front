export interface User {
    id:         number;
    email:      string;
    userName:   string;
    isActive:   boolean;
    createAt:   Date;
    createTime: string;
    updateAt:   Date;
    updateTime: string;
    role:       Role;
}

export interface Role {
    id:       number;
    roleName: string;
    isActive: boolean;
}
