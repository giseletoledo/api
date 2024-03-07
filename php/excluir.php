<?php

// Incluir a conexão
include("conexao.php");


$idCurso = $_GET['idCurso'];


// Excluir curso
$sql = "DELETE FROM cursos WHERE idCurso = ?";
$stmt = mysqli_prepare($conexao, $sql);
mysqli_stmt_bind_param($stmt, "i", $idCurso);
$result = mysqli_stmt_execute($stmt);


// Verificar se a exclusão foi bem sucedida
if ($result) {
    if (mysqli_stmt_affected_rows($stmt) === 1) {
        echo json_encode(array('success' => 'Curso deletado com sucesso!'));
    } else {
        echo json_encode(array('error' => 'Curso não encontrado ou já deletado.'));
    }
} else {
    echo json_encode(array('error' => 'Erro ao executar a operação de exclusão.'));
}

mysqli_stmt_close($stmt);
?>