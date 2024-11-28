import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import Usuario, { TipoUsuarioEnum } from 'src/model/usuario.entity';
import { AllowUserTypes } from 'src/auth/decorators/AllowedUserTypes.decorator';
import { UpdateUsuarioDto } from '../dto/usuarios/UpdateUsuario.dto';

@Controller('usuarios')
@AllowUserTypes('Administrador')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get('/enum')
  async getEnum(): Promise<{ tupoUsuario: typeof TipoUsuarioEnum }> {
    return { tupoUsuario: TipoUsuarioEnum };
  }

  @Get('/all')
  findAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }
  @Get('/find/:id')
  async findOneUsuario(@Param('id') id: number): Promise<Usuario | null> {
    return await this.usuarioService.findOne(id);
  }

  @Get('/findByName/:username') //Usar %20 em nomes compostos
  async findOneUsuarioByUsername(
    @Param('username') username: string,
  ): Promise<Usuario | null> {
    return await this.usuarioService.findOneByUsername(username);
  }

  @Put('/update/:id')
  async updateUsuario(
    @Param('id') id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return await this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.usuarioService.delete(id);
  }
}
