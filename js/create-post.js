// 로그인 확인
const currentUser = checkAuth();

// 게시글 작성 폼 처리

// 1. 폼 찾기 & 2. 제출 이벤트 리스너 등록
document.getElementById('createPostForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // 3. 폼 제출 기본 동작 (페이지 새로고침/이동) 방지

    // 4. 입력값 가져오기
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageUrl = document.getElementById('imageUrl').value || null;

    // 5. 메시지 표시 엘리먼트 가져오기
    const messageEl = document.getElementById('message');

    try {
        // 6. API 호출 (JWT 토큰으로 자동 인증, author_id 불필요)
        await createPost(title, content, imageUrl);

        // 7. 성공 메시지 표시
        messageEl.textContent = '게시글 작성 성공! 목록으로 이동합니다.';
        messageEl.className = 'message success';

        // 8. 1초 후 게시글 목록으로 이동
        setTimeout(() => {
            window.location.href = 'posts.html';
        }, 1000);

    } catch (error) {
        // 9. 실패 시 에러 메시지 표시
        messageEl.textContent = error.message;
        messageEl.className = 'message';
    }
});
