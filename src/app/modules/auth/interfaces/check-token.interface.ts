import { Module } from "./login-response.interface";
import { User } from "./user";

export interface CheckToken {
    user:       User;
    userParams: Module[];
    token:      string;
}



