# 커뮤니티 프론트엔드

바닐라 JavaScript, HTML, CSS로 만든 간단한 커뮤니티 웹 애플리케이션입니다.

![HTML](https://img.shields.io/badge/HTML-gray?style=flat&logo=html5&logoColor=orange)
![CSS](https://img.shields.io/badge/CSS-gray?style=flat&logo=css&logoColor=blue)
![JavaScript](https://img.shields.io/badge/JavaScript-gray?style=flat&logo=javascript&logoColor=yellow)


## 📁 프로젝트 구조
```
FEproject/
├── index.html             # 메인 페이지
├── README.md              # 사용법 및 학습 가이드
├── features.md            # Figma 기반 페이지 기능명세서
├── pages/
│   ├── register.html      # 회원가입
│   ├── login.html         # 로그인
│   ├── edit-profile.html  # 회원 정보 수정
│   ├── posts.html         # 게시글 목록
│   ├── posts-detail.html  # 게시글 상세 조회
│   └── create-post.html   # 게시글 작성
├── css/
│   └── style.css          # 전체 스타일
└── js/
    ├── api.js             # API 호출 함수
    ├── utils.js           # 공통 함수 (날짜/숫자 포맷, 제목 자르기 등)
    ├── validation.js      # 인증 유효성 검증 로직
    ├── auth.js            # 인증 관리
    ├── register.js        # 회원가입 로직
    ├── login.js           # 로그인 로직
    ├── edit-profile.js    # 회원 정보 수정 로직
    ├── posts.js           # 게시글 목록
    ├── posts-detail.js    # 게시글 상세 조회
    └── create-post.js     # 게시글 작성
```

## 🚀 시작하기

### 1. 백엔드 서버 실행

1. 백엔드 API 서버 실행
```sh
git clone https://github.com/yanwoo8/ktb3-yanni-community-be.git
cd ktb3-yanni-community-be
./setup.sh
#uvicorn app.main:app
# http://localhost:3000 에서 실행됨
```

2. 프론트엔드 실행
```sh
cd ..
python -m http.server 3000
```



## 🎓 학습 포인트

### 1. fetch API 사용법
```javascript
const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

### 2. 로컬 스토리지 활용
```javascript
// 저장
localStorage.setItem('user', JSON.stringify(user));

// 불러오기
const user = JSON.parse(localStorage.getItem('user'));
```

### 3. DOM 조작
```javascript
// 폼 제출 이벤트 @ js/create-post.js
form.addEventListener('submit', async (e) => {
    e.preventDefault();  // 기본 동작 방지
    // 처리 로직
});

// innerHTML로 동적 생성
element.innerHTML = posts.map(post => `<div>...</div>`).join('');
```

### 4. async/await 비동기 처리
```javascript
async function displayPosts() {
    try {
        const posts = await getPosts();  // 비동기 대기
        // 데이터 처리
    } catch (error) {
        // 에러 처리
    }
}
```



## 📚 참고 자료

- [MDN - Fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
- [MDN - LocalStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)
- [MDN - async/await](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)
