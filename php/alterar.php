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
$idCurso = mysqli_real_escape_string($conexao, $extrair->cursos->idCurso);
$nomeCurso = mysqli_real_escape_string($conexao, $extrair->cursos->nomeCurso);
$valorCurso = mysqli_real_escape_string($conexao, $extrair->cursos->valorCurso);

//SQL
$sql = "UPDATE cursos SET nomeCurso='$nomeCurso', valorCurso=$valorCurso WHERE idCurso=$idCurso";
mysqli_query($conexao, $sql);

//Exportar os dados cadastrados
$curso = [
    'idCurso' => $idCurso,
    'nomeCurso' => $nomeCurso,
    'valorCurso' => $valorCurso
];

echo json_encode(['curso'=>$curso]);

?>
