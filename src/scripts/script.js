// Lista de certificados e cursos
const certificados = [
    { nome: "Richard Oliveira", instituicao: "CEUB", ano: 2023, url: "CV.pdf" },
    { nome: "Fernanda Kikuchi", instituicao: "CEUB", ano: 2023, url: "CV.pdf" },
    { nome: "Matheus Brandão", instituicao: "CEUB", ano: 2023, url: "CV.pdf" },
  ];
  
  // Seleciona o container de certificados
  const certificadosList = document.querySelector(".certificados-list");
  
  // Adiciona os certificados dinamicamente
  certificados.forEach((certificado) => {
    const item = document.createElement("div");
    item.classList.add("certificado");
  
    // Verifica se a URL está definida e cria um link
    if (certificado.url) {
      item.innerHTML = `
        <a href="${certificado.url}" target="_blank" class="certificado-link">
          <h3>${certificado.nome}</h3>
          <p><strong>Instituição:</strong> ${certificado.instituicao}</p>
          <p><strong>Ano:</strong> ${certificado.ano}</p>
        </a>
      `;
    } else {
      item.innerHTML = `
        <div class="certificado-link">
          <h3>${certificado.nome}</h3>
          <p><strong>Instituição:</strong> ${certificado.instituicao}</p>
          <p><strong>Ano:</strong> ${certificado.ano}</p>
        </div>
      `;
      item.addEventListener("click", () => {
        alert(
          `O certificado "${certificado.nome}" ainda não possui um PDF disponível ou está em Desenvolvimento.`
        );
      });
    }
  
    certificadosList.appendChild(item);
  });
  
  // Função para carregar o tema preferido do localStorage
  const carregarTema = () => {
    if (localStorage.getItem("tema") === "escuro") {
      document.body.classList.add("dark-theme");
      document.getElementById("theme-toggle").textContent =
        "Alternar para Tema Claro";
    } else {
      document.body.classList.remove("dark-theme");
      document.getElementById("theme-toggle").textContent =
        "Alternar para Tema Escuro";
    }
  };
  
  // Carregar tema ao iniciar a página
  carregarTema();
  
  // Seleciona o botão de alternância de tema
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  // Alterna entre os temas e salva a preferência no localStorage
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  
    if (document.body.classList.contains("dark-theme")) {
      themeToggleBtn.textContent = "Alternar para Tema Claro";
      localStorage.setItem("tema", "escuro");
    } else {
      themeToggleBtn.textContent = "Alternar para Tema Escuro";
      localStorage.removeItem("tema");
    }
  });
  
  