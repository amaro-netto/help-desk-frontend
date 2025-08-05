# Frontend do Sistema de Chamados

Este é o repositório do frontend da aplicação de gerenciamento de chamados. A interface é construída para permitir que usuários, técnicos e administradores interajam com o sistema de forma intuitiva.

## Tecnologias

- **Next.js**: Framework de React para renderização do lado do servidor e roteamento.
- **React**: Biblioteca para construir a interface de usuário.
- **Tailwind CSS**: Framework de CSS para estilização rápida e responsiva.
- **Axios**: Para fazer requisições HTTP para a API do backend.
- **Socket.io-client**: Para comunicação em tempo real com o backend.
- **React-Toastify**: Para exibir notificações modernas.

## Configuração do Projeto

Para rodar o frontend localmente, siga estes passos:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/help-desk-frontend.git](https://github.com/SEU_USUARIO/help-desk-frontend.git)
    cd help-desk-frontend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    * Crie um arquivo `.env.local` na raiz do projeto.
    * Adicione a URL do seu backend.
    ```
    NEXT_PUBLIC_API_URL="http://localhost:3001"
    ```
    (Se o backend estiver online, use a URL do Railway).
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará acessível em `http://localhost:3000`.

## Funcionalidades

- **Tela de Login**: Autenticação de usuários.
- **Dashboard**: Visão geral de chamados com menu lateral retrátil.
- **Gerenciamento de Usuários**: Página para o administrador criar e gerenciar usuários.
- **Criação de Chamados**: Formulário para abrir novos tickets.
- **Detalhes de Chamados**: Página para ver e interagir com um chamado específico.
- **Notificações em Tempo Real**: Alertas de novos chamados via WebSockets.
