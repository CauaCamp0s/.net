@echo off
echo 🚀 Testando Biblioteca API...
echo Base URL: http://localhost:5000
echo.

REM Aguardar API inicializar
timeout /t 3 /nobreak >nul

echo 📚 Teste 1: Criando livro...
curl -X POST "http://localhost:5000/api/livros" ^
  -H "Content-Type: application/json" ^
  -d "{\"titulo\":\"Clean Code\",\"autor\":\"Robert C. Martin\",\"anoPublicacao\":2008,\"genero\":\"Programação\"}" ^
  -w "\nStatus: %%{http_code}\n" ^
  -s

echo.
echo 👤 Teste 2: Criando usuário...
curl -X POST "http://localhost:5000/api/usuarios" ^
  -H "Content-Type: application/json" ^
  -d "{\"nome\":\"João Silva\",\"email\":\"joao@email.com\",\"telefone\":\"(11) 99999-9999\"}" ^
  -w "\nStatus: %%{http_code}\n" ^
  -s

echo.
echo 📚 Teste 3: Listando livros...
curl -X GET "http://localhost:5000/api/livros" ^
  -H "Content-Type: application/json" ^
  -w "\nStatus: %%{http_code}\n" ^
  -s

echo.
echo 👥 Teste 4: Listando usuários...
curl -X GET "http://localhost:5000/api/usuarios" ^
  -H "Content-Type: application/json" ^
  -w "\nStatus: %%{http_code}\n" ^
  -s

echo.
echo 📖 Teste 5: Criando empréstimo...
curl -X POST "http://localhost:5000/api/emprestimos" ^
  -H "Content-Type: application/json" ^
  -d "{\"livroId\":\"64f8b1234567890abcdef123\",\"usuarioId\":\"64f8b1234567890abcdef456\"}" ^
  -w "\nStatus: %%{http_code}\n" ^
  -s

echo.
echo 📋 Teste 6: Listando empréstimos...
curl -X GET "http://localhost:5000/api/emprestimos" ^
  -H "Content-Type: application/json" ^
  -w "\nStatus: %%{http_code}\n" ^
  -s

echo.
echo 🎉 Testes concluídos!
echo.
echo Para testar manualmente:
echo 1. Acesse: http://localhost:5000/swagger
echo 2. Ou use o Insomnia com o arquivo: insomnia-biblioteca-api.json
echo.
pause
