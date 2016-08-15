----- Instalando Sass -----

1) Faça o download e instale o gen no site http://rubyinstaller.org/downloads/;

2) Abre o cmd e digita gen install sass.

----- Configurando Sass -----

1) Abra o cmd e usando o comando cd, vá navegando até encontrar a pasta onde irá conter o projeto;

2) cole a pasta assets dentro do projeto;

3) sass --watch assets/css:assets/css. (caminho de onde vai ler os arquivos sass : caminho pra onde vai gerar o css)

----- Minimizando Sass -----

1) Abra o cmd e usando o comando cd, vá navegando até encontrar a pasta onde irá conter o projeto;

2) Digitar o comando: sass --style compressed css/base.scss:css. (caminho de onde vai ler os arquivos css: caminho pra onde vai gerar o css/nome do arquivo de saida)