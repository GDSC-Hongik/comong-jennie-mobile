// POST 요청을 보내는 함수
const url1 = 'https://comong-jennie-server.onrender.com/main/major/'; // 요청을 보낼 URL
const data1 = 3; // 서버로 보낼 데이터
const data2= "al";

const postRequest = async (url, data) => {

    try {
      // fetch를 사용하여 POST 요청을 보냅니다
      const response = await fetch(url, {
        method: 'POST', // 요청 메서드
        headers: {
          'Content-Type': 'application/json', // 데이터 타입
        },
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
      });
  
      // Content-Type 헤더를 확인하여 JSON 응답을 처리합니다
    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      console.log('Response:', result);
      return result;
    } else {
      // JSON이 아닌 경우 텍스트로 응답을 읽습니다
      const result = await response.text();
      console.error('Expected JSON but got:', result);
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error during POST request:', error);
    throw error; // 오류를 발생시켜 상위 호출자에게 알립니다
  }
  };
  
  // 함수 호출
  postRequest(url1, data1);
  const url2 = `${url1}${data1}`;
  postRequest(url2, data2);
  