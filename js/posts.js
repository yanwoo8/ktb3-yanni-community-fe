// 로그인 확인
const currentUser = checkAuth();

// 게시글 목록 표시
async function displayPosts() {
    try {
        const response = await getPosts();
        const posts = response.data || [];  // API 응답에서 data 추출
        const postsListEl = document.getElementById('postsList');

        if (posts.length === 0) {
            postsListEl.innerHTML = '<p>게시글이 없습니다.</p>';
            return;
        }

        postsListEl.innerHTML = posts.map(post => `
            <div class="post-card" onclick="goToPostDetail(${post.id})">
                <div class="post-header">
                    <img src="${post.author_profile_image}" alt="프로필">
                    <div>
                        <div class="post-author">${post.author_nickname}</div>
                        <div style="font-size: 12px; color: #999;">${formatDateTime(post.created_at)}</div>
                    </div>
                </div>
                <div class="post-title">${truncateTitle(post.title)}</div>
                <div class="post-content">${post.content}</div>
                ${post.image_url ? `<img src="${post.image_url}" class="post-image" alt="게시글 이미지">` : ''}
                <div class="post-footer">
                    <button class="like-btn" onclick="handleLike(event, ${post.id})">
                        👍 좋아요 ${formatNumber(post.likes)}
                    </button>
                    <span>👁️ 조회수 ${formatNumber(post.views)}</span>
                    <span>💬 댓글 ${formatNumber(post.comment_count)}</span>
                </div>
            </div>
        `).join('');

    } catch (error) {
        alert('게시글을 불러오는데 실패했습니다: ' + error.message);
    }
}

// 게시글 상세 페이지로 이동
function goToPostDetail(postId) {
    window.location.href = `post-detail.html?id=${postId}`;
}

// 좋아요 처리
async function handleLike(event, postId) {
    // 이벤트 버블링 방지 (카드 클릭 이벤트가 발생하지 않도록)
    event.stopPropagation();

    try {
        await toggleLike(postId, currentUser.id);
        displayPosts(); // 목록 새로고침
    } catch (error) {
        alert('좋아요 처리 실패: ' + error.message);
    }
}

// 페이지 로드 시 게시글 목록 표시
displayPosts();
