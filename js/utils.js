// 공통 유틸리티 함수들

// 날짜 포맷 함수 (yyyy-mm-dd hh:mm:ss)
function formatDateTime(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

// 숫자 포맷 함수 (1000 이상은 1k, 10k, 100k로 표시)
function formatNumber(num) {
    if (num >= 100000) {
        return Math.floor(num / 1000) + 'k';
    } else if (num >= 10000) {
        return Math.floor(num / 1000) + 'k';
    } else if (num >= 1000) {
        return Math.floor(num / 1000) + 'k';
    }
    return num.toString();
}

// 제목 자르기 함수 (기본 26자)
function truncateTitle(title, maxLength = 26) {
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
    }
    return title;
}

// 텍스트 자르기 함수 (일반용)
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}
