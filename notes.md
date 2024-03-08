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
ng g m autenticacao
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

#### 06/03/2024

@02-Aplicando a modularização

@@01
Projeto da aula anterior

Caso queira revisar o código até aqui ou começar a partir desse ponto, disponibilizamos os códigos realizados na aula anterior, para baixá-lo clique nesse link ou veja nosso repositório do Github.

https://github.com/alura-cursos/3413-jornada-milhas/archive/refs/heads/aula-1.zip

https://github.com/alura-cursos/3413-jornada-milhas/tree/aula-1

@@02
Módulo home

Vamos continuar a modularizar a aplicação. A ideia é criar um módulo para a tela inicial, a Home.
Criando um Módulo para a Home
Vamos abrir o navegador, na página em que a aplicação está em execução. Queremos criar um módulo para conter os componentes de promoções e depoimentos que são exclusivos da Home.

A parte do formulário de passagens é compartilhada entre a tela inicial e a tela de busca, então, por enquanto, se encontra no módulo shared. Vamos retornar ao explorador lateral do VS Code para criar esse novo módulo.

A Home está dentro das pastas "pages" e "app". A forma de organização que estávamos utilizando, por páginas, não fará mais sentido, porque agora estamos organizando por funcionalidades. Na verdade, vamos excluir a pasta "pages" mais adiante.

Clicaremos com o botão direito na pasta "home", selecionando "New File" (Novo Arquivo) e vamos criar um módulo que se chamará home.module.ts. Em seu interior, vamos criar a estrutura desse módulo com @ngModule(). Entre os seus parênteses, adicionaremos um par de chaves.

Abaixo desse @ngModule({}), vamos exportar essa nova classe com export class HomeModule e um par de chaves. Por fim, entre as chaves do HomeModule @ngModule({}), vamos utilizar a propriedade declarations com dois pontos e um bloco de colchetes.

@ngModule({
    declarations: [
    
    ]
})
export class HomeModule { }
COPIAR CÓDIGO
Acessando o explorador lateral, veremos os três componentes a serem declarados nesse módulo: "depoimentos", "promocoes" e "home". Vamos declará-los como PromocoesComponent, DepoimentosComponent e HomeComponent, todos com iniciais maiúsculas. Ao digitar os nomes dos componentes, utilizaremos as sugestões do VS Code para importar cada um deles.

import { DepoimentosComponent } from "./depoimentos/depoimentos.component";
import { HomeComponent } from "./home.component";
import { PromocoesComponent } from "./promocoes/promocoes.component";

@ngModule({
    declarations: [
        PromocoesComponent,
        DepoimentosComponent,
        HomeComponent
    ]
})
export class HomeModule {
}
COPIAR CÓDIGO
Na sequência, vamos importar o ngModule para corrigir o erro na linha @ngModule({. Abaixo dos colchetes de declarations, vamos adicionar os imports que precisamos:

O CommonModule, para ter acesso às diretivas do Angular;
O MaterialModule, utilizado em toda a aplicação;
O SharedModule.
Por enquanto, esses três módulos. Também utilizaremos as sugestões do VS Code para importar cada um deles.

import { DepoimentosComponent } from "./depoimentos/depoimentos.component";
import { HomeComponent } from "./home.component";
import { PromocoesComponent } from "./promocoes/promocoes.component";

@ngModule({
    declarations: [
        PromocoesComponent,
        DepoimentosComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
    ]
})
export class HomeModule {
}
COPIAR CÓDIGO
Abaixo dos colchetes de imports, vamos exportar esses componentes em um bloco exports para que todos os módulos que importarem o módulo da Home tenham acesso a eles. Vamos copiar as linhas PromocoesComponent, DepoimentosComponent e HomeComponent, adicionando-as entre os colchetes dos imports.

@ngModule({
    declarations: [
        HomeComponent,
        PromoçõesComponent,
        DepoimentosComponent,
    ],
    imports:  [
        CommonModule,
        MaterialModule,
        SharedModule,
    ],
    exports: [
        HomeComponent,
        PromoçõesComponent,
        DepoimentosComponent
    ]
})
export class HomeModule {
}
COPIAR CÓDIGO
O módulo está pronto.Agora podemos organizar o appModule. Vamos acessar o appModule.ts por meio do explorador lateral e remover das declarations o HomeComponent, PromocoesComponent e DepoimentosComponent.

Ao apagar as declarations, deixamos os imports no início do arquivo. Esses itens que não estão sendo usados vão aparecer com uma cor mais escura na tela. Sendo assim, vamos excluir todos os import que não estamos mais utilizando.

O resultado completo pode ser visto abaixo.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
import { BuscaComponent } from './pages/busca/busca.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './core/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    PerfilComponent,
    BuscaComponent
  ],
  // Código omitido
})
export class AppModule { }
COPIAR CÓDIGO
Percebe-se que o appModule vai diminuindo as suas responsabilidades à medida que o processo avança. Já que estamos falando de boas práticas, podemos melhorar ainda mais essa organização.

Uma boa prática no Angular é organizar esses imports da seguinte forma: primeiro, mantemos os imports que vêm do próprio Angular, como o ngModule e o browserModule. Em seguida, deixamos uma linha vazia e, depois, incluímos os imports que pertencem a componentes da própria aplicação.

Vamos recortar a linha import { ReactiveFormsModule } from '@angular/forms'; e colá-la abaixo do BrowserModule. Outro que é do Angular é a linha import { BrowserAnimationsModule } from '@angular/platform-browser/animations';, vamos recortá-la e colá-la abaixo da outra que colamos. Agora, esses quatro primeiros imports são do Angular, abaixo dos quais deixamos uma linha vazia entre eles e os outros imports.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
import { BuscaComponent } from './pages/busca/busca.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './core/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    PerfilComponent,
    BuscaComponent
  ],
  // Código omitido
})
export class AppModule { }
COPIAR CÓDIGO
Podemos fazer o mesmo no arquivo shared.module.ts da pasta "shared", organizando seus imports do Angular primeiro. Vamos acessá-lo para recortar as linhas abaixo e colá-las a partir da linha 2.

import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
Com isso, os imports do shareModule também estão organizados.

import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

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
import { MaterialModule } from "../core/material/material.module";
COPIAR CÓDIGO
Podemos fechar esse arquivo e voltar ao app.module.ts. Em seu interior, vamos importar o novo módulo. Dentro do arranjo imports, abaixo de MaterialModule, vamos digitar homeModule.

@NgModule({
  // Código omitido
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    HomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  // Código omitido
})
export class AppModule { }
COPIAR CÓDIGO
Podemos conferir se tudo continua funcionando. Vamos voltar ao navegador, recarregar a aplicação e verificar que continua funcionando. Agora, a Home possui um módulo próprio.

@@03
Modularizando uma biblioteca

Imagine que você está trabalhando em um projeto de uma biblioteca virtual de literatura clássica usando Angular, e quer modularizar a aplicação. Para isso, você precisa usar a estrutura do @ngModule para criar módulos de funcionalidade.
Selecione a alternativa que contém a melhor forma de você iniciar a modularização da aplicação.

Usar um @ngModule para categorizar os livros por gênero, por exemplo, um módulo para literatura clássica, outro para ficção científica e assim por diante.
 
Categorizar os livros por gênero é uma abordagem mais eficaz e organizada. Isso permite que você crie um módulo para cada gênero literário, tornando a aplicação mais modular e fácil de manter e atualizar.
Alternativa correta
Usar um @ngModule para cada livro da literatura clássica.
 
Alternativa correta
Criar um único @ngModule para todas as funcionalidades da biblioteca.
 
Mesmo que um único @ngModule possa teoricamente gerenciar todas as funcionalidades, é uma prática melhor e mais organizada criar módulos distintos para funções ou recursos específicos.

@@04
Módulo de autenticação

Continuando o processo de organização do nosso projeto, vamos criar um módulo muito importante: o módulo de autenticação. Nele, pretendemos reunir todos os elementos, componentes, serviços e tudo que compõe a funcionalidade de autenticação.
Criando o Módulo de Autenticação
Já criamos bastante de forma manual, contudo, agora vamos criar com a ajuda do CLI.

Para abrir o terminal do VS Code, digitaremos "Ctrl+J" e em seguida "Ctrl+C" para interromper a aplicação.

Para criar um módulo, digitaremos o seguinte comando no terminal, onde g corresponde a generate e m a module:

A seguir, vamos passar o nome do módulo, que, no nosso caso, será "autenticação", sem cedilha e sem til.

ng g m autenticacao
COPIAR CÓDIGO
Ao pressionar "Enter", fecharemos o terminal. No explorador lateral, notaremos que dentro da pasta "app" foi criado o módulo Autenticacao, que consiste em uma pasta chamada "autenticacao" e, dentro dessa pasta, o arquivo autenticacao.module.ts. Vamos acessá-lo e fechar a aba do arquivo home.modute.ts.

Dentro do autenticacao.module, a CLI já traz a estrutura inicial, importando o NgModule e o CommonModule e já inclui o Decorator com o arranjo declarations vazio e o CommonModule entre colchetes do imports.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class AutenticacaoModule { }
COPIAR CÓDIGO
Para declarar os componentes que comporão esse módulo de autenticação, vamos acessar o explorador novamente, selecionar os componentes "cadastro", "login" e "perfil" que estão dentro da pasta "pages", um de cada vez, e arrastá-los para a pasta "autenticacao".

Para cada movimentação de pastas, será exibida uma janela de diálogo perguntando se temos certeza que queremos mover esses arquivos. Basta clicar em "Move" (mover).

Dentro do módulo de autenticação, temos o arquivo do módulo e os três componentes.

autenticacao
cadastro
login
perfil
autenticacao.module.ts
Esses três componentes serão adicionados entre os colchetes das declarations, um abaixo do outro, na ordem abaixo:

CadastroComponent;
LoginComponent e
PerfilComponent.
Entre os colchetes de imports, abaixo do CommonModule, adicionaremos o ShareModule e na linha 16, o MaterialModule. Abaixo dos imports, criaremos o arranjo de exports e em snós interior, exportaremos os três componentes, copiando-os no arranjo declarations e colando-os entre os colchetes.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CadastroComponent,
        LoginComponent,
        PerfilComponent
    ],
    imports: [
        CommonModule
        CadastroComponent,
        LoginComponent,
        PerfilComponent
    ]
})
export class AutenticacaoModule { }
COPIAR CÓDIGO
Como a ideia do módulo é ser independente e conter tudo que está relacionado à autenticação, moveremos também os serviços que estão relacionados a essa funcionalidade.

Acessando o explorador, dentro da pasta "core", temos a pasta "services" que contém todos os serviços da aplicação. Podemos dividi-los entre os módulos.

Inclusive, existem dois arquivos de teste dentro dessa pasta: companhia.service.spec.ts e passagens.service.spec.ts. Entretanto, como estamos padronizando para não deixar esses arquivos, pois não utilizamos testes nesse projeto ainda, vamos excluí-los.

Clicaremos com o botão direito na pasta "autenticacao", selecionaremos "New Folder" (novo arquivo) e criaremos uma pasta chamada "services". Moveremos os arquivos dos quatro serviços que dizem respeito à autenticação — autenticacao.service, token.service, user.service e cadastro.service — para dentro dessa pasta.

No módulo criado anteriormente, o "home", criaremos outra pasta chamada "services" e movemos os serviços promocao.service e depoimento.service para dentro dela.

Na pasta "services" original, sobraram alguns serviços que distribuiremos posteriormente.

O nosso módulo de autenticação já está pronto. Temos os componentes e os serviços. Vamos ver pelo explorador o que mais faz sentido trazer para esse módulo de autenticação.

Dentro da pasta "core", temos uma pasta chamada "guards", que contém o guarda de rotas do perfil: auth.guard.ts. Além disso, dentro da pasta "interceptors", abaixo de "guards", temos o interceptor de autenticação autenticacao.interceptor.ts. Como, por enquanto, só temos um guarda de rotas e um interceptor, vamos movê-los para o módulo de autenticação.

Deste modo, os diretórios "guards" e "interceptors" ficaram vazios, por isso, vamos deletá-los.

Agora, nosso módulo de autenticação está completo, com os componentes, serviços, interceptor e guarda de rotas. Tudo que faz parte desse módulo está dentro dele.

Agora, precisamos organizar o app module. Vamos acessar o arquivo app.module.ts e remover os componentes que declaramos no outro módulo. Lembrando que os componentes não podem estar declarados em dois módulos ao mesmo tempo.

Para isso, vamos deletar as linhas LoginComponent, CadastroComponent e PerfilComponent dentro de declarations, que são as declarações dos componentes de "login", "cadastro" e "perfil". Depois, vamos adicionar o novo módulo de autenticação no arranjo imports, abaixo de HomeModule. Ele será importado no topo do arquivo, abaixo das outras importações.

Também podemos excluir as importações de LoginComponent, CadastroComponent e PerfilComponent, porque não precisamos mais delas. Por fim, vamos mover a linha import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http', que é o import do Angular, para a linha 5, abaixo de BrowserAnimationsModule.

O resultado pode ser visto abaixo.

Corpo do código:
@NgModule({
  declarations: [
    AppComponent,
    BuscaComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        MaterialModule,
        HomeModule,
        AutenticacaoModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule
  ],
  // Código omitido
})
export class AppModule { }
COPIAR CÓDIGO
Seção de importações:
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacaoInterceptor } from './autenticacao/autenticacao.interceptor';
import { BuscaComponent } from './pages/busca/busca.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './core/material/material.module';
import { HomeModule } from './home/home.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
COPIAR CÓDIGO
Prontinho. Com isso, o AppModule está se tornando muito mais enxuto e com menos responsabilidades.

Dentro do diretório "pages", temos somente os diretórios "busca" e "home", mas não queremos mais o diretório "pages". Por isso, vamos mover a pasta "home", arrastando-a para dentro da pasta "app".

Considerando que "home" possui muitas subpastas, o VS Code pode travar ao realizar essa movimentação. Caso não seja possível arrastar, podemos clicar na pasta "home", copiá-la com "Ctrl+C", e clicando no diretório "app", colar com "Ctrl+V". Com isso, "app" já estará com o módulo "home".

Precisamos excluir todas as subpastas que ficaram dentro da "home" original, inclusive ela mesma. Para isso, vamos clicar com o botão direito em cada uma das pastas e selecionar "Delete".Em seguida, clicaremos na própria pasta "home" e pressionaremos "Delete". Pronto.

Fizemos a deleção por etapas porque às vezes, quando nós tentamos deletar um diretório que tem várias subpastas de uma vez, o VS Code pode travar.

Após esse processo, pode aparecer algum erro, porque, às vezes, a CLI não encontra mais o caminho anterior, aonde estava o módulo. Então, dentro do arquivo app.module.ts, importaremos novamente o HomeModule, que não está mais dentro da pasta pages original. Para isso excluiremos a linha import { HomeModule } from './pages/home/home.module e importaremos esse HomeModule de novo.

Para importar novamente, acessaremos a linha HomeModule dentro do arranjo imports clicaremos na lâmpada azul à sua esquerda e selecionaremos "Add import from "./home/home.module"" para importar do local correto.

O código de importação abaixo será gerado na última linha da lista de importações.

import { HomeModule } from './home/home.module';
COPIAR CÓDIGO
Voltaremos ao explorador lateral esquerdo e vemos que só restou o componente de busca dentro do diretório "pages". Se acessarmos o app.module.ts, nas declarations, só temos o AppComponent, o componente principal, e esse BuscaComponent.

A busca é uma funcionalidade central em nossa aplicação. Portanto, criaremos um módulo para busca, para que possamos remover o seu import e essa responsabilidade do AppModule.

Além do componente de busca, é importante adicionar também os componentes de filtro abaixo, que estão dentro do caminho de pastas "shared > filtros-complementares":

filtros-complementares
companhias
labels
paradas
preços
Eles farão parte desse módulo de busca, junto a alguns services.

Vamos deixar essa tarefa para você praticar. Nós já criamos vários módulos, já sabemos como organizar a aplicação, então, vai ficar para você a tarefa de criar esse novo módulo, o módulo de busca, e depois excluir essa pasta pages.

Caso tenha alguma dúvida, haverá uma atividade nesta aula, com todo o passo a passo que será necessário para fazer isso.

@@05
Mão na massa: criando o módulo de busca

Agora é a sua vez de praticar utilizando os passos que vimos no curso. O objetivo é criar um módulo para a funcionalidade de busca. Neste módulo, serão agrupados todos os componentes e serviços relacionados a ela.

Para criar o módulo de busca, siga os passos a seguir:
Clique com o botão direito dentro da pasta busca e selecione a opção New File (Novo arquivo);
Nomeie o arquivo de acordo com a convenção: busca.module.ts;
Mova os componentes CompanhiasComponent, LabelComponent, ParadasComponent, PrecosComponent, FiltrosComplementaresComponent, PassagemDestaqueComponent e PassagemComponent da pasta shared para a pasta busca, removendo também esses componentes do array de declarations do arquivo shared.module.ts;
Crie uma pasta services e mova para ela os serviços companhia.service.ts e passagens.service.ts, que estavam na pasta services dentro da pasta core.
Após essas mudanças, a estrutura de pastas ficará conforme imagem a seguir:

Estrutura de pastas de um projeto angular, mostrando os componentes e serviços que compõem o módulo de busca.

Esse arquivo terá a seguinte estrutura final:

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { CompanhiasComponent } from "./filtros-complementares/companhias/companhias.component";
import { LabelComponent } from "./filtros-complementares/label/label.component";
import { ParadasComponent } from "./filtros-complementares/paradas/paradas.component";
import { PrecosComponent } from "./filtros-complementares/precos/precos.component";
import { MaterialModule } from "../core/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { FiltrosComplementaresComponent } from "./filtros-complementares/filtros-complementares.component";
import { PassagemDestaqueComponent } from "./passagem-destaque/passagem-destaque.component";
import { PassagemComponent } from "./passagem/passagem.component";
import { BuscaComponent } from "./busca.component";

@NgModule({
  declarations: [
    BuscaComponent,
    ParadasComponent,
    CompanhiasComponent,
    PrecosComponent,
    LabelComponent,
    FiltrosComplementaresComponent,
    PassagemComponent,
    PassagemDestaqueComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    BuscaComponent,
    ParadasComponent,
    CompanhiasComponent,
    PrecosComponent,
    LabelComponent,
    FiltrosComplementaresComponent,
    PassagemComponent,
    PassagemDestaqueComponent
  ]
})
export class BuscaModule { }

@@06
Gerenciando dependências em módulos Angular

Você está trabalhando em um projeto Angular que possui vários módulos e deseja garantir que as dependências entre esses módulos sejam gerenciadas de forma eficaz. Você está revisando o código e a configuração dos módulos para entender como as dependências estão sendo resolvidas.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DependencyComponent } from './dependency.component';

@NgModule({
  declarations: [DependencyComponent],
  imports: [CommonModule, SharedModule],
  exports: [DependencyComponent],
})
export class DependencyModule {}
COPIAR CÓDIGO
No código de exemplo acima, qual é o propósito da importação SharedModule e como ela afeta o módulo DependencyModule?

Selecione uma alternativa

O SharedModule é um módulo de funcionalidade que encapsula recursos específicos do DependencyModule. Isso ajuda na organização e reutilização de código.
 
O SharedModule é usado para compartilhar recursos entre vários módulos, não para encapsular recursos específicos do DependencyModule.
Alternativa correta
O SharedModule é um módulo raiz que deve ser importado em todos os módulos Angular. Ele não tem relação direta com o DependencyModule.
 
Alternativa correta
O SharedModule é responsável por importar componentes e diretivas compartilhados entre vários módulos. Isso permite que os recursos compartilhados sejam usados no DependencyModule.
 
O SharedModule é usado para importar componentes e diretivas compartilhados, permitindo o uso desses recursos no DependencyModule.

@@07
Módulo raiz vs. Módulo de funcionalidade

Você está iniciando um novo projeto Angular e está planejando a estrutura do seu aplicativo. Você está se perguntando se deve criar um módulo raiz (root module) ou um módulo de funcionalidade (feature module) como ponto de entrada da sua aplicação.
// Exemplo de módulo raiz (app.module.ts)
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Outros módulos de funcionalidade importados aqui
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
COPIAR CÓDIGO
Qual é a diferença fundamental entre um módulo raiz (root module) e um módulo de funcionalidade (feature module) em Angular?

Selecione uma alternativa

Um módulo raiz é usado como ponto de entrada principal da aplicação e normalmente importa módulos de funcionalidade. Um módulo de funcionalidade encapsula recursos relacionados a uma funcionalidade específica da aplicação.
 
Um módulo raiz desempenha um papel crucial no início da aplicação, funcionando como a espinha dorsal que conecta e coordena os diversos módulos de funcionalidade. Em contraste, um módulo de funcionalidade é projetado para agrupar e organizar recursos que são específicos para uma determinada parte ou recurso da aplicação.
Alternativa correta
Um módulo raiz é usado para encapsular recursos relacionados a uma funcionalidade específica da aplicação, enquanto um módulo de funcionalidade é usado como ponto de entrada principal da aplicação.
 
Alternativa correta
Um módulo raiz é usado para encapsular recursos relacionados a uma funcionalidade específica da aplicação, enquanto um módulo de funcionalidade é usado apenas para carregar serviços.

@@08
O que aprendemos?

Nessa aula, você aprendeu como:
Diferenciar o módulo raiz dos módulos de funcionalidade;
Agrupar componentes e services relacionados no mesmo módulo;
Importar módulos necessários para o funcionamento do featureModule.

#### 07/03/2024

@03-Roteamento e Lazy Loading

@@01
Projeto da aula anterior

Caso queira revisar o código até aqui ou começar a partir desse ponto, disponibilizamos os códigos realizados na aula anterior, para baixá-lo clique nesse link ou veja nosso repositório do Github.

https://github.com/alura-cursos/3413-jornada-milhas/archive/refs/heads/aula-2.zip

https://github.com/alura-cursos/3413-jornada-milhas/tree/aula-2

@@02
Criando módulos de rotas

Na aula passada, nós organizamos a aplicação e criamos diversos módulos de busca e de autenticação. Contudo, quando clicamos em "Cadastre-se" ou "Login" na aplicação no navegador, o redirecionamento não está ocorrendo. Nesta aula, vamos começar a entender como funciona o roteamento quando estamos utilizando esta arquitetura modular do Angular.
Vamos, então, voltar ao VS Code.

A ideia de criar módulos é para que eles sejam isolados e fiquem independentes na aplicação. Sendo assim, o roteamento desses componentes pertencentes ao módulo também é de responsabilidade do módulo. É como diz aquela frase famosa: "com grandes poderes vêm grandes responsabilidades".

Da mesma forma que o app.module.ts, que é o módulo principal, tem seu arquivo de rotas, o app-routing-module.ts), cada módulo da aplicação também precisará ter seu próprio arquivo de rotas. É nisso que vamos nos concentrar agora.

Arquivo de rotas do módulo home
Para começar, vamos criar o arquivo de rotas do módulo home. Clicaremos com o botão direito na pasta home e selecionaremos "New File". Seguindo a convenção de nomenclatura, o nome será home-routing.module.ts.

Vamos verificar rapidamente o app-routing.module.ts, para podermos nos basear.

Nesse momento, a instrutora notou haver um import quebrado na linha 3 desse arquivo, de HomeComponent, que precisamos ajustar. Podemos fazer isso apagando o import e importando HomeComponent da linha 12 novamente.
Esse arquivo de rotas vai conter uma constante chamada routes onde estarão localizados todos os caminhos (paths) e os componentes (components) que são renderizados quando esse caminho é acessado.

Além disso, temos também um decorator @NgModule com os imports e os exports. Ele está importando o módulo do próprio Angular, o RouterModule, e utilizando o método forRoot() para conseguir renderizar essas rotas, que é justamente essa constante declarada na linha 10.

Vamos criar uma estrutura parecida com essa no home-routing.module.ts.

Começaremos decorando essa classe com o @NgModule na linha 1. Entre os parênteses e chaves, adicionaremos os imports e os exports, que serão arrays vazios por enquanto.

Em seguida, vamos exportar a classe na linha 5: export class HomeRoutingModule. Também precisamos importar o NgModule.

home-routing.module.ts
import { NgModule } from "@angular/core";

@NgModule({
  imports: [],
  exports:[]
})
export class HomeRoutingModule { }
COPIAR CÓDIGO
Vamos criar uma constante que vai representar as rotas desse módulo, chamada routes. As rotas serão específicas de módulo e não influenciarão nas rotas globais da aplicação.

Então, digitaremos na linha 3 const routes, do tipo Routes (que precisamos importar), que será um array que vai conter alguns objetos. Os objetos serão os caminhos da aplicação.

No caso do Home, vamos passar o path como sendo 'home', entre aspas simples, e quando esse caminho for acessado, o componente (component) que desejamos que seja renderizado é o HomeComponent (que também precisamos importar).

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];
@NgModule({
  imports: [],
  exports:[]
})
export class HomeRoutingModule { }
COPIAR CÓDIGO
No array de imports, vamos importar o RouterModule seguido de um método de rotas.

Uma diferença importante é que no app-routing, nós estamos utilizando o método forRoot, porque ele é o arquivo de rotas principal. Nos arquivos de rotas dos módulos secundários de funcionalidade, nós vamos utilizar o método forChild, passando as rotas, routes. Nesse caso, serão carregadas as rotas dos módulos de funcionalidade.

Ou seja: forChild é utilizado para esse tipo de módulos, e o forRoot é utilizado apenas uma vez, no módulo principal.
Por fim, exportaremos o RouterModule. Nosso arquivo de rotas Home-routing.module.ts já está pronto!

import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class HomeRoutingModule { }
COPIAR CÓDIGO
Importando o arquivo de rotas de home
Agora, precisamos importar esse arquivo no home.module.ts. Nesse arquivo, na parte de imports, na linha 19, vamos importar o HomeRoutingModule, que é o arquivo que acabamos de criar.

home.module.ts
imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    HomeRoutingModule
],
COPIAR CÓDIGO
Agora que criamos o módulo de rotas e o importamos no módulo Home, nosso próximo passo é fazer um ajuste no módulo de rotas principal.

@@03
Roteamento de módulos de funcionalidade

Você está desenvolvendo uma aplicação Angular que possui vários módulos de funcionalidade e deseja configurar o roteamento para navegar entre esses módulos. Você está revisando o código de roteamento e precisa entender como configurar o roteamento para um módulo de funcionalidade específico.
// Exemplo de configuração de roteamento em um módulo de funcionalidade
const routes: Routes = [
  {
    path: 'funcionalidade',
    component: FuncionalidadeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionalidadeRoutingModule {}
COPIAR CÓDIGO
No código de exemplo acima, qual é a finalidade do módulo FuncionalidadeRoutingModule e como ele está configurando o roteamento para o módulo de funcionalidade?

O FuncionalidadeRoutingModule não é necessário para configurar o roteamento em Angular. O roteamento é configurado automaticamente pelo Angular.
 
Alternativa correta
O FuncionalidadeRoutingModule é usado para configurar o roteamento do módulo raiz. Ele define uma rota com o caminho 'funcionalidade' que carrega o componente FuncionalidadeComponent em todo o aplicativo.
 
Alternativa correta
O FuncionalidadeRoutingModule é responsável por configurar o roteamento do módulo de funcionalidade. Ele define uma rota com o caminho 'funcionalidade' que carrega o componente FuncionalidadeComponent quando a rota é correspondida.
 
O FuncionalidadeRoutingModule configura o roteamento do módulo de funcionalidade, definindo uma rota com o caminho 'funcionalidade' que carrega o FuncionalidadeComponent quando a rota é correspondida.
Alternativa correta
O FuncionalidadeRoutingModule é usado apenas para configurar o roteamento interno dentro do módulo de funcionalidade. Ele não afeta o roteamento global da aplicação.

@@04
Organizando o AppRoutingModule

Já criamos o arquivo de rotas específico para o módulo Home (HomeRoutingModule). Perceba que, quando acessamos a aplicação com localhost:4200/home, a tela inicial é carregada, e o mesmo acontece ao acessarmos apenas localhost:4200. Não precisamos desse roteamento duplicado.
Simplificando o roteamento com a propriedade pathMatch
No VS Code, podemos observar que o app-routing.module está importando diretamente o HomeComponent. Contudo, assim como o app.module - o módulo principal da aplicação - não precisa importar diretamente os componentes, o app-routing.module também não precisa dessa importação direta. Ele pode acessar as rotas desse componente através dos módulos.

Por conta disso, vamos fazer uma modificação. Como já temos no home-routing-module esse caminho para home, no app-routing.module, em vez de importar o HomeComponent na linha 13, podemos utilizar a propriedade redirectTo. Portanto, quando for acessada uma rota vazia (localhost:4200), o redirectTo vai redirecionar para /home.

app-routing.module.ts
const routes: Routes = [
  {
    path: ' ',
    redirectTo: '/home',
  },
// código omitido
COPIAR CÓDIGO
Ao retornar para a aplicação, percebemos que nada funciona. Então, ao inspecionar a página e abrir o console do navegador, observamos um erro que indica uma configuração de rotas inválida. Passamos o path vazio e a propriedade redirectTo para /home, mas ainda precisamos fornecer a propriedade pathMatch.

No VS Code, adicionaremos essa propriedade na linha 14 do arquivo app-routing.module, que possui dois valores: full (completo) e prefix (prefixo). No nosso caso, queremos utilizar o valor full.

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
// código omitido
COPIAR CÓDIGO
Isso significa que o roteador do Angular tentará fazer um match da URL.

Se a propriedade for prefix, ele não verificará a URL completa, logo, na primeira URL que coincidir com localhost:4200, o roteador presumirá que é uma rota (path) vazia, pois não verificará o restante da URL. Passando a propriedade full, ele verificará a URL completa, e redirecionará para home somente se a URL for exatamente localhost:4200, sem nada depois disso.

Vamos retornar à aplicação no navegador para testar, fechando o console e recarregando a página. Quando digitamos a URL localhost:4200, somos redirecionados para localhost:4200/home.

Com essa mudança, tudo está funcionando corretamente. Inclusive, podemos apagar a linha 8 do app-routing.module.ts, pois já não estamos importando diretamente o componente HomeComponent.

No próximo vídeo, vamos falar sobre uma dica valiosa para otimizar nossa aplicação.

@@05
Diferenças entre forRoot e forChild em Angular

Você está configurando o roteamento em um aplicativo Angular que usa módulos de funcionalidade e está explorando a utilização dos métodos forRoot e forChild no arquivo de roteamento e deseja entender as diferenças entre esses dois métodos.
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
COPIAR CÓDIGO
@NgModule({
  imports: [RouterModule.forChild(funcionalidadeRoutes)],
  exports: [RouterModule],
})
export class FuncionalidadeRoutingModule {}
COPIAR CÓDIGO
Assinale a alternativa que contém a principal diferença entre os métodos forRoot e forChild ao configurar o roteamento em Angular.

Selecione uma alternativa

O método forRoot é usado para configurar o roteamento no módulo raiz e só deve ser chamado uma vez, enquanto o método forChild é usado para configurar o roteamento em módulos de funcionalidade e pode ser chamado várias vezes para diferentes módulos.
 
forRoot é usado no módulo raiz para configurar o roteamento global, e deve ser chamado apenas uma vez. forChild é usado em módulos de funcionalidade e pode ser chamado várias vezes para adicionar rotas adicionais.
Alternativa correta
O método forRoot é usado para configurar o roteamento em módulos de funcionalidade, enquanto o método forChild é usado para configurar o roteamento no módulo raiz.
 
Alternativa correta
Não há diferença significativa entre forRoot e forChild. Ambos os métodos podem ser usados de forma intercambiável para configurar o roteamento em qualquer módulo.
 
Alternativa correta
O método forRoot é usado para ativar o roteamento lazy loading, enquanto o método forChild é usado para carregar módulos de funcionalidade.

@@06
Entendendo o Lazy Loading

Agora, vamos criar um módulo de rotas para o módulo de autenticação.
Arquivo de rotas para o módulo autenticacao
No menu lateral esquerdo, vamos clicar com o botão direito em autenticacao, escolher "New File" e nomear esse novo arquivo como autenticacao-routing.module.ts.

Aproveitando que o arquivo de rotas da Home está aberto, utilizaremos "Ctrl + A" e "Ctrl + C" para copiar e colar o código na autenticação, a fim de deixar o processo um pouco mais rápido.

Apagaremos o import de HomeComponent na linha 3, e também apagar as linhas 5 a 8, que define o caminho como 'home' e o componente como HomeComponent. Também vamos mudar o nome da classe exportada na linha 11 para AutenticacaoRoutingModule. Teremos:

autenticacao-routing.module.ts
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AutenticacaoRoutingModule { }
COPIAR CÓDIGO
Em seguida, traremos as rotas que estão no app-routing (de login, cadastro e perfil, os componentes que fazem parte do módulo de autenticação), e vamos levar para o arquivo de rotas específico.

Recortaremos as linhas 15 a 27 do arquivo app-routing.module.ts, utilizando "Ctrl-X", e vamos colar na linha 5 de autenticacao-routing.module.ts. Faremos os imports dos três componentes e organizá-los, deixando uma linha vazia na linha 3:

import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { authGuard } from "./auth.guard";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { LoginComponent } from "./login/login.component";
import { PerfilComponent } from "./perfil/perfil.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AutenticacaoRoutingModule { }
COPIAR CÓDIGO
Agora essas rotas não são mais responsabilidade do arquivo de rotas principal e sim do arquivo de rotas da autenticação.

Importando o arquivo de rotas de autenticacao
Vamos abrir o autenticacao.module.ts para importar o módulo de rotas nele. Então, na linha 22, dentro do array de imports, vamos importar o AutenticacaoRoutingModule.

autenticacao.module.ts
imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    AutenticacaoRoutingModule
],
COPIAR CÓDIGO
Vamos retornar à aplicação no navegador.

Clicando em "Cadastre-se" e em "Login", nada acontece ainda. Mas se digitarmos manualmente o caminho /login na URL, o componente aparece. O mesmo vale para o componente de cadastro.

Isso significa que precisamos, na verdade, corrigir o router link, que é quem está realizando esse redirecionamento. Vamos voltar no VS Code, e vamos fazer isso utilizando uma boa prática do Angular: o Lazy Loading.

Lazy Loading
Vamos entender essa boa prática com uma analogia. Imagine que você é um estudante em uma sala de aula, e você tem um armário nessa sala onde guarda todo o seu material. Cadernos, livros, régua, lápis, tinta, tudo o que você precisa.

Antes do início da aula, você pega todo o material e leva para a sua carteira, mesmo que você não vá precisar de tudo durante aquela aula. E por conta dessa correria e de levar tantas coisas, acaba demorando para deixar tudo pronto, de fato, para o início da aula.

Será que não seria mais eficaz levar só o material realmente necessário, e caso fosse preciso ter acesso a algum material adicional, carregar esse material sob demanda? É este o processo de Lazy Loading!

No Lazy Loading, vamos escolher alguns módulos da aplicação para serem carregados conforme a demanda. Ou seja, o pacote inicial não ficará tão grande, porque nem tudo será carregado no início.

Podemos utilizar essa boa prática, por exemplo, no módulo de autenticação. Isso porque uma pessoa, quando acessa a Jornada Milhas, pode fazer uma busca, mas nem sempre vai optar pelo cadastro ou login, e por vezes apenas fará uma busca, sem autenticação.

Então, esse módulo separado de autenticação não precisa ser carregado logo no início. Isso otimizará a aplicação e o carregamento inicial será mais rápido.

Então, vamos entender como implementar isso a seguir.

@@07
Implementando o Lazy Loading

Para implementar o Lazy Loading, vamos criar um novo objeto com uma rota no app-routing.module.ts. Na linha 11, abriremos chaves e criaremos um novo path para redirecionar para a nova rota.
Mas, antes disso, vamos abrir o terminal com "Ctrl + J" para observar algo. Quando a aplicação é carregada, o pacote inicial também é carregado e, no terminal, aparece o Initial Chunk Files, que seria o pacote inicial carregado quando a aplicação sobe. Quando implementarmos o Lazy Loading, isso mudará.

Na linha 12, criaremos um novo path. Entre aspas simples, passaremos 'auth', de autenticação.

Implementando o Lazy Loading
Agora, precisamos implementar a sintaxe do Lazy Loading. Para isso, acessaremos a documentação do Angular.

Na seção de Melhores Práticas ("Best Practices"), encontramos o Lazy Loading, com uma explicação e exemplo de sua sintaxe. Na constante de rotas, passa-se o path e utiliza-se uma função chamada loadChildren. Copiaremos esse exemplo e colaremos na linha 13.

Essa função não carregará o módulo diretamente, mas carregará a rota filha. Além disso, ela está utilizando o import do JavaScript para importar o módulo. Substituiremos items por autenticacao no caminho em import, que é o nome do nosso módulo. Dentro da pasta autenticacao, acessaremos autenticacao.module .

Esse import retornará uma promise e, quando essa promise for resolvida, o módulo será carregado. Passaremos então o AutenticacaoModule para cá também.

app-routing.module.ts
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
  },
// código omitido
COPIAR CÓDIGO
Feito isso, verificaremos agora se algo mudou no terminal, pressionando "Ctrl + J". O mesmo pacote inicial, Initial Chunk Files, continua sendo carregado.

E por que isso? Porque no app.module.ts, no array de imports, o módulo de autenticação está sendo carregado. Tudo que é carregado no app.module é inicializado e carregado por padrão desde o início. Por isso que o Lazy Loading não está funcionando, apesar de termos feito a sintaxe.

Removeremos, então a linha 26, que contém AutenticacaoModule, pois o módulo de autenticação não será carregado no app.module. E também removeremos a linha 13, que importa AutenticacaoModule.

Acessando o terminal novamente, vamos parar a aplicação com "Ctrl + C" e executar novamente com o ng serve para verificar se o pacote já foi carregado sob demanda.

Agora, sim! Temos no terminal o pacote inicial e logo abaixo dele temos os Lazy Chunk Files , que é justamente esse módulo que será carregado sob demanda, de forma preguiçosa. No nosso caso, é o autenticacao-module.

Isso significa que conseguimos implementar o Lazy Loading!

Agora, ao clicar em "Cadastre-se" ou "Login" na aplicação, ainda não funciona. Isso porque precisamos fazer um ajuste no routerLink.

Ajustando os links de roteamento
Vamos voltar ao VS Code e acessar o arquivo header.component.html. No routerLink da linha 11, adicionaremos o auth antes do /perfil. O mesmo na linha 17: auth/cadastro. Na linha 18, auth/login.

header.component.html
<ng-container *ngIf="user$ | async as pessoaUsuaria; else login">
    <a routerLink="auth/perfil">
        <img src="assets/icones/user.png" alt="Ícone da pessoa usuária">
    </a>
    <button mat-stroked-button color="primary" (click)="logout()">SAIR</button>
</ng-container>
<ng-template #login>
    <button routerLink="auth/cadastro" mat-raised-button color="primary">CADASTRE-SE</button>
    <button routerLink="auth/login" mat-stroked-button>LOGIN</button>
</ng-template>
COPIAR CÓDIGO
Agora, voltando na aplicação, quando clicamos em "Login" ou "Cadastre-se", a página é redirecionada para a página de formulário em questão, seja para login ou cadastro. Então, está tudo funcionando!

Mas há alguns outros lugares na aplicação onde também estamos utilizando esse roteamento. Isso ficará como prática para você modificar.

@@07
Implementando o Lazy Loading

Para implementar o Lazy Loading, vamos criar um novo objeto com uma rota no app-routing.module.ts. Na linha 11, abriremos chaves e criaremos um novo path para redirecionar para a nova rota.
Mas, antes disso, vamos abrir o terminal com "Ctrl + J" para observar algo. Quando a aplicação é carregada, o pacote inicial também é carregado e, no terminal, aparece o Initial Chunk Files, que seria o pacote inicial carregado quando a aplicação sobe. Quando implementarmos o Lazy Loading, isso mudará.

Na linha 12, criaremos um novo path. Entre aspas simples, passaremos 'auth', de autenticação.

Implementando o Lazy Loading
Agora, precisamos implementar a sintaxe do Lazy Loading. Para isso, acessaremos a documentação do Angular.

Na seção de Melhores Práticas ("Best Practices"), encontramos o Lazy Loading, com uma explicação e exemplo de sua sintaxe. Na constante de rotas, passa-se o path e utiliza-se uma função chamada loadChildren. Copiaremos esse exemplo e colaremos na linha 13.

Essa função não carregará o módulo diretamente, mas carregará a rota filha. Além disso, ela está utilizando o import do JavaScript para importar o módulo. Substituiremos items por autenticacao no caminho em import, que é o nome do nosso módulo. Dentro da pasta autenticacao, acessaremos autenticacao.module .

Esse import retornará uma promise e, quando essa promise for resolvida, o módulo será carregado. Passaremos então o AutenticacaoModule para cá também.

app-routing.module.ts
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
  },
// código omitido
COPIAR CÓDIGO
Feito isso, verificaremos agora se algo mudou no terminal, pressionando "Ctrl + J". O mesmo pacote inicial, Initial Chunk Files, continua sendo carregado.

E por que isso? Porque no app.module.ts, no array de imports, o módulo de autenticação está sendo carregado. Tudo que é carregado no app.module é inicializado e carregado por padrão desde o início. Por isso que o Lazy Loading não está funcionando, apesar de termos feito a sintaxe.

Removeremos, então a linha 26, que contém AutenticacaoModule, pois o módulo de autenticação não será carregado no app.module. E também removeremos a linha 13, que importa AutenticacaoModule.

Acessando o terminal novamente, vamos parar a aplicação com "Ctrl + C" e executar novamente com o ng serve para verificar se o pacote já foi carregado sob demanda.

Agora, sim! Temos no terminal o pacote inicial e logo abaixo dele temos os Lazy Chunk Files , que é justamente esse módulo que será carregado sob demanda, de forma preguiçosa. No nosso caso, é o autenticacao-module.

Isso significa que conseguimos implementar o Lazy Loading!

Agora, ao clicar em "Cadastre-se" ou "Login" na aplicação, ainda não funciona. Isso porque precisamos fazer um ajuste no routerLink.

Ajustando os links de roteamento
Vamos voltar ao VS Code e acessar o arquivo header.component.html. No routerLink da linha 11, adicionaremos o auth antes do /perfil. O mesmo na linha 17: auth/cadastro. Na linha 18, auth/login.

header.component.html
<ng-container *ngIf="user$ | async as pessoaUsuaria; else login">
    <a routerLink="auth/perfil">
        <img src="assets/icones/user.png" alt="Ícone da pessoa usuária">
    </a>
    <button mat-stroked-button color="primary" (click)="logout()">SAIR</button>
</ng-container>
<ng-template #login>
    <button routerLink="auth/cadastro" mat-raised-button color="primary">CADASTRE-SE</button>
    <button routerLink="auth/login" mat-stroked-button>LOGIN</button>
</ng-template>
COPIAR CÓDIGO
Agora, voltando na aplicação, quando clicamos em "Login" ou "Cadastre-se", a página é redirecionada para a página de formulário em questão, seja para login ou cadastro. Então, está tudo funcionando!

Mas há alguns outros lugares na aplicação onde também estamos utilizando esse roteamento. Isso ficará como prática para você modificar.

@@08
Mão na massa: ajustando a rota

Após implementar o lazy loading para o módulo de autenticação, foi preciso ajustar os links do cabeçalho para que o routerLink pudesse redirecionar corretamente para os componentes de cadastro, login e perfil, como visto no vídeo anterior.
Mas é necessário ajustar também outros locais, além do cabeçalho, onde esse redirecionamento está sendo feito. Vamos lá!

Iniciando os ajustes, na tela de login, temos um redirecionamento para a tela de cadastro que precisa ser ajustado.
1. No arquivo login.component.html, adicione /auth antes de /cadastro, assim:

<p>Ainda não possui conta?
   <a routerLink="/auth/cadastro">
<strong><u>Clique aqui para se cadastrar!</u>
</strong>
   </a>
</p>
COPIAR CÓDIGO
2. No arquivo de guarda de rotas, auth.guard.ts, adicione auth antes de /login no método navigate, assim:

if(userService.estaLogado()) {
    return true;
  } else {
    router.navigate(['auth/login']);
    return false;
  }
COPIAR CÓDIGO
3. No arquivo cadastro.component.ts, adicione auth antes de /login no método cadastrar, assim:

cadastrar() {
    //código omitido
    this.router.navigate(['auth/login']);
    //código omitido
}
COPIAR CÓDIGO
4. No arquivo perfil.component.ts, adicione auth antes de /login no método deslogar, assim:

deslogar() {
    this.userService.logout();
    this.router.navigate(['auth/login']);
}
COPIAR CÓDIGO
5. No arquivo header.component.ts, adicione auth antes de /login no método logout, assim:

  logout() {
    this.userService.logout();
    this.router.navigate(['auth/login'])
  }
COPIAR CÓDIGO
Pronto, agora as rotas estão ajustadas e podemos continuar!

@@09
Para saber mais: Lazy Loading no Angular

Você pode acessar o artigo que escrevi sobre Lazy loading no angular para saber mais sobre as vantagens de utilizá-lo, como implementar esta técnica na sua aplicação e como verificar o seu funcionamento.

https://www.alura.com.br/artigos/como-lazy-loading-pode-melhorar-desempenho-aplicacao-angular?_gl=1*zw7q5s*_ga*MTgwMzIzMjk2Ni4xNjg4ODE5OTcz*_ga_1EPWSW3PCS*MTcwOTg0OTM4My4yMzAuMS4xNzA5ODU0ODYzLjAuMC4w*_fplc*MUZhTyUyRm1VJTJCcVRNcDhqSDA4bjBDZiUyRkc4Qmo3OUt4V0d3WnNmRk9qaU9ub1VqNmcwOVllR0g3T3BSeUNsNWVtZ0ViVHZGWTVXV1BheWlHVDhOTDA3ZmJZNm4lMkZhazIwdzUlMkZtJTJGTFlqVkgzcW1lOW9zc3E4Y0s1NHNjTENoMGF3JTNEJTNE

@@10
Carregamento sob demanda

Você está trabalhando em um projeto Angular de grande escala e deseja melhorar o desempenho da aplicação, reduzindo o tempo de carregamento inicial. Você está considerando a implementação do lazy loading para carregar módulos de funcionalidade apenas quando necessário.
// Exemplo de configuração de roteamento com Lazy Loading em Angular
const routes: Routes = [
  {
    path: 'funcionalidade',
    loadChildren: () =>
      import('./funcionalidade/funcionalidade.module').then(
        (m) => m.FuncionalidadeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
COPIAR CÓDIGO
Assinale a alternativa que contém a definição de lazy loading em Angular e como ele pode beneficiar o desempenho da aplicação.

Lazy loading é uma técnica que carrega automaticamente todos os módulos da aplicação durante o carregamento inicial para melhorar o desempenho. Isso garante que todos os recursos estejam prontos para uso imediato.
 
O Lazy loading não carrega automaticamente todos os módulos da aplicação no início.
Alternativa correta
Lazy loading é uma técnica que adia o carregamento de módulos de funcionalidade até que eles sejam realmente necessários, o que pode reduzir significativamente o tempo de carregamento inicial da aplicação.
 
Lazy loading é uma técnica que adia o carregamento de módulos de funcionalidade até que sejam necessários, reduzindo o tempo de carregamento inicial da aplicação.
Alternativa correta
Lazy loading é uma técnica que desativa completamente o carregamento de módulos de funcionalidade, tornando a aplicação mais rápida, mas limitando a funcionalidade disponível.
 
Alternativa correta
Lazy loading é uma técnica usada apenas para carregar imagens e recursos de mídia em segundo plano, não afetando o carregamento de módulos Angular.

@@11
Mão na massa: implementando roteamento e Lazy Loading no módulo de busca

Agora é sua vez de praticar!
Crie o arquivo de rotas para o módulo de busca e implemente o lazy loading para que esse módulo seja carregado sob demanda!

Para criar o módulo de rotas, siga os passos a seguir:
1. Clique com o botão direito dentro da pasta busca e selecione a opção New File (Novo arquivo);

2. Nomeie o arquivo de acordo com a convenção: busca-routing.module.ts;

Esse arquivo terá a seguinte estrutura final:
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { BuscaComponent } from "./busca.component";

const routes: Routes = [
  {
    path: '',
    component: BuscaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscaRoutingModule { }
COPIAR CÓDIGO
3. Faça a Importação do arquivo de rotas no módulo de busca, assim:

//importações omitidas
import { BuscaRoutingModule } from "./busca-routing.module";

@NgModule({
  declarations: [
    //código omitido
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    BuscaRoutingModule
  ],
  exports: [
    //código omitido
  ]
})
export class BuscaModule { }
COPIAR CÓDIGO
Para implementar o lazy loading, siga os passos a seguir:

4. No arquivo app-routing.module.ts adicione a configuração do loadChildren.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//código omitido
    {
        path: 'busca',
            loadChildren: () => import('./busca/busca.module').then(m => m.BuscaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
COPIAR CÓDIGO
5. Remova o BuscaModule do array de imports do app.module.ts para que ele não seja carregado inicialmente e o lazy loading funcione.

6. Teste e veja no terminal se o módulo está sendo carregado sob demanda, da mesma forma que o módulo de autenticação como na imagem a seguir:

Imagem do terminal integrado do VS Code mostrando os módulos de busca e autenticação de ao serem carregados através do lazy loading - carregamento sob demanda. Os módulos estão descritos abaixo da categoria: Lazy Chunck Files. Na frente do nome do módulo, está o tamanho dele: 79.05kB para o módulo de busca e 38.04kB para o de autenticação.

@@12
Rota não encontrada

Agora, já configuramos o roteamento dos novos módulos. Contudo, o que ocorre quando tentamos acessar uma rota que não existe?
Ao acessar uma URL inválida, notamos que somente o rodapé e o cabeçalho parecem, enquanto a página permanece em branco. Essa não é a experiência ideal. O indicado é que as pessoas usuárias sejam levadas a uma página que avise sobre inexistência da rota, apresentando também um link para redirecionamento à página inicial. E isso é exatamente o que faremos neste vídeo.

No Figma do projeto, temos uma página para erro com uma foto e o aviso "Opa! Página não encontrada! Retorne à tela inicial.". Vamos implementá-la na nossa aplicação.

Página de erro
Voltaremos ao VS Code. Agora, com a aplicação já organizada em módulos, a adição de uma nova funcionalidade torna-se muito mais simples. Utilizaremos o Angular CLI para isso.

Vamos abrir o terminal com "Ctrl + J" e encerrar a aplicação com "Ctrl + C". Criaremos um novo módulo chamado "erro" na pasta "core" do nosso projeto, com o comando ng g m core/erro. Para também gerar simultaneamente o arquivo de rotas, passaremos a flag --routing.

ng g m core/erro --routing
COPIAR CÓDIGO
Após pressionar "Enter", a pasta de erro e o arquivo de rotas erro-routing.module.ts já foram criados, além do módulo erro.module.ts. Inclusive, o arquivo de rotas já foi importado para dentro do módulo.

Criaremos agora um componente para representar a página não encontrada. Esse componente será criado dentro do módulo de erro e será chamado de pagina-nao-encontrada. Faremos isso por meio do seguinte comando

ng g c core/erro/pagina-nao-encontrada
COPIAR CÓDIGO
Esse novo componente já foi criado e declarado no módulo. Esse componente não está presente nas declarations do app.module, então não precisamos apagar nada, pois ele já está automaticamente declarado dentro do módulo de erro.

No CSS da página não encontrada, colaremos o código que será responsável pelo alinhamento das imagens e do parágrafo:

pagina-nao-encontrada.component.scss
section {
  p {
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    color: #000000;
  }
  a {
    text-decoration: underline;
    cursor: pointer;
    font-weight: 600;
    color: #6750A4;
  }
  app-container {
    padding: 112px 0 112px 0;
  }
  figure {
    display: flex;
    justify-content: center;
  }
}
COPIAR CÓDIGO
Já no HTML colaremos o template, que é bastante simples:

pagina-nao-encontrada.component.html
<section>
  <app-banner
    src="assets/imagens/banner-pagina-nao-encontrada.png"
    alt="Banner da tela de erro - página não encontrada">
  </app-banner>
  <app-container>
    <p>Ops! Página não encontrada!
      <a routerLink="/home">Retorne à tela inicial</a>
    </p>
    <figure>
      <img
      src="assets/imagens/pagina-nao-encontrada.png"
      alt="Ilustração de mulher com binóculos e um círculo roxo com número 404">
    </figure>
  </app-container>
  <app-banner
    src="assets/imagens/banner-homepage-rodape.png"
    alt="Banner de rodapé com imagem de homem sentado numa montanha">
  </app-banner>
</section>
COPIAR CÓDIGO
Nesse template, temos uma section e dentro dela o app-banner, um componente que criamos em aulas anteriores. Esse será o banner da tela de erro.

Utilizaremos também o app-container com o parágrafo "Ops! Página não encontrada!". Teremos também uma tag a com routerLink para /home, permitindo a volta à tela inicial. Além disso, teremos imagem de uma pessoa com binóculos no centro da tela e o banner de rodapé.

Agora, precisamos importar o módulo de erro dentro do app.module.ts para permitir o acesso a ele. Importaremos o módulo de erro na linha 27:

app.module.ts
imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    HomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ErroModule
],
COPIAR CÓDIGO
Rotas de erro
Vamos configurar as rotas agora. Acessaremos o error-routing.module e, na linha 5 (dentro do array de Routes), criaremos um objeto com chaves. Na linha 6, digitaremos o path: 'pagina-nao-encontrada', e na linha 7 o component, que será o PaginaNaoEncontradaComponent.

error-routing.module.ts
const routes: Routes = [
  {
    path: 'pagina-nao-encontrada',
    component: PaginaNaoEncontradaComponent
  }
];
COPIAR CÓDIGO
Agora que realizamos essa configuração no módulo de erro, vamos voltar ao app-routing.module.ts, o arquivo de rotas. Copiaremos as linhas 5 a 9 para duplicar o objeto, logo no início do array de Routes, e criaremos uma rota coringa.

Essa rota redirecionará o usuário para a página não encontrada, quando o roteador do Angular não encontrar correspondência com nenhuma outra rota.

O path será '**', entre aspas simples, redirecionando para a rota de página não encontrada pela propriedade redirectTo, e o pathMatch também será full.

app-routing.module.ts
{
    path: '**',
    redirectTo: '/pagina-nao-encontrada',
    pathMatch: 'full'
}
COPIAR CÓDIGO
Por fim, vamos executar a aplicação com o seguinte comando no terminal. Ao criar componentes e módulos, é sempre indicado parar o CLI e reiniciar, e depois executar novamente a aplicação com o ng serve no terminal para poder testar.

Após fazer isso, o terminal indica um erro no módulo de erro: nós não estamos conseguindo acessar o app-banner. Portanto, vamos conferir o que aconteceu no arquivo erro.module.

O que ocorre é que estamos tentando acessar o app-banner, que está no módulo shared, no módulo de erro. Como os módulos são independentes, já sabemos que precisamos importar para usar seus componentes.

Assim, no erro.module, na linha 15, vamos importar o SharedModule. Também importaremos o RouterModule, outro módulo necessário para o módulo de erro, pois o módulo de roteamento poderá redirecionar a pessoa para a página inicial da aplicação.

erro.module.ts
imports: [
    CommonModule,
    ErroRoutingModule,
    SharedModule,
    RouterModule
]
COPIAR CÓDIGO
Também precisamos importar ambos os componentes dentro do arquivo.

Vamos testar novamente a nossa aplicação no navegador.

Agora, a página de aviso de página não encontrada já está aparecendo!

Mas, ao clicar no logo da Jornada no cabeçalho, no botão "Cadastre-se" ou no "Login" ainda permanecemos nessa página não encontrada.

O que será que está ocorrendo? Vamos voltar ao VS Code e verificar no app-routing.module.

Quando nós configuramos uma rota coringa, o roteador do Angular redirecionará para a página não encontrada se nenhuma rota anterior for encontrada. Se essa rota coringa é a primeira que colocamos no array de rotas, é por isso que esse erro ocorre. Evitamos esse erro colocando a rota coringa como a última rota do array.

Além disso, é uma boa prática deixar as rotas mais específicas primeiro, e as rotas mais genéricas no final. Sendo assim, deixaremos o path vazio mais abaixo, antes da rota coringa. Teremos, então:

app-routing.module.ts
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
  },
  {
    path: 'busca',
    loadChildren: () => import('./busca/busca.module').then(m => m.BuscaModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pagina-nao-encontrada',
    pathMatch: 'full'
  }
];
COPIAR CÓDIGO
Agora, ao clicar no logo da Jornada no cabeçalho do site no navegador, a página inicial é carregada corretamente, assim como clicando em "Cadastre-se" e "Login".

Se tentarmos acessar uma rota que não existe, somos redirecionados para a página não encontrada. Porém, o link de retorno à tela inicial não está funcionando.

Para resolver isso, voltaremos ao VS Code para resolver. Uma das formas de fazer isso é no routerLink do HTML da página não encontrada, removendo o /home e deixando o routerLink apenas com '/' para voltar à tela inicial.

pagina-nao-encontrada.component.html
<p>Ops! Página não encontrada!
    <a routerLink="/">Retorne à tela inicial</a>
</p>
COPIAR CÓDIGO
Pronto, resolvemos tudo!

Agora que as rotas já estão configuradas, aprenderemos na próxima aula como gerenciar os erros na aplicação.

@@13
O que aprendemos?

Nessa aula, você aprendeu como:
Criar arquivos de roteamento para módulos de funcionalidade;
Organizar as rotas no AppRoutingModule;
Implementar lazy loading e carregar módulos sob demanda;
Lidar com rotas não encontradas na aplicação.

#### 08/03/2024

@04-Gerenciamento de erros

@@01
Projeto da aula anterior
PRÓXIMA ATIVIDADE

Caso queira revisar o código até aqui ou começar a partir desse ponto, disponibilizamos os códigos realizados na aula anterior, para baixá-lo clique nesse link ou veja nosso repositório do Github.

https://github.com/alura-cursos/3413-jornada-milhas/archive/refs/heads/aula-3.zip

https://github.com/alura-cursos/3413-jornada-milhas/tree/aula-3

@@02
Criando um Interceptor

Na aula passada, nós criamos os arquivos de rota dos módulos e um novo módulo para começar lidar com os erros da aplicação. Esse módulo foi responsável pela adição da "página não encontrada".
É muito importante lidarmos com os erros da aplicação de uma forma consistente e centralizada, dado que existem vários tipos de erros que podem ocorrer. Um deles, por exemplo, é o erro de servidor indisponível.

Vamos fazer um teste. No terminal, vamos parar o back-end com o comando "Ctrl +C" para descobrirmos o que acontece. Retornando ao navegador e recarregando a página inicial do Jornada Milhas no navegador, não aparecem mais os cartões de promoções e de depoimentos que eram fornecidos pelo back-end, assim como os estados. Para a pessoa usuária, a aplicação está quebrada, mas ela não compreende exatamente o que ocorreu.

Se abrirmos o terminal, pressionando "Ctrl + Shift +J", aparecem vários erros, por exemplo, o HttpErrorResponse, com diversas informações, mas que só faz sentido para as pessoas desenvolvedoras. É importante que esse feedback também aparece para as pessoas usuárias, e é exatamente isso que vamos começar a construir nessa aula: aprender a gerenciar os erros da aplicação.

Uma das formas para implementarmos o gerenciamento de erros é utilizando o Interceptor, que é uma ferramenta essencial do Angular. Esse Interceptor já foi usado na aplicação, especificamente no módulo de autenticação. No autenticacao.interceptor.ts temos um Interceptor de autenticação, onde adicionamos informações à requisição antes dela ser enviada ao servidor.

No caso do tratamento de erros, o Interceptor terá uma função contrária. Ele não lidará com a requisição antes dela alcançar o servidor, e sim com a resposta dessa requisição HTTP. Sendo assim, criaremos um novo Interceptor dentro do módulo de erro.

No VS Code, abriremos o terminal com o atalho "Ctrl + J". Ao clicarmos no terminal, pressionaremos "Ctrl + C" para pararmos a aplicação. Em seguida, escreveremos o comando ng g interceptor core/erro/erros --skip-tests. Passamos o caminho de onde ele deve ser criado, ou seja, em "core > erro". O nome do Interceptor será erros e passamos a opção --skip-tests para não gerarmos o arquivo de testes.

Atenção: Nesse caso não devemos abreviar interceptor para i, ou criaremos uma interface e não um Interceptor.
Ao pressionarmos "Enter", o Interceptor é criado. Em seguida, ainda no terminal, escreveremos ng serve para executar a aplicação e podemos fechar o terminal. Agora, ao acessarmos "core > erro", encontramos o Interceptor de erros: erros.interceptor.ts. Vamos abrir esse arquivo.

Esse Interceptor é uma classe de serviço do Angular que possui o decorator @Injectable na linha 10, indicando que essa classe pode ser injetada na aplicação. O Interceptor implementa a interface HttpInterceptor, que possui o método intercept(). Esse método receberá como parâmetro a requisição e um manipulador, retornando-nos um Observable.

Para simplificar a explicação, vamos imaginar um cenário em que estamos indo aos correios para enviar uma encomenda. Nos correios, a pessoa atendente adiciona algum selo ou etiqueta especial na encomenda antes de enviá-la. Nesse caso, a atendente está agindo como um Interceptor, pois adiciona informações na encomenda. Da mesma forma, no Angular, o Interceptor adiciona informações à requisição antes dela ser enviada, como no caso do Interceptor de autenticação.

Agora, vamos pensar num cenário onde uma pessoa dos correios vem até nossa casa entregar a encomenda. Antes de entregá-la, ela fará uma verificação para verificar se não houve danos na embalagem ou algum erro. Essa pessoa também age como Interceptor, neste caso gerenciando erros. Da mesma forma, no Angular, o Interceptor gerencia os erros da aplicação, verificando se houve algum erro. Se houver, seremos capazes de lidar com esses erros adicionando uma lógica dentro do Interceptor.

Deixarei um Para Saber Mais para aprofundar seus conhecimentos sobre o Interceptor e com alguns casos de uso, tanto do Interceptor de requisição como do Interceptor de resposta.

@@03
Para saber mais: Interceptor no Angular
PRÓXIMA ATIVIDADE

Interceptors em Angular são mecanismos poderosos para "interceptar" e "observar" solicitações HTTP antes que sejam enviadas para o servidor e antes que as respostas retornem ao código que originou a chamada HTTP. Isso oferece uma maneira flexível e modular de adicionar funcionalidades comuns a todas as solicitações HTTP em uma aplicação Angular.
Casos de Uso dos Interceptors:

Modificar solicitações antes do envio ao servidor:
Adicionar cabeçalhos HTTP personalizados à solicitação: Os interceptors podem injetar cabeçalhos, como tokens de autenticação ou informações de rastreamento, em todas as solicitações, garantindo consistência e segurança;
Anexar tokens de autenticação às solicitações: Isso é útil para garantir que todas as solicitações feitas pela aplicação estejam autenticadas, sem a necessidade de modificar manualmente cada chamada;
Realizar transformações nos dados da solicitação: Os interceptores podem modificar os dados da solicitação, como formatos de dados, antes que sejam enviados ao servidor;
Qualquer manipulação prévia necessária: Você pode realizar qualquer lógica de preparação ou validação antes que a solicitação seja despachada, tornando o código de chamada mais limpo e focado em seu propósito principal.
Observar a resposta antes de retornar ao código de chamada:
Lidar com erros de forma consistente: Interceptors podem capturar erros de solicitação, como erros de rede ou status HTTP não esperados e apresentar mensagens de erro amigáveis ou executar ações específicas de tratamento de erros;
Realizar transformações nos dados de resposta: Os interceptores permitem que você modifique os dados de resposta, como formatos de dados, para atender às necessidades da sua aplicação;
Executar ações comuns: Interceptors podem ser usados para realizar ações comuns em todas as respostas, como mostrar indicadores de carregamento, registrar informações de log ou executar qualquer ação necessária para o feedback da pessoa usuária.
Em resumo, interceptors são como "filtros" que podem ser aplicados globalmente a solicitações e respostas HTTP em uma aplicação Angular. Eles centralizam a lógica de manipulação de solicitações e respostas, promovendo a reutilização do código, a modularidade e a manutenção de um código limpo. Além disso, eles são uma ferramenta poderosa para adicionar funcionalidades como autenticação, tratamento de erros e outras tarefas comuns a todas as chamadas HTTP na sua aplicação Angular, melhorando a consistência e a segurança.

Na documentação oficial você pode encontrar mais informações sobre como interceptar requisições e respostas e também sobre casos de uso dos interceptors.

https://angular.io/guide/http-intercept-requests-and-responses

https://angular.io/guide/http-interceptor-use-cases

@@04
Gerenciando erros na aplicação

Agora, adicionaremos a lógica dentro do interceptor para que possamos capturar possíveis erros, verificar o tipo de erro e fornecer feedback para pessoa usuária. Como já criamos o interceptor, precisamos registrá-lo. Faremos isso dentro de app.module.ts.
Abrindo esse arquivo, selecionaremos o código que temos dentro de providers, nas últimas linhas do arquivo, e pressionaremos "Alt + Shift + ↓", copiando esse código para as linhas abaixo. Além disso, após o fechamento de chaves do primeiro interceptor, adicionaremos uma vírgula. No novo código, o provide continuará sendo a classe HTTP_ INTERCEPTORS, mas useClass será o novo ErrosInterceptor. Concluído, já o importamos.

// código omitido

providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AutenticacaoInterceptor,
    multi: true
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrosInterceptor,
    multi: true
    }
],
COPIAR CÓDIGO
Agora, posso fechar o app.module.ts e retornar para o erros.interceptor.ts. No intercept(), recebemos como parâmetro a requisição e o manipulador. Vamos tipar esses dois parâmetros. Para isso, selecionamos o unknown do request, pressionamos "Ctrl + D" para selecionar o unknow do next também, e escreveremos HTTPErrorResponse como o tipo.

//código omitido

intercept (
    request: HttpRequest<HttpErrorResponse>,
    next: HttpHandler): Observable<HttpEvent<HttpErrorResponse>> {
        return next.handle(request);
    })
COPIAR CÓDIGO
Como o retorno desse método intercept() é um Observable, vou utilizaremos alguns operadores do RxJS para manipularmos essa requisição. Sendo assim, no final do return adicionaremos um .pipe() fazermos o encadeamento dos operadores do RxJS. Usaremos catchError(), porque queremos capturar um erro. Nos parênteses, receberemos o error: HTTPErrorResponse. Criaremos uma arrow function para continuarmos adicionando a lógica.

//código omitido

intercept (
    request: HttpRequest<HttpErrorResponse>,
    next: HttpHandler): Observable<HttpEvent<HttpErrorResponse>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                
        });
    })
COPIAR CÓDIGO
Precisamos retornar esse erro no final, então, antes de fechar chaves, escreveremos return throwError(), que é outro operador do RxJS. Nos parênteses, escreveremos outra arrow function, passando um new Error ('Ops, ocorreu um erro!'), ou seja, passamos a mensagem de erro.

//código omitido

intercept (
    request: HttpRequest<HttpErrorResponse>,
    next: HttpHandler): Observable<HttpEvent<HttpErrorResponse>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                
                return throwError (() => new Error('Ops, ocorreu um erro!'));
        });
    })
COPIAR CÓDIGO
Agora, adicionaremos a lógica dentro do catchError(). Começamos criando uma variável local que vai conter uma mensagem de texto que será mostrada para a pessoa usuária. Para isso codamos let errorMessage = 'Ocorreu um erro desconhecido.

Então deixamos a mensagem padrão "Ocorreu um erro desconhecido", isso porque não vamos verificar todos os status de erro, mas utilizaremos alguns que fazem mais sentido para a aplicação. Caso nenhum desses erros verificados ocorra, a mensagem padrão que ficará é "Ocorreu um erro desconhecido".

//código omitido

return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido';
        
        return throwError (() => new Error('Ops, ocorreu um erro!'));
});
COPIAR CÓDIGO
Agora, faremos uma verificação do tipo de erro. Primeiro, verificaremos se o erro está acontecendo do lado da pessoa cliente ou do servidor. Para isso, na linha abaixo do errorMessage, escreveremos um if() e verificaremos o tipo do erro. Se error.error for uma instância de ErrorEvent, isso indica que esse erro está acontecendo do lado do cliente, e não é um erro do tipo httpErrorResponse. Nesses casos, a mensagem que aparecerá será `Erro do cliente: ${error.error.message}'`.

//código omitido

return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido';
        
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Erro do cliente: ${error.error.message}`;
        }
        
        return throwError (() => new Error('Ops, ocorreu um erro!'));
});
COPIAR CÓDIGO
Caso não seja um erro do lado do cliente, verificaremos o status de erro do servidor. Então, após o fechamento de chaves do if(), adicionaremos um else if(error.status === 404) para verificarmos o status 404. Se for esse erro, a errorMessage será "Recurso não encontrado".

//código omitido

return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido';
        
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Erro do cliente: ${error.error.message}`;
        } else if (error.status === 404) {
            errorMessage = 'Recurso não encontrado';
        
        return throwError (() => new Error('Ops, ocorreu um erro!'));
});
COPIAR CÓDIGO
Além do erro 404, verificaremos os status de erro 500, que é um erro do servidor, e 401, para acesso não autorizado. As mensagens serão, sucessivamente, "Erro interno no servidor" e "Você não está autorizado a acessar este recurso". Caso não caia em nenhuma dessas condições, a mensagem padrão será "Ocorreu um erro desconhecido".

return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido';

        if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente, como uma rede interrompida
            errorMessage = `Erro do cliente: ${error.error.message}`;
        } else if (error.status === 404) {
            // Recurso não encontrado (erro 404)
            errorMessage = 'Recurso não encontrado';
        } else if (error.status === 500) {
            // Erro interno do servidor (erro 500)
            errorMessage = 'Erro interno do servidor';
        } else if (error.status === 401) {
            // Não autorizado (erro 401)
            errorMessage = 'Você não está autorizado a acessar este recurso';
        }
        
        console.error( error);
        console.error(errorMessage);
        
        return throwError (() => new Error('Ops, ocorreu um erro!'));
    });
COPIAR CÓDIGO
Para visualizarmos se isso está funcionando, adicionamos um console.error(error) e um console.error(errorMessage), para recebermos o erro e a mensgem. Agora, vamos simular um erro para testar se o interceptor está funcionando.

No menu Explorer, na lateral esquerda do VS Code, dentro acessaremos "core > unidade-federativa.service.ts. No método requestEstados() , mais ao final do código, excluiremos duas letras de /estados, deixando como /estad.

//código omitido
private requestEstados(): Observable<UnidadeFederativa[]> {
    return this.http.get<UnidadeFederativa[]>(`${this.apiUrl}/estad`);
}
COPIAR CÓDIGO
De volta à aplicação, abriremos o console, onde observamos o erro "Recurso não encontrado" e o status 404. Isso indica que o interceptor já está funcionando, mas ainda precisamos fornecer um feedback visual para o usuário, que será implementado em breve.

@@05
Interceptando requisições
PRÓXIMA ATIVIDADE

Você está desenvolvendo uma aplicação Angular que precisa exibir uma mensagem de loading sempre que uma requisição HTTP estiver em andamento. Para implementar isso de forma eficiente, você decide usar um interceptor com o código a seguir:
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
COPIAR CÓDIGO
Abaixo está o código do serviço LoadingService que o interceptor LoadingInterceptor está consumindo:

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);

  constructor() { }

  showLoading() {
    this.isLoading.next(true);
  }

  hideLoading() {
    this.isLoading.next(false);
  }

  getLoadingStatus() {
    return this.isLoading.asObservable();
  }
}
COPIAR CÓDIGO
Qual é o propósito do interceptor LoadingInterceptor no código acima e como ele melhora a experiência de uso da aplicação?

O interceptor LoadingInterceptor é utilizado para bloquear todas as requisições HTTP feitas pela aplicação, garantindo que nenhum dado seja transmitido pela rede. Isso protege a aplicação contra possíveis ataques de segurança, melhorando a experiência.
 
Alternativa correta
O interceptor LoadingInterceptor é usado para adicionar um atraso artificial em todas as requisições HTTP, simulando um carregamento lento. Isso proporciona uma experiência mais realista e imersiva, tornando a aplicação mais envolvente.
 
Alternativa correta
O interceptor LoadingInterceptor intercepta todas as requisições HTTP e exibe uma mensagem de loading enquanto a requisição está em andamento. Isso proporciona uma experiência mais responsiva, indicando visualmente quando as operações de rede estão ocorrendo.
 
Essa abordagem permite que as pessoas saibam que a aplicação está funcionando e aguardando uma resposta do servidor, melhorando assim a experiência de uso da aplicação. É uma prática comum em interfaces para fornecer feedback visual durante operações demoradas, tornando a aplicação mais amigável e informativa.
Alternativa correta
O interceptor LoadingInterceptor é responsável por identificar automaticamente o tipo de conteúdo das respostas das requisições HTTP e ajustar dinamicamente o layout da aplicação para melhorar a legibilidade do texto. Isso melhora a experiência ao garantir que o conteúdo seja apresentado de forma clara e fácil de ler.

@@06
Interceptor para manipulação de respostas
PRÓXIMA ATIVIDADE

Em um projeto Angular, você implementou um interceptor para manipular as respostas das requisições HTTP antes que elas alcancem os componentes da aplicação. Isso é útil para pré-processar os dados, realizar transformações ou tratamentos específicos nas respostas da API.
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event.clone({ body: this.transformData(event.body) });
        }
        return event;
      })
    );
  }

  private transformData(data: any): any {
    // Lógica de transformação dos dados aqui
    return data;
  }
}
COPIAR CÓDIGO
Qual é o papel do ResponseInterceptor no código acima e como ele pode ser utilizado para melhorar a qualidade e a eficiência da aplicação?

O ResponseInterceptor intercepta as respostas das requisições HTTP e realiza transformações nos dados antes que sejam processados pelos componentes da aplicação. Isso pode incluir formatação, tradução ou qualquer outra manipulação necessária.
 
O ResponseInterceptor intercepta respostas HTTP e realiza transformações nos dados, melhorando a qualidade dos dados antes que sejam utilizados pelos componentes da aplicação. Essas transformações podem incluir a formatação de datas, a tradução de mensagens ou qualquer outra manipulação necessária para melhorar a experiência da pessoa usuária.
Alternativa correta
O ResponseInterceptor redireciona automaticamente as respostas para diferentes endpoints da aplicação com base no tipo de conteúdo, garantindo uma melhor organização dos dados na aplicação.
 
Alternativa correta
O ResponseInterceptor intercepta as respostas HTTP e automaticamente reenvia qualquer resposta que tenha um código de status 500, garantindo que os erros sejam tratados pelo servidor antes de chegar à aplicação.
 
Alternativa correta
O ResponseInterceptor bloqueia automaticamente qualquer resposta que contenha dados sensíveis, garantindo que essas respostas não sejam acessíveis pelos componentes da aplicação.

@@07
Implementando um serviço de notificação

Agora, nós já temos um interceptor (interceptador) que consegue capturar os erros da aplicação. Falta notificarmos a pessoa usuária de que um erro ocorreu. Para fazer isso, acessaremos a documentação do Angular Material, na seção de componentes. Na coluna de esquerda estão listados todos os componentes, e clicaremos para acessar a página do Snackbar.
Na parte superior da página há três abas: Overview (Visão geral), API e Examples (Exemplos). Ao acessarmos a aba de exemplos e rolarmos até o final, teremos um exemplo com o botão "Pool party!" (Festa na piscina). Clicando nesse botão, surge um tipo de pop-up no canto inferior esquerdo da tela, informando à pessoa usuária que algo ocorreu.

Para termos esse efeito, acessaremos a aba de API e copiaremos a importação do módulo. Em seguida, retornaremos ao VS Code, onde navegaremos para "core > material > material.module.ts. Após a importação do MatToolbarModule, colaremos a importação da SnackBar. Em seguida, copiaremos o nome do módulo e colaremos dentro de exports, ao final da lista.

//código omitido
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
    MatSliderModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
COPIAR CÓDIGO
Pronto, agora já posso utilizá-lo e podemos fechar o material.module.ts. Retornando à documentação, procuraremos por um exemplo parecido ao que queremos, na aba "Examples". Voltaremos ao último exemplo da página e clicaremos no botão com o ícone de código (< >). Com isso, acessamos o código desse modelo de SnackBar em três versões: HTML, TS e CSS. Clicaremos na aba TS e copiaremos o que está dentro da classe SnackBarPositionExample, incluindo o método.

horizontalPosition: MatSnackBarHorizontalPosition = 'start';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';

constructor(private _snackBar: MatSnackBar) {}

openSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
    });
}
COPIAR CÓDIGO
Voltando para o VS code, ainda não temos nenhum arquivo ou serviço que realize esse tipo de notificação, portanto criaremos um. Abriremos o terminal novamente, com o comando "Ctrl + C" e criaremos um serviço de mensagens, usando o comando ng g s. Como este serviço, apesar de ser inicialmente utilizado para erros, pode ser empregado em toda a aplicação, criaremos dentro da pasta core/services, e o nome mensagem. Também passaremos o --skip-tests não criarmos o arquivo de testes.

ng g s core/services/mensagem --skip-tests
COPIAR CÓDIGO
Nosso mensagem.service.ts foi criado. Com ele aberto, colaremos o código que copiamos entre as chaves do MensagemService, no lugar do constructor(). Precisaremos fazer a importação de alguns componentes, mas, feito isso, temos o construtor.

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
COPIAR CÓDIGO
O método openSnackBar() fará com que o SnackBar seja aberto e possamos passar algumas configurações para esse método. Por exemplo, podemos escolher a posição horizontal e vertical de onde ele surgirá, assim como a duração e a mensagem. Nosso método receberá a mensagem como parâmetro, que será do String, e a que será exibida ao usuário.

No segundo parâmetro, podemos adicionar uma palavra para o botão que vai fechar a SnackBar, como um 'X', mas não quero que a pessoa usuária precise clicar para esse SnackBar fechar. Depois adicionaremos uma duração para o SnackBar fechar, então podemos deixar o segundo parâmetro como undefined.

//código omitido
openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
    });
}
COPIAR CÓDIGO
As opções da posição horizontal (horizontalPosition) são amplas, mas definiremos como right para que apareça à direita. A posição vertical (verticalPosition) será Top, para aparecer em cima. Além disso, passaremos a duração do SnackBar na linha 16 em milissegundos, escrevendo duration: 3000,, para durar 3000 milissegundos.

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}

openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
        duration: 3000
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
    });
}
}
COPIAR CÓDIGO
O nosso serviço de mensagens já está criado e já possui um método, agora precisamos injetar esse serviço no interceptor. Para isso, acessaremos o erros.interceptor.ts e, nos parênteses do constructor(), escreveremos private messagemService: MensagemService para injetarmos o serviço. Agora usaremos o serviço.

Dentro do catchError, apagaremos as duas linhas de console.error() que escrevemos. No lugar, usaremos o serviço, codando this.mensagemService.openSnackBar(errorMessage). Usamos o método openSnackBar(), que pede uma mensagem como parâmetro, e para isso passamos a errorMessage, que é a mensagem de erro que criamos.

@Injectable()
export class ErrosInterceptor implements HttpInterceptor {
  constructor(private mensagemService: MensagemService) {}

  intercept(
    request: HttpRequest<HttpErrorResponse>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro do cliente: ${error.error.message}`;
        } else if (error.status === 404) {
          errorMessage = 'Recurso não encontrado';
        } else if (error.status === 500) {
          errorMessage = 'Erro interno do servidor';
        } else if (error.status === 401) {
          errorMessage = 'Você não está autorizado a acessar este recurso';
        }

        this.mensagemService.openMessage(errorMessage);
        console.error('Erro HTTP:', error);
        console.error('Mensagem de erro:', errorMessage);

        return throwError(() => new Error('Ops, ocorreu um erro'));
      })
    );
  }
}
COPIAR CÓDIGO
Não consertei ainda o erro da unidade-federativa.service.ts, portanto ainda temos o erro 404. Antes de retornarmos à aplicação, abriremos o terminal e enviaremos o ng server para iniciarmos a aplicação novamente. Feito isso, retornaremos para página do Jornada Milhas e recarregaremos a página.

Assim, recarregamos a aplicação, uma SnackBar aparece no canto superior direito com a mensagem "Recurso não encontrado". Porém, está aparecendo na coloração padrão que é cinza, o que não é tão visível na aplicação. Portanto, modificaremos a classe CSS do SnackBar para melhorar a experiência da pessoa usuária.

Retornando ao VS Code, acessaremos o style.scss, que é o arquivo de estilos globais. Ao final do código, adicionaremos a seguinte classe:

.mat-mdc-snack-bar-label {
     background-color: orange;
}
COPIAR CÓDIGO
Para conseguirmos alterar a coloração padrão do SnackBar, utilizamos a classe do Angular Material, mat-mdc-snack-bar-label. No caso, atribuímos uma coloração laranja para ficar mais visível.

Eu parei o servidor back-end, então poderemos visualizar outro erro. Retornando à aplicação do Jornada Milhas e recarregando a página, recebemos a mensagem "Ocorreu um erro desconhecido", dessa vez em um SnackBar laranja.

Portanto, o interceptor está funcionando. A pessoa vê a aplicação quebrada, mas informamos que um problema está acontecendo, melhorando assim a experiência de uso da aplicação.

https://material.angular.io/components/categories

https://material.angular.io/components/snack-bar/overview

https://material.angular.io/components/snack-bar/examples

https://material.angular.io/components/snack-bar/api

@@08
O que aprendemos?

Nessa aula, você aprendeu como:
Entender a finalidade e casos de uso dos interceptors;
Criar um interceptor para gerenciar erros na aplicação;
Implementar um serviço de notificação de mensagens utilizando o snackBar do angular material.