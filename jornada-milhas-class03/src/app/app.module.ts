import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacaoInterceptor } from './autenticacao/autenticacao.interceptor';
import { BuscaComponent } from './pages/busca/busca.component';
import { ParadasComponent } from './shared/form-busca/filtros-complementares/paradas/paradas.component';
import { CompanhiasComponent } from './shared/form-busca/filtros-complementares/companhias/companhias.component';
import { PrecosComponent } from './shared/form-busca/filtros-complementares/precos/precos.component';
import { LabelComponent } from './shared/form-busca/filtros-complementares/label/label.component';
import { FiltrosComplementaresComponent } from './shared/form-busca/filtros-complementares/filtros-complementares.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './core/material/material.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    BuscaComponent,
    ParadasComponent,
    CompanhiasComponent,
    PrecosComponent,
    LabelComponent,
    FiltrosComplementaresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    HomeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AutenticacaoInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
