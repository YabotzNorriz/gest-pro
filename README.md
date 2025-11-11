# Gest-Pro

Um aplicativo de gerenciamento de projetos construído com Ionic, Angular e Firebase.

## Pré-requisitos

1.  Node.js (v20 ou superior, com base nas dependências do Capacitor/Angular)
2.  Ionic CLI (https://ionicframework.com/docs/cli)
    ```bash
    npm install -g @ionic/cli
    ```
3.  [Angular CLI](instalado globalmente)
    ```bash
    npm install -g @angular/cli
    ```

---

## Comandos para instalar

```bash
git clone [https://seu-repositorio.com/gest-pro.git](https://seu-repositorio.com/gest-pro.git)
```

```bash
cd gest-pro
```

```bash
npm install
```

---

Se o seguinte erro aparecer:

```bash
[ng] 14:05:25 [vite] (client) error while updating dependencies:
[ng] Error: EPERM: operation not permitted, rename 'H:\Github\gest-pro\.angular\cache\20.3.9\app\vite\deps_temp_2cec96d6' -> 'H:\Github\gest-pro\.angular\cache\20.3.9\app\vite\deps'
```

Para a execução do servidor e apague por completo a pasta `.angular` do projeto
