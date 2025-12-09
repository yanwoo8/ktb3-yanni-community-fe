// 회원가입 버튼 활성화/비활성화 체크
function checkRegisterButtonState() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const nickname = document.getElementById('nickname').value.trim();
    const registerButton = document.getElementById('registerButton');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password).valid;
    const isPasswordConfirmValid = validatePasswordConfirm(password, passwordConfirm).valid;
    const isNicknameValid = validateNickname(nickname).valid;

    // 모두 유효하면 버튼 활성화
    registerButton.disabled = !(isEmailValid && isPasswordValid && isPasswordConfirmValid && isNicknameValid);
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

    checkRegisterButtonState();
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

    // 비밀번호가 변경되면 비밀번호 확인도 다시 검증
    validatePasswordConfirmField();
    checkRegisterButtonState();
}

function validatePasswordConfirmField() {
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    if (passwordConfirm === '') {
        hideError('passwordConfirmError');
    } else {
        const passwordConfirmValidation = validatePasswordConfirm(password, passwordConfirm);
        if (passwordConfirmValidation.type === 'empty') {
            showError('passwordConfirmError', ERROR_MESSAGES.passwordConfirm.empty);
        } else if (passwordConfirmValidation.type === 'mismatch') {
            showError('passwordConfirmError', ERROR_MESSAGES.passwordConfirm.mismatch);
        } else {
            hideError('passwordConfirmError');
        }
    }

    checkRegisterButtonState();
}

function validateNicknameField() {
    const nickname = document.getElementById('nickname').value.trim();

    if (nickname === '') {
        hideError('nicknameError');
    } else {
        const nicknameValidation = validateNickname(nickname);
        if (nicknameValidation.type === 'empty') {
            showError('nicknameError', ERROR_MESSAGES.nickname.empty);
        } else if (nicknameValidation.type === 'space') {
            showError('nicknameError', ERROR_MESSAGES.nickname.space);
        } else if (nicknameValidation.type === 'length') {
            showError('nicknameError', ERROR_MESSAGES.nickname.length);
        } else {
            hideError('nicknameError');
        }
    }

    checkRegisterButtonState();
}

// 입력 필드에 실시간 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('passwordConfirm');
    const nicknameInput = document.getElementById('nickname');

    // 이메일 입력 시 실시간 검증
    emailInput.addEventListener('input', validateEmailField);
    emailInput.addEventListener('blur', validateEmailField);

    // 비밀번호 입력 시 실시간 검증
    passwordInput.addEventListener('input', validatePasswordField);
    passwordInput.addEventListener('blur', validatePasswordField);

    // 비밀번호 확인 입력 시 실시간 검증
    passwordConfirmInput.addEventListener('input', validatePasswordConfirmField);
    passwordConfirmInput.addEventListener('blur', validatePasswordConfirmField);

    // 닉네임 입력 시 실시간 검증
    nicknameInput.addEventListener('input', validateNicknameField);
    nicknameInput.addEventListener('blur', validateNicknameField);
});

// 회원가입 폼 처리
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 입력값 가져오기
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const nickname = document.getElementById('nickname').value.trim();
    const profileImage = document.getElementById('profileImage').value.trim();

    const messageEl = document.getElementById('message');

    try {
        // API 호출 (프로필 이미지는 선택사항이므로 빈 값일 수 있음)
        const result = await register(email, password, passwordConfirm, nickname, profileImage);

        // 성공 메시지
        messageEl.textContent = '회원가입 성공! 로그인 페이지로 이동합니다.';
        messageEl.className = 'message success';

        // 2초 후 로그인 페이지로 이동
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

    } catch (error) {
        // 에러 메시지 표시
        messageEl.textContent = error.message;
        messageEl.className = 'message';
    }
});
