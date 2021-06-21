<?php

    // Send it to the API and wait for the result
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,"http://127.0.0.1:8001/api/synchronisation/synchronise");
    $curlResult = curl_exec($ch);
    curl_close($ch);
    echo 'Synchro OK'

?>