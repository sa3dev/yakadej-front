<?php

    // Get edenred return
    $edenredParams = $_GET;

    // Send it to the API and wait for the result
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,"http://127.0.0.1:8000/api/edenred/response");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'code' => $edenredParams['code'],
        'id_utilisateur' => substr(substr(base64_decode($edenredParams['state']), 3), 0, -4),
        'redirect_uri' => "https://www.yakadej.fr/edenred_token.php"
    ]));
    $curlResult = curl_exec($ch);
    curl_close($ch);
    $apiResult = json_decode($curlResult, true);
    header('Location: /basket/payement?retry=true');

?>