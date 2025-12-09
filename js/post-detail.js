// 로그인 확인
const currentUser = checkAuth();

// URL 파라미터에서 게시글 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// 현재 수정 중인 댓글 ID
let editingCommentId = null;

// 게시글 상세 정보 표시
async function displayPostDetail() {
    try {
        const post = await getPostDetail(postId);
        const postDetailEl = document.getElementById('postDetail');

        const isAuthor = post.author_id === currentUser.id;

        let html = '<div class="post-detail-header">';
        html += '<h1 class="post-detail-title">' + post.title + '</h1>';
        html += '<div class="post-detail-meta">';
        html += '<div class="post-author-info">';
        html += '<img src="' + post.author_profile_image + '" alt="프로필">';
        html += '<div>';
        html += '<div class="post-author">' + post.author_nickname + '</div>';
        html += '<div class="post-date">' + formatDateTime(post.created_at) + '</div>';
        html += '</div></div>';

        if (isAuthor) {
            html += '<div class="post-actions">';
            html += '<button onclick="goToEditPost()" class="edit-btn">수정</button>';
            html += '<button onclick="showDeletePostModal()" class="delete-btn-small">삭제</button>';
            html += '</div>';
        }

        html += '</div></div>';
        html += '<div class="post-detail-content">' + post.content;

        if (post.image_url) {
            html += '<img src="' + post.image_url + '" class="post-detail-image" alt="게시글 이미지">';
        }

        html += '</div>';
        html += '<div class="post-detail-stats">';
        html += '<button class="like-btn-detail ' + (post.is_liked ? 'liked' : '') + '" onclick="handleLike()">';
        html += '👍 좋아요 ' + formatNumber(post.likes) + '</button>';
        html += '<span>👁️ 조회수 ' + formatNumber(post.views) + '</span>';
        html += '<span>💬 댓글 ' + formatNumber(post.comment_count) + '</span>';
        html += '</div>';

        postDetailEl.innerHTML = html;

        // 댓글 목록 표시
        await displayComments();

    } catch (error) {
        alert('게시글을 불러오는데 실패했습니다: ' + error.message);
        window.location.href = 'posts.html';
    }
}

// 댓글 목록 표시
async function displayComments() {
    try {
        const comments = await getComments(postId);
        const commentsListEl = document.getElementById('commentsList');
        const commentCountEl = document.getElementById('commentCount');

        commentCountEl.textContent = comments.length;

        if (comments.length === 0) {
            commentsListEl.innerHTML = '<p class="no-comments">첫 댓글을 작성해보세요!</p>';
            return;
        }

        let html = '';
        comments.forEach(comment => {
            html += '<div class="comment-item">';
            html += '<img src="' + comment.author_profile_image + '" alt="프로필" class="comment-author-img">';
            html += '<div class="comment-content-wrapper">';
            html += '<div class="comment-header">';
            html += '<span class="comment-author">' + comment.author_nickname + '</span>';
            html += '<span class="comment-date">' + formatDateTime(comment.created_at) + '</span>';
            html += '</div>';
            html += '<div class="comment-text">' + comment.content + '</div>';

            if (comment.author_id === currentUser.id) {
                const escapedContent = comment.content.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
                html += '<div class="comment-actions">';
                html += '<button onclick="editComment(' + comment.id + ', \'' + escapedContent + '\')" class="comment-edit-btn">수정</button>';
                html += '<button onclick="showDeleteCommentModal(' + comment.id + ')" class="comment-delete-btn">삭제</button>';
                html += '</div>';
            }

            html += '</div></div>';
        });

        commentsListEl.innerHTML = html;

    } catch (error) {
        alert('댓글을 불러오는데 실패했습니다: ' + error.message);
    }
}

// 게시글 수정 페이지로 이동
function goToEditPost() {
    window.location.href = 'edit-post.html?id=' + postId;
}

// 게시글 삭제 모달 표시
function showDeletePostModal() {
    document.getElementById('deletePostModal').classList.add('show');
}

// 게시글 삭제
document.getElementById('confirmDeletePost').addEventListener('click', async () => {
    try {
        await deletePost(postId);
        alert('게시글이 삭제되었습니다.');
        window.location.href = 'posts.html';
    } catch (error) {
        alert('게시글 삭제 실패: ' + error.message);
    }
});

document.getElementById('cancelDeletePost').addEventListener('click', () => {
    document.getElementById('deletePostModal').classList.remove('show');
});

// 좋아요 처리
async function handleLike() {
    try {
        await toggleLike(postId, currentUser.id);
        displayPostDetail();
    } catch (error) {
        alert('좋아요 처리 실패: ' + error.message);
    }
}

// 댓글 입력창 활성화/비활성화
document.getElementById('commentInput').addEventListener('input', () => {
    const commentInput = document.getElementById('commentInput');
    const commentSubmitBtn = document.getElementById('commentSubmitBtn');
    commentSubmitBtn.disabled = commentInput.value.trim() === '';
});

// 댓글 등록/수정
document.getElementById('commentSubmitBtn').addEventListener('click', async () => {
    const commentInput = document.getElementById('commentInput');
    const content = commentInput.value.trim();

    if (!content) return;

    try {
        if (editingCommentId) {
            await updateComment(editingCommentId, content);
            alert('댓글이 수정되었습니다.');
            editingCommentId = null;
            document.getElementById('commentSubmitBtn').textContent = '댓글 등록';
        } else {
            await createComment(postId, content, currentUser.id);
        }

        commentInput.value = '';
        document.getElementById('commentSubmitBtn').disabled = true;
        await displayComments();
        await displayPostDetail();

    } catch (error) {
        alert('댓글 처리 실패: ' + error.message);
    }
});

// 댓글 수정 모드
function editComment(commentId, content) {
    editingCommentId = commentId;
    document.getElementById('commentInput').value = content;
    document.getElementById('commentSubmitBtn').textContent = '댓글 수정';
    document.getElementById('commentSubmitBtn').disabled = false;
    document.getElementById('commentInput').focus();
}

// 댓글 삭제 모달 표시
let deleteCommentId = null;
function showDeleteCommentModal(commentId) {
    deleteCommentId = commentId;
    document.getElementById('deleteCommentModal').classList.add('show');
}

// 댓글 삭제
document.getElementById('confirmDeleteComment').addEventListener('click', async () => {
    try {
        await deleteComment(deleteCommentId);
        document.getElementById('deleteCommentModal').classList.remove('show');
        await displayComments();
        await displayPostDetail();
    } catch (error) {
        alert('댓글 삭제 실패: ' + error.message);
    }
});

document.getElementById('cancelDeleteComment').addEventListener('click', () => {
    document.getElementById('deleteCommentModal').classList.remove('show');
});

// 모달 외부 클릭 시 닫기
document.getElementById('deletePostModal').addEventListener('click', (e) => {
    if (e.target.id === 'deletePostModal') {
        document.getElementById('deletePostModal').classList.remove('show');
    }
});

document.getElementById('deleteCommentModal').addEventListener('click', (e) => {
    if (e.target.id === 'deleteCommentModal') {
        document.getElementById('deleteCommentModal').classList.remove('show');
    }
});

// 페이지 로드 시 게시글 상세 정보 표시
if (!postId) {
    alert('잘못된 접근입니다.');
    window.location.href = 'posts.html';
} else {
    displayPostDetail();
}
