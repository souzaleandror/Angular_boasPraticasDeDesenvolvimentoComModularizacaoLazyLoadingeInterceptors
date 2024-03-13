import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';

@NgModule({
  declarations: [
    CadastroComponent,
    LoginComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AutenticacaoRoutingModule
  ],
  exports: [
    CadastroComponent,
    LoginComponent,
    PerfilComponent,
  ]
})
export class AutenticacaoModule { }
