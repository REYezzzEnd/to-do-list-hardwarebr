# To-Do List Project

Uma aplicação moderna e responsiva de **Lista de Tarefas** desenvolvida para fins de aprendizado, utilizando **React** e estilizada com o inovador **Tailwind CSS v4**. O projeto gerencia formulários de forma eficiente através da API nativa `FormData` e armazena os dados de forma persistente no navegador.

---

## Funcionalidades

* ➕ **Adicionar Tarefas:** Criação de itens contendo descrição e nível de prioridade.
* 🔢 **Campos Múltiplos:** Formulário inteligente que captura múltiplos inputs simultaneamente.
* 🚨 **Nível de Prioridade:** Adiciona contexto de urgência para cada atividade listada.
* ❌ **Remover Tarefas:** Exclusão individual de itens atualizando a interface instantaneamente.
* 💾 **Persistência de Dados:** Integração com o `localStorage` para manter as tarefas gravadas mesmo após atualizar a página.
* ⌨️ **Envio por Teclado:** Suporte nativo ao pressionar a tecla `Enter` para adicionar tarefas rapidamente, graças à tag `<form>`.

---

##Tecnologias Utilizadas

O projeto foi construído utilizando o ecossistema mais moderno de desenvolvimento web:

* **[React](https://react.dev/)**: Biblioteca JavaScript para construção de interfaces reativas baseadas em componentes e estados.
* **[Vite](https://vite.dev/)**: Ferramenta de build ultra-rápida utilizada como ambiente de desenvolvimento.
* **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework CSS utilitário para estilização rápida, moderna e sem arquivos CSS poluídos.
* **JavaScript (ES6+)**: Manipulação de estados, filtragem de arrays e manipulação do `localStorage`.

---


## Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação na sua máquina local:

### 1. Clonar o repositório ou acessar a pasta
Abra o seu terminal (use o Prompt de Comando/CMD caso o PowerShell apresente restrições de script) e navegue até a pasta do projeto:
```bash
cd to-do-list-project
```

### 2. Instalar as dependências
Instale todos os pacotes necessários configurados no projeto:
```bash
npm install
```

### 3. Rodar em modo de desenvolvimento
Inicie o servidor de testes do Vite:
```bash
npm run dev
```

### 4. Acessar a aplicação
Abra o seu navegador e acesse o endereço gerado no terminal, geralmente:
`http://localhost:5173`

---

## 💡 Conceitos de React Aprendidos

Este projeto serviu como base fundamental para compreender e dominar os seguintes tópicos:
1. **Gerenciamento de Estado (`useState`)**: Como inicializar estados dinamicamente consumindo dados pré-existentes do navegador.
2. **Imutabilidade**: Atualizar arrays e listas copiando os dados anteriores com o *spread operator* (`[...tarefas, novaTarefa]`).
3. **Componentes Controlados**: Manipulação do ciclo de digitação nos inputs através do `onChange`.
4. **Manipulação de Arrays**: Criação de elementos dinâmicos usando `.map()` e remoção cirúrgica com o método `.filter()`.
