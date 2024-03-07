<?php

//incluir a conexão
include("conexao.php");

//Obter dados
$obterDados = file_get_contents("php://input");

//Verificar se a decodificação foi bem sucedida
if (json_last_error() !== JSON_ERROR_NONE) {
  echo json_encode(array('error' => 'Erro ao decodificar dados'));
  exit; // Interromper a execução
}

//Extraia os dados do JSON
$extrair = json_decode($obterDados);

//Separar os dados do JSON
$nomeCurso = mysqli_real_escape_string($conexao, $extrair->cursos->nomeCurso);
$valorCurso = mysqli_real_escape_string($conexao, $extrair->cursos->valorCurso);

//SQL
$sql = "INSERT INTO cursos (nomeCurso, valorCurso) VALUES ('$nomeCurso', $valorCurso)";
mysqli_query($conexao, $sql);

//Exportar os dados cadastrados
$curso = [
    'nomeCurso' => $nomeCurso,
    'valorCurso' => $valorCurso
];

echo json_encode(['curso'=>$curso]);
?>
