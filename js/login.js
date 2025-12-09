// 로그인 버튼 활성화/비활성화 체크
function checkLoginButtonState() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('loginButton');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password).valid;

    // 둘 다 유효하면 버튼 활성화
    loginButton.disabled = !(isEmailValid && isPasswordValid);
}

// 실시간 유효성 검증 및 에러 메시지 표시
function validateEmailField() {
    const email = document.getElementById('email').value.trim();

    if (email === '') {
        hideError('emailError');
    } else if (!validateEmail(email)) {
        showError('emailError', ERROR_MESSAGES.email.invalid);
    } else {
        hideError('emailError');
    }

    checkLoginButtonState();
}

function validatePasswordField() {
    const password = document.getElementById('password').value;

    if (password === '') {
        hideError('passwordError');
    } else {
        const passwordValidation = validatePassword(password);
        if (passwordValidation.type === 'empty') {
            showError('passwordError', ERROR_MESSAGES.password.empty);
        } else if (passwordValidation.type === 'format') {
            showError('passwordError', ERROR_MESSAGES.password.format);
        } else {
            hideError('passwordError');
        }
    }

    checkLoginButtonState();
}

// 입력 필드에 실시간 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // 이메일 입력 시 실시간 검증
    emailInput.addEventListener('input', validateEmailField);
    emailInput.addEventListener('blur', validateEmailField);

    // 비밀번호 입력 시 실시간 검증
    passwordInput.addEventListener('input', validatePasswordField);
    passwordInput.addEventListener('blur', validatePasswordField);
});

// 로그인 폼 처리
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 입력값 가져오기
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        // API 호출
        const result = await login(email, password);

        // 사용자 정보 저장 (로컬 스토리지)
        saveUser(result);

        // 성공 메시지 (현재는 미출력)
        const messageEl = document.getElementById('message');
        messageEl.textContent = '로그인 성공! 게시글 목록으로 이동합니다.';
        messageEl.className = 'message success';

        // 0초 후 게시글 페이지로 이동 (미출력)
        setTimeout(() => {
            window.location.href = 'posts.html';
        }, 0);

    } catch (error) {
        // 로그인 실패 시 비밀번호 에러 메시지 표시
        showError('passwordError', ERROR_MESSAGES.login.failed);
    }
});
