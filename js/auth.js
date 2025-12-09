// 로컬 스토리지에서 사용자 정보 가져오기
function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// 로컬 스토리지에 사용자 정보 저장
function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// 로그아웃
function logout() {
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}

// 로그인 체크 (페이지 로드 시)
function checkAuth() {
    const user = getUser();
    if (!user) {
        alert('로그인이 필요합니다');
        window.location.href = '../pages/login.html';
    }
    return user;
}

// 프로필 아이콘 설정
function setProfileIcon() {
    const user = getUser();
    const profileImage = document.getElementById('profileImage');
    const profilePlaceholder = document.getElementById('profilePlaceholder');

    if (user && user.profile_image) {
        // 프로필 이미지가 있으면 이미지 표시
        profileImage.src = user.profile_image;
        profileImage.style.display = 'block';
        profilePlaceholder.style.display = 'none';
    } else {
        // 프로필 이미지가 없으면 빈 동그라미 표시
        profileImage.style.display = 'none';
        profilePlaceholder.style.display = 'block';
    }
}

// 프로필 드롭다운 토글
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('show');
}

// 드롭다운 외부 클릭 시 닫기
function closeDropdownOnClickOutside(event) {
    const profileMenu = document.querySelector('.profile-menu');
    const dropdown = document.getElementById('profileDropdown');

    if (profileMenu && !profileMenu.contains(event.target)) {
        dropdown.classList.remove('show');
    }
}

// 로그아웃 버튼 및 프로필 메뉴 이벤트 추가
document.addEventListener('DOMContentLoaded', () => {
    // 프로필 아이콘 설정
    const profileIcon = document.getElementById('profileIcon');
    if (profileIcon) {
        setProfileIcon();

        // 프로필 아이콘 클릭 시 드롭다운 토글
        profileIcon.addEventListener('click', toggleProfileDropdown);

        // 문서 전체에 클릭 이벤트 추가 (드롭다운 외부 클릭 시 닫기)
        document.addEventListener('click', closeDropdownOnClickOutside);
    }

    // 로그아웃 버튼 이벤트
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});
