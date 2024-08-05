document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const url = 'https://comong-jennie-server.onrender.com/users/register/'; // 서버의 URL로 변경하세요.

    // 폼에서 사용자 입력 값을 가져옵니다.
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 보내고자 하는 데이터 객체
    const data = { username, email, password };

    // 요청 데이터 확인
    console.log('Request Data:', JSON.stringify(data));

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            console.error('Response status:', response.status);
            console.error('Response status text:', response.statusText);
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        console.log('Success:', responseData);

        // for (const key in responseData) {
        //     if (responseData.hasOwnProperty(key)) {
        //         console.log(`${key}: ${responseData[key]}`);
        //     }
        // }
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});
