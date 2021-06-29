export default function() {
  

  let rotas = [
    {
      title: "DashBoard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Meu Perfil",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/usuarios/meu-perfil",
    },
    {
      title: "Novo vacinado",
      to: "/funcionalidades/novo-vacinado",
      htmlBefore: '<i class="material-icons">add</i>',
      htmlAfter: ""
    },
    {
      title: "Visualizar alunos",
      htmlBefore: '<i class="material-icons">visibility</i>',
      to: "/alunos/listar",
    },
    {
      title: "Gerar Documentos",
      htmlBefore: '<i class="material-icons">file_present</i>',
      to: "/funcionalidades/gerar-documentos",
    },
    {
      title: "Meus Documentos",
      htmlBefore: '<i class="material-icons">folder</i>',
      to: "/funcionalidades/meus-arquivos",
    },
  ]
  

  rotas.push({
    title: "Sair",
    htmlBefore: '<i class="material-icons">logout</i>',
    to: "/sair",
  })


  return rotas;
}
