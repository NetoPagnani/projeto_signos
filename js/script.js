document
  .getElementById("signo-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const dataNascimento = new Date(
      document.getElementById("datanascimento").value
    );
    const mes = dataNascimento.getMonth() + 1;
    const dia = dataNascimento.getDate();

    fetch("signos.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const signo = data.signos.find((s) => {
          const [diaInicio, mesInicio] = s.dataInicio.split("-").map(Number);
          const [diaFim, mesFim] = s.dataFim.split("-").map(Number);
          return (
            (mes === mesInicio && dia >= diaInicio) ||
            (mes === mesFim && dia <= diaFim)
          );
        });
        if (signo) {
          document.getElementById("resultado-signo").innerHTML = `
          <h2> Seu Signo é: ${signo.nome}</h2>
          <p>${signo.descricao}</p>
          <img src="${signo.imagem}" alt="${signo.nome}">
          <button><a href='./index.html'>Voltar</a></button>
          `;
          document.getElementById("container").className = "card_oculto";
          document.getElementById("resultado-signo").className =
            "resultado-signo";
        } else {
          document.getElementById(
            "resultado-signo"
          ).innerHTML = `<p>Data de nascimento inválida.</p>`;
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar arquivo JSON:", error);
      });
  });
