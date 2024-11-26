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
  
 document.addEventListener('DOMContentLoaded', () => {
  const certificados = [
    { nome: "Richard Oliveira", instituicao: "CEUB", ano: 2023, url: "CV.pdf" },
    { nome: "Fernanda Kikuchi", instituicao: "CEUB", ano: 2023, url: "CV.pdf" },
    { nome: "Matheus Brandão", instituicao: "CEUB", ano: 2023, url: "CV.pdf" },
  ];

  const certificadosList = document.querySelector('.certificados-list');
  certificados.forEach(certificado => {
    const item = document.createElement('div');
    item.classList.add('certificado');
    item.innerHTML = `
      ${certificado.url
        ? `<a href="${certificado.url}" target="_blank" class="certificado-link">
             <h3>${certificado.nome}</h3>
             <p><strong>Instituição:</strong> ${certificado.instituicao}</p>
             <p><strong>Ano:</strong> ${certificado.ano}</p>
           </a>`
        : `<div>
             <h3>${certificado.nome}</h3>
             <p><strong>Instituição:</strong> ${certificado.instituicao}</p>
             <p><strong>Ano:</strong> ${certificado.ano}</p>
           </div>`}
    `;
    certificadosList.appendChild(item);
  });

  const carregarTema = () => {
    const tema = localStorage.getItem('tema') || 'claro';
    document.body.classList.toggle('dark-theme', tema === 'escuro');
    document.getElementById('theme-toggle').textContent = 
      tema === 'escuro' ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro';
  };

  carregarTema();

  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn.addEventListener('click', () => {
    const temaAtual = document.body.classList.toggle('dark-theme');
    localStorage.setItem('tema', temaAtual ? 'escuro' : 'claro');
    themeToggleBtn.textContent = temaAtual 
      ? 'Alternar para Tema Claro' 
      : 'Alternar para Tema Escuro';
  });
});

