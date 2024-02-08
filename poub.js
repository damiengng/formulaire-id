const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
    })
        .then(response => response.json())
        .then(data => {
            setMessage(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};