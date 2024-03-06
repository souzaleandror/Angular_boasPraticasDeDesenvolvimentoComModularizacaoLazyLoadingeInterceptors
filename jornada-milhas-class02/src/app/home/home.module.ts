import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/core/material/material.module";
import { PromocoesComponent } from "./promocoes/promocoes.component";
import { DepoimentosComponent } from "./depoimentos/depoimentos.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    PromocoesComponent,
    DepoimentosComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    PromocoesComponent,
    DepoimentosComponent,
    HomeComponent,
  ]
})

export class HomeModule { }