import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioService{
    getUsuarios(): any[] {
        return ["Lucas é lindo"];
    } 
}
