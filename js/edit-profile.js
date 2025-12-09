// 로그인 확인
const currentUser = checkAuth();

// 초기 닉네임 저장
let originalNickname = currentUser.nickname;
let originalPassword = '';

// 페이지 로드 시 기존 닉네임 설정
document.getElementById('nickname').value = currentUser.nickname;

// 토스트 메시지 표시
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 닉네임 실시간 검증
async function validateNicknameField() {
    const nickname = document.getElementById('nickname').value.trim();
    const nicknameValidation = validateNickname(nickname);

    if (nicknameValidation.type === 'empty') {
        showError('nicknameError', ERROR_MESSAGES.nickname.empty);
        return false;
    } else if (nicknameValidation.type === 'space') {
        showError('nicknameError', ERROR_MESSAGES.nickname.space);
        return false;
    } else if (nicknameValidation.type === 'length') {
        showError('nicknameError', ERROR_MESSAGES.nickname.lengthMax);
        return false;
    } else {
        // 닉네임이 변경되었고 유효한 경우 중복 확인
        if (nickname !== originalNickname) {
            try {
                await checkNicknameDuplicate(nickname);
                hideError('nicknameError');
                return true;
            } catch (error) {
                showError('nicknameError', ERROR_MESSAGES.nickname.duplicate);
                return false;
            }
        }
        hideError('nicknameError');
        return true;
    }
}

// 비밀번호 실시간 검증
function validatePasswordField() {
    const password = document.getElementById('password').value;
    const passwordValidation = validatePassword(password);

    if (passwordValidation.type === 'format') {
        showError('passwordError', ERROR_MESSAGES.password.format);
        return false;
    } else {
        hideError('passwordError');
        return true;
    }
}

// 입력 필드 이벤트 리스너
document.getElementById('nickname').addEventListener('blur', validateNicknameField);
document.getElementById('password').addEventListener('blur', validatePasswordField);

// 폼 제출 처리
document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nickname = document.getElementById('nickname').value.trim();
    const password = document.getElementById('password').value;

    // 유효성 검증
    const isNicknameValid = await validateNicknameField();
    const isPasswordValid = validatePasswordField();

    if (!isNicknameValid || !isPasswordValid) {
        return;
    }

    // 비밀번호 변경 확인
    if (password && password !== originalPassword) {
        const confirmChange = confirm('비밀번호를 변경하시겠습니까?');
        if (!confirmChange) {
            return;
        }
    }

    try {
        // API 호출
        const result = await updateProfile(currentUser.id, nickname, password || null);

        // 로컬 스토리지 업데이트
        const updatedUser = { ...currentUser, nickname: nickname };
        saveUser(updatedUser);

        // 토스트 메시지 표시
        showToast('수정완료');

        // 원본 닉네임 업데이트
        originalNickname = nickname;

        // 비밀번호 입력 필드 초기화
        document.getElementById('password').value = '';
        hideError('passwordError');

    } catch (error) {
        alert('회원정보 수정 실패: ' + error.message);
    }
});

// 회원 탈퇴 모달 관련
const deleteModal = document.getElementById('deleteModal');
const deleteAccountButton = document.getElementById('deleteAccountButton');
const cancelDeleteButton = document.getElementById('cancelDelete');
const confirmDeleteButton = document.getElementById('confirmDelete');

// 회원 탈퇴 버튼 클릭
deleteAccountButton.addEventListener('click', () => {
    deleteModal.classList.add('show');
});

// 취소 버튼 클릭
cancelDeleteButton.addEventListener('click', () => {
    deleteModal.classList.remove('show');
});

// 확인 버튼 클릭 (회원 탈퇴)
confirmDeleteButton.addEventListener('click', async () => {
    try {
        await deleteAccount(currentUser.id);

        // 로컬 스토리지에서 사용자 정보 삭제
        localStorage.removeItem('user');

        // 로그인 페이지로 이동
        alert('회원탈퇴가 완료되었습니다.');
        window.location.href = 'login.html';

    } catch (error) {
        alert('회원탈퇴 실패: ' + error.message);
        deleteModal.classList.remove('show');
    }
});

// 모달 외부 클릭 시 닫기
deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        deleteModal.classList.remove('show');
    }
});
