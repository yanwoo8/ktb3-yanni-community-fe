// API 기본 설정
const API_BASE_URL = 'http://localhost:8000';

// API 호출 함수
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // 데이터가 있으면 body에 추가
    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.detail || '오류가 발생했습니다');
        }

        return result;
    } catch (error) {
        throw error;
    }
}

// 회원가입 API
async function register(email, password, passwordConfirm, nickname, profileImage) {
    return await apiCall('/auth/register', 'POST', {
        email,
        password,
        password_confirm: passwordConfirm,
        nickname,
        profile_image: profileImage
    });
}

// 로그인 API
async function login(email, password) {
    return await apiCall('/auth/login', 'POST', {
        email,
        password
    });
}

// 게시글 목록 조회 API
async function getPosts() {
    return await apiCall('/posts');
}

// 게시글 작성 API
async function createPost(title, content, authorId, imageUrl = null) {
    return await apiCall('/posts', 'POST', {
        title,
        content,
        author_id: authorId,
        image_url: imageUrl
    });
}

// 좋아요 토글 API
async function toggleLike(postId, userId) {
    return await apiCall(`/posts/${postId}/like`, 'POST', {
        user_id: userId
    });
}

// 회원정보 수정 API
async function updateProfile(userId, nickname, password = null) {
    const data = { nickname };
    if (password) {
        data.password = password;
    }
    return await apiCall(`/users/${userId}`, 'PUT', data);
}

// 회원 탈퇴 API
async function deleteAccount(userId) {
    return await apiCall(`/users/${userId}`, 'DELETE');
}

// 닉네임 중복 확인 API
async function checkNicknameDuplicate(nickname) {
    return await apiCall(`/users/check-nickname?nickname=${encodeURIComponent(nickname)}`, 'GET');
}

// 게시글 상세 조회 API
async function getPostDetail(postId) {
    return await apiCall(`/posts/${postId}`);
}

// 게시글 수정 API
async function updatePost(postId, title, content, imageUrl = null) {
    const data = { title, content };
    if (imageUrl) {
        data.image_url = imageUrl;
    }
    return await apiCall(`/posts/${postId}`, 'PUT', data);
}

// 게시글 삭제 API
async function deletePost(postId) {
    return await apiCall(`/posts/${postId}`, 'DELETE');
}

// 댓글 목록 조회 API
async function getComments(postId) {
    return await apiCall(`/posts/${postId}/comments`);
}

// 댓글 작성 API
async function createComment(postId, content, authorId) {
    return await apiCall(`/posts/${postId}/comments`, 'POST', {
        content,
        author_id: authorId
    });
}

// 댓글 수정 API
async function updateComment(commentId, content) {
    return await apiCall(`/comments/${commentId}`, 'PUT', {
        content
    });
}

// 댓글 삭제 API
async function deleteComment(commentId) {
    return await apiCall(`/comments/${commentId}`, 'DELETE');
}
