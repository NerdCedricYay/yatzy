<?php
require_once('_config.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dice Roll Test</title>
    <script src="/assets/jquery-3.7.1.min.js"></script>
</head>
<body>

<div id="die1">--</div>
<button id="roll">Roll</button>

<script>
console.log('jQuery version:', $.fn.jquery);

const die1 = $("#die1");
const roll = $("#roll");

roll.on("click", function() {
  $.ajax({
    type: "GET",
    url: "/api.php?action=roll",
    success: function(data) {
      console.log('AJAX response:', data);
      die1.html(data.value);
    },
    error: function(xhr, status, error) {
      console.error('AJAX error:', status, error);
    }
  });
});
</script>

</body>
</html>
