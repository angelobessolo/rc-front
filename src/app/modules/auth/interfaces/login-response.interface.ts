export interface LoginResponse {
    user:       User;
    modules:    Module[];
    userDetail: UserDetail;
    token:      string;
}

export interface Module {
    id:          number;
    moduleName:  string;
    moduleIcon:  string;
    moduleRoute: string;
    isActive:    boolean;
    createAt:    Date;
    createTime:  string;
    updateAt:    Date;
    updateTime:  string;
    submodules:  Submodule[];
}

export interface Submodule {
    id:             number;
    subModuleName:  string;
    subModuleIcon:  string;
    subModuleRoute: string;
    isActive:       boolean;
    createAt:       Date;
    createTime:     string;
    updateAt:       Date;
    updateTime:     string;
}

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

export interface UserDetail {
    id:             number;
    documentNumber: number;
    firstName:      string;
    secondName:     string;
    lastName:       string;
    sureName:       string;
    phoneNumber:    null;
    email:          string;
    photo:          null;
    isActive:       boolean;
    createAt:       Date;
    createTime:     string;
    updateAt:       Date;
    updateTime:     string;
}
