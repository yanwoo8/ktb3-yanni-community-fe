// 로그인 확인
const currentUser = checkAuth();

// 게시글 작성 폼 처리
document.getElementById('createPostForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 입력값 가져오기
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageUrl = document.getElementById('imageUrl').value || null;

    const messageEl = document.getElementById('message');

    try {
        // API 호출
        await createPost(title, content, currentUser.id, imageUrl);

        // 성공 메시지
        messageEl.textContent = '게시글 작성 성공! 목록으로 이동합니다.';
        messageEl.className = 'message success';

        // 1초 후 게시글 목록으로 이동
        setTimeout(() => {
            window.location.href = 'posts.html';
        }, 1000);

    } catch (error) {
        // 에러 메시지 표시
        messageEl.textContent = error.message;
        messageEl.className = 'message';
    }
});
