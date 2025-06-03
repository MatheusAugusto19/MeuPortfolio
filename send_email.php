<?php
// Define o tipo de conteúdo da resposta como JSON
header('Content-Type: application/json');

// Cria um array para a resposta
$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Limpa e valida os dados recebidos do formulário
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    // Validação básica
    if (!empty($name) && filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($message)) {
        
        $to = "matheusaugu327@gmail.com";
        $subject = "Nova Mensagem do Portfólio de: $name";
        $body = "Nome: $name\n";
        $body .= "Email: $email\n\n";
        $body .= "Mensagem:\n$message";
        $headers = "From: no-reply@yourdomain.com\r\n"; // É uma boa prática usar um e-mail do seu domínio
        $headers .= "Reply-To: $email\r\n";

        if (mail($to, $subject, $body, $headers)) {
            // Sucesso
            $response['status'] = 'success';
            $response['message'] = 'E-mail enviado com sucesso! Obrigado pelo contato.';
        } else {
            // Erro no servidor
            $response['status'] = 'error';
            $response['message'] = 'Erro ao enviar o e-mail. Tente novamente mais tarde.';
        }

    } else {
        // Erro de validação dos campos
        $response['status'] = 'error';
        $response['message'] = 'Por favor, preencha todos os campos corretamente.';
    }

} else {
    // Método de requisição inválido
    $response['status'] = 'error';
    $response['message'] = 'Método de requisição inválido.';
}

// Envia a resposta em formato JSON
echo json_encode($response);
?>