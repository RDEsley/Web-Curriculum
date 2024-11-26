document.getElementById('login-form').addEventListener('submit', event => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('auth', 'true');
      window.location.href = 'admin.html';
    } else {
      alert('Usuário ou senha inválidos');
    }
  });
  