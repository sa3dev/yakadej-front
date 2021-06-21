<?php

    // Get payzen data
    $payzenData = $_POST;

    // Send it to the API and wait for the result
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,"http://127.0.0.1:8000/api/payzen/callback");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payzenData));
    $curlResult = curl_exec($ch);
    curl_close($ch);

    $apiResult = json_decode($curlResult, true);

    if ($apiResult['success'] === false) {
        header('Location: /basket/payement');
    } else {
        header('Location: /basket/congrats');
    }

?>