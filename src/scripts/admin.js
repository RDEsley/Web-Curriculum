// Adiciona certificado
document.getElementById('certificado-form').addEventListener('submit', event => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const instituicao = document.getElementById('instituicao').value;
    const ano = document.getElementById('ano').value;
    const url = document.getElementById('url').value;
  
    fetch('http://localhost:5000/api/certificados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, instituicao, ano, url })
    })
      .then(response => response.json())
      .then(() => window.location.reload());
  });
  
  // Exibe certificados
  fetch('http://localhost:5000/api/certificados')
    .then(response => response.json())
    .then(data => {
      const list = document.querySelector('.certificados-list');
      data.forEach(cert => {
        const div = document.createElement('div');
        div.className = 'certificado';
        div.innerHTML = `
          <h3>${cert.nome}</h3>
          <p><strong>Instituição:</strong> ${cert.instituicao}</p>
          <p><strong>Ano:</strong> ${cert.ano}</p>
          <button onclick="deleteCertificado(${cert.id})">Excluir</button>
        `;
        list.appendChild(div);
      });
    });
  
  // Deleta certificado
  function deleteCertificado(id) {
    fetch(`http://localhost:5000/api/certificados/${id}`, { method: 'DELETE' })
      .then(() => window.location.reload());
  }
  