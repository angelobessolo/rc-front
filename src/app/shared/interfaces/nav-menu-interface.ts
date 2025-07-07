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

