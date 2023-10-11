<!DOCTYPE html>
<html>

<head>
    <style>
        /* Thiết lập CSS cho email */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        p {
            color: #555;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Welcome, you have registered an account</h1>
        <p>Thank you for registering an account at our website. Here is your information:</p>
        <ul>
            <li><strong>Username:</strong> {{ $user['username'] }}</li>
            <li><strong>Fullname:</strong> {{ $user['fullname'] }}</li>
            <li><strong>Email:</strong> {{ $user['email'] }}</li>
        </ul>
    </div>
</body>

</html>