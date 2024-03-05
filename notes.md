#### 05/03/2024

Curso de Angular: boas práticas de desenvolvimento com Modularização, Lazy Loading e Interceptors

```
ng generate enviromnments
cd jornada-milhas-api
npm run start:dev
ng serve --open
sudo lsof -i :8080
kill -9 <PID>
http://localhost:8080/api
http://localhost:4200
```

@01-Entendendo a arquitetura modular 

@@01
Apresentação

Que tal aprender como aplicar boas práticas no seu projeto Angular? Eu sou a Nayanne Batista, mas você pode me chamar de Nay, e quero te dar as boas-vindas a mais este curso de Angular!
Audiodescrição: Nay se descreve como uma mulher de olhos castanhos e cabelo castanho-escuro liso e longo. Ela veste uma camisa preta com a logo do Angular, usa brincos prateados, e está sentada em frente a um microfone, em um cenário iluminado em gradiente azul, com estantes brancas ao fundo contendo livros e enfeites.
O que vamos aprender?
Neste curso, iremos utilizar o projeto Jornada Milhas para aplicar os conceitos de modularização. Você entenderá por que é extremamente importante utilizar a arquitetura modular do Angular. Além disso, conseguiremos carregar sob demanda os módulos, utilizando o conceito de Lazy Loading.

Também vamos aprender a lidar com erros na aplicação. Criaremos uma nova tela para quando nenhuma rota for encontrada.

Utilizaremos também uma ferramenta de análise estática de código, o ESLint, para melhorar a qualidade geral do projeto.

Pré-requisitos
Para aproveitar ao máximo este curso, é importante que você já possua conhecimento sobre o Angular, e seria ideal que já tivesse realizado os cursos anteriores desta formação.

Se você topa esse desafio, então venha mergulhar no Angular!

@@02
Preparando o ambiente

Olá, pessoa!
Boas vindas ao curso de modularização e boas práticas com Angular! \o/

Antes de começarmos nossa jornada de aprendizado, vamos preparar o ambiente para garantir que você tenha uma experiência tranquila e produtiva.

Vamos utilizar o Angular na versão 16.0.2 e o NodeJS na versão 18.12.1. É extremamente recomendado que você utilize as mesmas versões para evitar problemas de incompatibilidade ao longo do curso.

Caso ainda não tenha o angular instalado ou esteja com uma versão diferente da recomendada, abra seu terminal e digite o seguinte comando:

npm install -g @angular/cli@16.0.2
COPIAR CÓDIGO
Agora, siga os passos abaixo para configurar corretamente seu ambiente:

1. Código do Projeto Base
Para este curso, utilizaremos um projeto base que foi desenvolvido ao longo dos cursos anteriores dessa formação, que servirá de ponto de partida para nossas atividades. Você pode acessar o código do projeto através do repositório no GitHub, clicando aqui ou baixá-lo clicando neste link.

Após baixá-lo, abra a pasta do projeto e, no terminal, utilize o comando npm install para instalar as dependências do projeto.

Após instalar as dependências, dentro da pasta da aplicação, digite o comando ng serve no terminal para executar o projeto.

Abra seu navegador e digite http://localhost:4200 para acessar a aplicação.

2. API do Projeto
Vamos interagir com a API do “Jornada Milhas” durante as atividades do curso, que você pode baixar aqui ou clonar usando o seguinte comando:

git clone https://github.com/viniciosneves/jornada-milhas-api.git
COPIAR CÓDIGO
Depois, precisamos instalar as dependências e executar o script que inicia o projeto:

npm i
COPIAR CÓDIGO
E em seguida:

npm run start:dev	
COPIAR CÓDIGO
Certifique-se de que os dois terminais permaneçam ativos durante todo o desenvolvimento para que tanto a aplicação Angular quanto a API estejam sendo executadas.

Caso queira visualizar os dados da API, acesse no navegador http://localhost:8080.

3. Layout no Figma
Durante o curso, trabalharemos com um design pronto que será transformado em código. Para visualizar o layout no Figma, clique aqui e explore as diferentes telas e elementos da aplicação “Jornada Milhas”.

4. Imagens para o Projeto
A seguir você pode baixar as imagens utilizadas neste curso. Baixe a pasta e não se esqueça de manter a estrutura do projeto, em que todas as imagens devem estar dentro da pasta assets/imagens:

Clique aqui para baixar a pasta de imagens
Em caso de dúvidas ao longo deste curso, sinta-se à vontade para interagir conosco por meio do Discord da Alura. Lá você pode encontrar a equipe de pessoas instrutoras, como a Nayanne Batista no perfil #nayannebatista, a Rafa Silvério, no perfil #rafasilverio, o Vinny Neves no perfil #vinnyneves. Estamos aqui para te ajudar nessa jornada de aprendizado em Angular. E mesmo que você não tenha dúvidas no momento, adoraríamos te ver por lá e acompanhar o seu progresso. Vamos aprender juntos!
Vem com a gente mergulhar no Angular! :)

https://github.com/alura-cursos/3413-jornada-milhas/tree/master

https://github.com/alura-cursos/3413-jornada-milhas/archive/refs/heads/master.zip

http://localhost:4200/

https://github.com/alura-cursos/jornada-milhas-api/archive/refs/heads/main.zip

https://www.figma.com/file/CDjWGRioDcLFFewR7sqGKs/Jornada-Milhas-%7C-3413---Angular%3A-Modularização-e-Boas-práticas?type=design&node-id=0-1&mode=design&t=YxVXeK33CmwcErD8-0

https://caelum-online-public.s3.amazonaws.com/3413-angular/Angular-imagens+do+curso.zip

@@03
Por que modularizar?

Você pode estar se perguntando: por que devo modularizar minha aplicação Angular? Vamos responder com uma analogia.
Por que modularizar?
Imagine que você tem em sua casa uma estante de livros que está muito cheia e não comporta mais nenhum livro novo. Essa é uma situação comum. Por conta disso, decide comprar uma nova estante e se aventurar para montá-la.

Assim, você pega a sua caixa de ferramentas, que ao longo do tempo foi colecionando diversas ferramentas e as guardou sem nenhum critério de ordenação. Esta grande caixa de ferramentas pode ser comparada ao arquivo app.module.ts no VS Code.

Esse arquivo é o módulo principal da nossa aplicação e, por enquanto, o único módulo existente. É como se fosse a caixa de ferramentas, onde criamos componentes e importamos tudo nessa mesma estrutura, sem critério ou organização lógica.

Em razão disso, quando você começa a montar a estante, percebe que não é tão fácil encontrar as ferramentas certas. Além disso, você não consegue pedir ajuda a outra pessoa, porque para ajudar, essa pessoa necessita encontrar as coisas.

Por isso, você decide adicionar algumas divisórias nessa caixa e organizar as ferramentas de acordo com a funcionalidade delas. Ou seja, uma divisória para chaves de fenda, uma divisória para parafusos, uma divisória para martelos. Isso facilita a organização das ferramentas com base em suas funcionalidades.

Essa é a mesma lógica que aplicaremos em nossa aplicação. Vamos criar novos módulos para conseguir dividir e organizar o código. Esses módulos serão organizados de acordo com a funcionalidade. Portanto, cada módulo será um agrupamento de componentes, serviços e recursos que têm uma funcionalidade relacionada.

A modularização da aplicação vai facilitar os testes, melhorar a organização e também a colaboração entre os times. Utilizar a arquitetura modular do Angular vai auxiliar na manutenção e na escalabilidade, porque adicionar novas funcionalidades será muito mais fácil, fazendo com que nosso projeto cresça de forma mais sustentável.

Conclusão
Agora que você compreende a necessidade e a importância de criar módulos na sua aplicação, no próximo vídeo, vamos explicar detalhadamente a estrutura de um módulo em Angular. Te encontramos lá!

@@04
A estrutura do módulo

Antes de começarmos a criar nossos próprios módulos, vamos examinar o arquivo app.module.ts e entender a estrutura de um módulo em Angular.
A estrutura do módulo
Já vimos que o módulo é um bloco de código independente que agrupa diversos componentes, pipes, diretivas e outros módulos dos quais precisa para funcionar.

No Angular, para informar que uma classe é um módulo, precisamos decorá-la com o decorator @NgModule. Esse é o indicativo para o Angular de que a classe é um módulo, assim como quando adicionamos o decorator @Component para sinalizar que a classe é um componente.

Dentro do @NgModule, podemos ter uma ou mais propriedades. No caso do arquivo app.module.ts, temos as propriedades: declarations, imports, providers e bootstrap. Vamos entender um pouco mais sobre cada uma delas.

No bloco declarations, temos todos os componentes que compõem o módulo.

app.module.ts:
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    CardComponent,
    ContainerComponent,
    HomeComponent,
    FooterComponent,
    CardBuscaComponent,
    CardDepoimentoComponent,
    FormBuscaComponent,
    ModalComponent,
    BotaoControleComponent,
    PromocoesComponent,
    DropdownUfComponent,
    SeletorPassageiroComponent,
    DepoimentosComponent,
    LoginComponent,
    FormBaseComponent,
    CadastroComponent,
    PerfilComponent,
    BuscaComponent,
    PassagemComponent,
    ParadasComponent,
    CompanhiasComponent,
    PrecosComponent,
    LabelComponent,
    FiltrosComplementaresComponent,
    PassagemDestaqueComponent
  ],

  // código omitido
COPIAR CÓDIGO
Neste array, precisamos informar os componentes, diretivas e pipes que o módulo contém. É preciso adicionar tudo. Fazendo uma analogia com a declaração de imposto de renda, da mesma forma que precisamos declarar todos os bens, no array de declarations, precisamos declarar tudo o que o módulo possui.

Se por acaso deixarmos de declarar algum componente, por exemplo, vamos remover o CardBuscaComponent na linha 64 e abrir o terminal, surgirá um erro. Então, certamente, você cairá na malha fina do Angular. Vamos fechar o terminal e usar "Ctrl + Z" para restaurar o CardBuscaComponent.

Uma observação importante é que não podemos declarar um componente em mais de um módulo simultaneamente. Isso também levará a erros e conflitos.
Agora que já falamos das declarations, vamos para a próxima propriedade, os imports.

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSliderModule
  ],
COPIAR CÓDIGO
Dentro de imports, precisamos adicionar todos os módulos que o módulo precisa para funcionar. No caso do app.module.ts, importamos vários módulos do Angular Material, a biblioteca de componentes que estamos utilizando, como o módulo de formulários reativos (ReactiveFormsModule) na linha 102, o módulo do HTTP (HttpClientModule) na linha 101 para realizar as requisições. Portanto, tudo que o módulo precisa para funcionar, declaramos em imports.

A próxima propriedade é providers. Neste array, declaramos todos os serviços que o módulo utiliza.

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AutenticacaoInterceptor,
    multi: true
  }],
COPIAR CÓDIGO
Da mesma forma que na declaração de imposto de renda, nas declarations, declaramos o que temos e algum serviço que foi prestado, por exemplo, caso tenhamos ido a um hospital ou clínica, isso é declarado em outro local. No app.module.ts, declaramos no array de providers. Então, são os serviços que foram fornecidos para nós, isto é, os provedores.

A última propriedade, específica do app.module.ts, é a bootstrap, que se refere à inicialização e não ao framework CSS. Essa propriedade indica para o Angular qual componente é o ponto de partida. No caso, na linha 114, o componente que será iniciado é o AppComponent.

  bootstrap: [AppComponent]
COPIAR CÓDIGO
Se acessarmos esse componente, na linha 4, o seletor dele é o app-root.

app.component.ts:
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jornada-milhas';
}
COPIAR CÓDIGO
Acessando pelo menu lateral à esquerda o arquivo index.html, que é como se fosse a única página da nossa SPA, o app-root está declarado dentro do <body>. Então, é ele quem será renderizado primeiro em nossa aplicação.

index.html:
<body class="mat-typography">
  <app-root></app-root>
</body>
COPIAR CÓDIGO
Conclusão
Agora que você entendeu a estrutura de um módulo em Angular, podemos começar a criar novos módulos no projeto!

@@05
Importância dos módulos no Angular

Você está trabalhando em um projeto Angular complexo e deseja melhorar a organização do código por meio da modularização. Você ouviu falar sobre o uso do decorator @NgModule para criar módulos em Angular, mas ainda tem dúvidas sobre como usá-lo adequadamente e quando criar um módulo raiz (root module) ou um módulo de funcionalidade (feature module).
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FeatureComponent } from './feature.component';

@NgModule({
  declarations: [FeatureComponent],
  imports: [CommonModule, SharedModule],
  exports: [FeatureComponent],
})
export class FeatureModule {}
COPIAR CÓDIGO
Qual é a finalidade do código de exemplo acima e qual é o papel do módulo de funcionalidade em uma aplicação Angular?

Selecione uma alternativa

O código de exemplo define um módulo raiz Angular que é responsável por carregar a aplicação principal. O módulo FeatureModule é o ponto de entrada da aplicação e não encapsula nenhuma funcionalidade específica.
 
Alternativa correta
O código de exemplo não está correto e não deve ser usado em uma aplicação Angular. Não é necessário criar módulos para organizar o código.
 
Alternativa correta
O código de exemplo define um módulo de funcionalidade Angular que encapsula componentes e pode conter também diretivas e serviços relacionados a uma funcionalidade específica da aplicação.
 
A modularização ajuda na organização e reutilização de código em diferentes partes da aplicação.
Alternativa correta
O código de exemplo define um serviço Angular, que é responsável por organizar componentes e diretivas em uma aplicação.

@@06
Módulo de componentes compartilhados

Agora que já entendemos a necessidade de criar módulos na aplicação e conhecemos a estrutura de um módulo, o desafio é transformar o app.modules.ts, dividindo-o em vários outros módulos.
Módulo de componentes compartilhados
Na realidade, poderíamos ter feito isso desde o início da aplicação, criando os componentes e organizando-os em módulos. Entretanto, como não fizemos isso desde o início, teremos que quebrar o app.module.ts em outros módulos.

Uma forma bastante utilizada no mercado de trabalho é a divisão em módulos de acordo com funcionalidades. Assim, iremos dividir em módulos e agrupar os componentes, diretivas, pipes, e serviços relacionados a uma funcionalidade específica. Por exemplo, um módulo de autenticação, que possui um componente de login, cadastro e alguns serviços relacionados, um módulo para busca, um módulo para o Angular Material, e assim por diante.

O equilíbrio entre a simplicidade e a modularidade é determinado pela complexidade do projeto. Se vamos criar um módulo de autenticação que terá o componente de login, cadastro e outros, ou se vamos criar um módulo apenas para o login e outro apenas para o cadastro, isso dependerá da complexidade do projeto. Vamos seguir essa convenção.

Para começar de modo mais simples, podemos utilizar a organização que já tentávamos manter no projeto. Na pasta "shared", já temos vários componentes que são compartilhados na aplicação. Entretanto, todos eles são importados no arquivo app.module.ts. Assim, podemos criar um módulo apenas para esses componentes.

Criando o módulo shared.module.ts
Para criar, vamos clicar com o botão direito em "shared" e selecionar "New File…". É importante seguir a convenção de nomenclatura do Angular. Quando criamos pela CLI, já vem o nome correto, mas como vamos criar manualmente para aprender a fazer, vamos seguir a convenção, que é o nome do módulo seguido de module.ts (shared.module.ts).

Para mostrar para o Angular que essa classe é um módulo, vamos utilizar o decorator @NgModule. Vamos abrir parênteses e chaves. Após o parêntese, vamos aproveitar e exportar a classe. Então, na linha 4, teremos export class SharedModule { }.

Em seguida, vamos importar o @NgModule na primeira linha. Ele faz parte do @angular/core. Feito isso, no escopo do @NgModule, vamos começar a adicionar as propriedades.

shared.module.ts:
import { NgModule } from "@angular/core";

@NgModule({

})
export class SharedModule { }
COPIAR CÓDIGO
Propriedade declarations
A primeira propriedade é a declarations, onde vamos abrir um array. O que vamos colocar dentro desse módulo? Todos os componentes que fazem parte dele. Então, banner, botao-controle, card, tudo isso teremos que transportar para declarations desse novo módulo.

Para isso, vamos acessar o arquivo app.module.ts, ir até as declarations desse módulo, e transportar os componentes desse módulo para o novo. Além disso, vamos excluir os componentes movidos do arquivo app.module.ts, pois não podemos declarar em mais de um módulo simultaneamente.

Vamos selecionar os componentes desejados e mover para o novo módulo.

// código omitido

@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    CardComponent,
    ContainerComponent,
    FooterComponent,
    CardBuscaComponent,
    CardDepoimentoComponent,
    FormBuscaComponent,
    ModalComponent,
    BotaoControleComponent,
    DropdownUfComponent,
    SeletorPassageiroComponent,
    FormBaseComponent,
    PassagemComponent,
    ParadasComponent,
    CompanhiasComponent,
    PrecosComponent,
    LabelComponent,
    FiltrosComplementaresComponent,
    PassagemDestaqueComponent
  ],
COPIAR CÓDIGO
Após adicionar os componentes no módulo, precisamos importá-los. Clicando no ícone de lupa azul, conseguimos selecionar a opção "Add all missing imports" para adicionar todos os import de uma só vez.

import { BannerComponent } from "./banner/banner.component";
import { BotaoControleComponent } from "./botao-controle/botao-controle.component";
import { CardBuscaComponent } from "./card-busca/card-busca.component";
import { CardDepoimentoComponent } from "./card-depoimento/card-depoimento.component";
import { CardComponent } from "./card/card.component";
import { ContainerComponent } from "./container/container.component";
import { DropdownUfComponent } from "./dropdown-uf/dropdown-uf.component";
import { FooterComponent } from "./footer/footer.component";
import { FormBaseComponent } from "./form-base/form-base.component";
import { CompanhiasComponent } from "./form-busca/filtros-complementares/companhias/companhias.component";
import { FiltrosComplementaresComponent } from "./form-busca/filtros-complementares/filtros-complementares.component";
import { LabelComponent } from "./form-busca/filtros-complementares/label/label.component";
import { ParadasComponent } from "./form-busca/filtros-complementares/paradas/paradas.component";
import { PrecosComponent } from "./form-busca/filtros-complementares/precos/precos.component";
import { FormBuscaComponent } from "./form-busca/form-busca.component";
import { HeaderComponent } from "./header/header.component";
import { ModalComponent } from "./modal/modal.component";
import { PassagemDestaqueComponent } from "./passagem-destaque/passagem-destaque.component";
import { PassagemComponent } from "./passagem/passagem.component";
import { SeletorPassageiroComponent } from "./seletor-passageiro/seletor-passageiro.component";
COPIAR CÓDIGO
Conseguimos adicionar todos os componentes à propriedade declarations.

Propriedade imports
Em seguida, vamos adicionar a propriedade imports. Do que precisamos em imports? Se voltarmos ao arquivo app.module.ts, nos imports do módulo principal, temos o BrowserModule. Essa é uma das diferenças entre o módulo root (raiz) e os módulos de funcionalidade que estamos criando agora.

No módulo raiz, precisamos importar o BrowserModule, que vai fornecer todos os recursos para a aplicação Angular ser inicializada e executada em um navegador.

Nos módulos de funcionalidade, não precisamos importar esse módulo. Na verdade, nós importamos um módulo chamado CommonModule. Esse módulo fornecerá todos os recursos mais amplamente utilizados pelo Angular, um conjunto de diretivas, então você poderá usar o ngIf, ngFor, pipes e outros recursos.

  imports: [
    CommonModule
  ],
COPIAR CÓDIGO
Propriedade exports
Outra diferença existente entre os módulos de funcionalidade e o módulo raiz, é que no módulo de funcionalidade, podemos adicionar a propriedade exports. O que vamos colocar nessa propriedade?

Ainda na analogia da declaração do imposto de renda, nas declarations, colocamos tudo o que temos. No caso da aplicação, todos os componentes que o módulo tem. Já nos exports, não precisamos necessariamente adicionar tudo o que o módulo contém. Podemos escolher o que desejamos expor para outros módulos.

Você pode, por questão de segurança, não querer compartilhar algumas informações. Da mesma forma, por questão de segurança, ou mesmo por não ser necessário, podemos não informar tudo o que declaramos para ser exportado.

No caso do SharedModule, necessitamos que todos os componentes que foram declarados sejam importados, porque queremos que o módulo que importa o SharedModule, tenha acesso a todos esses componentes e possa utilizá-los. Por isso, copiamos todos os componentes de declarations e colamos em exports.

  exports: [
    HeaderComponent,
    BannerComponent,
    CardComponent,
    ContainerComponent,
    FooterComponent,
    CardBuscaComponent,
    CardDepoimentoComponent,
    FormBuscaComponent,
    ModalComponent,
    BotaoControleComponent,
    DropdownUfComponent,
    SeletorPassageiroComponent,
    FormBaseComponent,
    PassagemComponent,
    ParadasComponent,
    CompanhiasComponent,
    PrecosComponent,
    LabelComponent,
    FiltrosComplementaresComponent,
    PassagemDestaqueComponent
  ]
COPIAR CÓDIGO
Você pode estar se perguntando: por que o módulo raiz não tem a propriedade exports? A resposta é que o módulo raiz tem um escopo global. Todos os recursos, componentes, módulos, tudo que existe nesse módulo raiz, já está disponível e acessível para toda a aplicação. Por isso temos a propriedade exports apenas nos módulos de funcionalidade.

Conclusão
Ao abrir novamente o terminal, verificamos um erro. Corrigiremos isso no próximo vídeo!

@@07
Estrutura de módulos no Angular

Você está desenvolvendo um projeto Angular e precisa otimizar a estrutura do seu código, reduzindo a repetição e organizando as funcionalidades em módulos. Para isso, você decide utilizar o conceito de modularização.
Para criar um módulo no Angular, você utiliza o decorator @NgModule. Esse decorator possui algumas propriedades importantes, como declarations, imports e exports.

A seguir, você tem um exemplo de código que exemplifica um módulo no Angular:

import { NgModule } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { CardComponent } from "./card/card.component";
import { FooterComponent } from "./footer/footer.component";
import { ButtonComponent } from "./button/button.component";
import { FormComponent } from "./form/form.component";

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    FooterComponent,
    ButtonComponent
  ],
  imports: [
    FormComponent
  ],
  exports: [
    HeaderComponent,
    CardComponent,
    FooterComponent,
    FormComponent
  ]
})
export class SharedModule { }
COPIAR CÓDIGO
Selecione a alternativa que contém a função da propriedade imports no @NgModule

Selecione uma alternativa


Alternativa correta
A propriedade imports define quais componentes serão utilizados no módulo.
 
Alternativa correta
A propriedade imports define quais dependências externas serão importadas pelo módulo.
 
A propriedade imports é usada para importar outros módulos que são necessários para o funcionamento correto do módulo atual.
Alternativa correta
A propriedade imports define quais componentes serão exportados pelo módulo.
 
Alternativa correta
A propriedade imports define quais serviços serão injetados no módulo.

@@08
Criando e usando o MaterialModule

No vídeo passado, criamos um módulo para os componentes compartilhados da aplicação. Porém, apareceu um erro no console. Para entender o motivo deste erro, vamos olhar para o que fizemos.
Criando e usando o MaterialModule
Nós criamos um novo módulo e removemos do app.module.ts todos aqueles componentes que agora estão no módulo shared.module.ts. Para o AppModule funcionar corretamente, ele precisa ter acesso a todos esses componentes novamente. Deste modo, vamos importar o SharedModule dentro do AppModule.

A importação será realizada na linha 71, a fim de facilitar a visualização. O VS Code será bastante útil neste momento, pois nos ajuda completando o código. Então, basta digitar SharedModule e em seguida adicionar uma vírgula.

app.module.ts:
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    // código omitido
COPIAR CÓDIGO
Em vez de declarar todos aqueles componentes novamente, ao importar o SharedModule, todos os componentes estarão disponíveis para o AppModule.

Agora, se executarmos nosso programa, ainda teremos o erro. Existem várias falhas, mas vamos focar em uma específica. Por algum motivo, o Angular não está conseguindo encontrar o mat-card-content, afirmando não ser um elemento conhecido.

A razão deste problema é a utilização da biblioteca Angular Material. Esta é usada em todos os componentes, inclusive naqueles presentes no SharedModule. Recordando: na propriedade imports, precisamos adicionar tudo o que o módulo necessita para funcionar. O momento atual caracteriza-se por uma falha no SharedModule, dado que ele não possui os módulos do Angular Material.

Assim, vamos criar um módulo para colocar os componentes do Angular Material. Isso também removerá a responsabilidade do AppModule de importar todos esses módulos de Material.

Como o Angular Material está sendo utilizado em toda a aplicação, vamos criar o módulo na pasta "core". Basta clicar com o botão direito e selecionar "New Folder…". Chamaremos a pasta de "material" e dentro dela vamos criar um novo arquivo chamado material.module.ts.

Vamos dar sequência ao mesmo passo a passo. Na primeira linha, colocamos o decorator @NgModule, abrimos parênteses, e em seguida abrimos chaves. Na linha 4, exportamos a classe através do comando export class MaterialModule { }.

material.module.ts:
@NgModule({

})
export class MaterialModule {}
COPIAR CÓDIGO
Vamos pensar juntos: esse módulo do Angular Material é um módulo de uma biblioteca externa; não declaramos ou importamos nada nele. Utilizamos apenas os módulos que o Angular Material disponibiliza para nós. Portanto, no caso específico deste módulo, ele não possuirá declarations, nem imports, apenas a propriedade exports.

Precisamos importar o @NgModule. Feito isso, vamos ao arquivo app.module.ts, removeremos os módulos relacionados ao Angular Material, e colaremos no material.module.ts. Após adicioná-los, faremos as importações necessárias.

import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSliderModule
  ]
})
export class MaterialModule {}
COPIAR CÓDIGO
Esse módulo é diferente dos outros, porque sua única função é exportar esses módulos para outros módulos da aplicação. É um pouco diferente por ser um módulo de uma biblioteca externa, e não possuir componentes do Angular Material para inserir na propriedade declarations.

Agora, no arquivo shared.module.ts, vamos adicionar o MaterialModule aos imports e fazer a importação.

shared.module.ts:
  imports: [
    CommonModule,
    MaterialModule
  ],
COPIAR CÓDIGO
Com isso, temos que corrigir o AppModule, removendo os espaços dos itens que removemos.

Agora, vamos abrir o terminal para verificar se funcionou ou se gerou algum erro. Durante o processo de refatoração, é usual ocorrerem erros, pois estamos alterando a estrutura do código.

Em determinado momento, ocorreu um erro no modal, indicando que não foi possível encontrar o formControl. Isso aconteceu pois o modal (ModalComponent) foi importado no SharedModule, na linha 18.

Esse é um ponto importante: na aplicação, usamos os formulários reativos, e para isso, é necessário um módulo do Angular. Se analisarmos o AppModule, na linha 73, encontramos a importação do ReactiveFormsModule. Vamos copiar isso e incluir nos imports do SharedModule, pois estes módulos agora são independentes. Portanto, precisamos adicionar ao SharedModule tudo que ele necessita para funcionar.

  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
COPIAR CÓDIGO
Após adicionar o ReactiveFormsModule, verificamos e o erro sumiu. Mesmo assim, ainda precisamos fazer algumas correções. No SharedModule, já temos o MaterialModule e o módulo de formulários reativos que eram necessários. Agora, no AppModule, precisamos, da mesma forma que fizemos com o SharedModule, importar o MaterialModule.

app.module.ts:
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
COPIAR CÓDIGO
Ao abrir o terminal novamente, temos a compilação realizada com sucesso. Precisaríamos fazer este passo a passo, de verificar e lembrar o que o módulo precisa para funcionar, enquanto adicionamos aos imports. Embora seja um desafio, é aconselhável fazer isso.

Conclusão
Agora que criamos o SharedModule, o MaterialModule, e a aplicação funciona conforme esperado, na próxima aula, continuaremos modularizando a aplicação!

@@09
O que aprendemos?

Nessa aula, você aprendeu como:
Organizar a aplicação para aplicar a arquitetura modular do angular;
Estruturar um novo módulo;
Criar novos módulos na aplicação;
Refatorar o módulo raiz.