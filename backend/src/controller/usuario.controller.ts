import { Controller, Get } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";

@Controller('users')
export class UsuarioController{
    constructor(private usuarioService: UsuarioService) {}
    @Get()
    findAll() {
        return this.usuarioService.getUsuarios();
    }
}
   