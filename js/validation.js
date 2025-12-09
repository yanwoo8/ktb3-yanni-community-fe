// 공통 유효성 검증 함수들

// 이메일 유효성 검증
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 비밀번호 유효성 검증
function validatePassword(password) {
    // 비밀번호가 비어있는지 확인
    if (!password || password.trim() === '') {
        return { valid: false, type: 'empty' };
    }

    // 8자 이상, 20자 이하
    if (password.length < 8 || password.length > 20) {
        return { valid: false, type: 'format' };
    }

    // 대문자, 소문자, 숫자, 특수문자 각각 최소 1개 포함
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        return { valid: false, type: 'format' };
    }

    return { valid: true, type: 'valid' };
}

// 비밀번호 확인 유효성 검증
function validatePasswordConfirm(password, passwordConfirm) {
    if (!passwordConfirm || passwordConfirm.trim() === '') {
        return { valid: false, type: 'empty' };
    }

    if (password !== passwordConfirm) {
        return { valid: false, type: 'mismatch' };
    }

    return { valid: true, type: 'valid' };
}

// 닉네임 유효성 검증
function validateNickname(nickname) {
    if (!nickname || nickname.trim() === '') {
        return { valid: false, type: 'empty' };
    }

    // 띄어쓰기 확인
    if (nickname.includes(' ')) {
        return { valid: false, type: 'space' };
    }

    // 2자 이상, 10자 이하
    if (nickname.length < 2 || nickname.length > 10) {
        return { valid: false, type: 'length' };
    }

    return { valid: true, type: 'valid' };
}

// 에러 메시지 표시 함수
function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

// 에러 메시지 숨김 함수
function hideError(elementId) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }
}

// 에러 메시지 상수
const ERROR_MESSAGES = {
    email: {
        invalid: '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)'
    },
    password: {
        empty: '*비밀번호를 입력해주세요',
        format: '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
    },
    passwordConfirm: {
        empty: '*비밀번호 확인을 입력해주세요',
        mismatch: '*비밀번호가 일치하지 않습니다'
    },
    nickname: {
        empty: '*닉네임을 입력해주세요',
        space: '*띄어쓰기를 없애주세요',
        length: '*닉네임은 2자 이상, 10자 이하로 입력해주세요',
        lengthMax: '*닉네임은 최대 10자 까지 작성 가능합니다.',
        duplicate: '*중복된 닉네임 입니다.'
    },
    login: {
        failed: '*아이디 또는 비밀번호를 확인해주세요'
    }
};
