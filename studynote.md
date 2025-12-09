# FE Study Note

### HTML / CSS / JavaScript

#### 1. HTML (HyperText Markup Language)

- 역할: 웹페이지의 구조와 내용
- 뼈대, 골격
- 텍스트, 이미지, 링크, 버튼 등의 요소 정의

#### 2. CSS (Cascading Style Sheets)

- 역할: 웹페이지의 디자인과 레이아웃
- 스타일, 꾸미기
- 색상, 크기, 위치, 애니메이션

#### 3. JavaScript
- 역할: 웹페이지의 동작과 인터랙션
- 동적 기능
- 사용자 입력 처리, 데이터 통신, DOM 조작



### DOM (Document Object Model): HTML 문서를 프로그래밍적으로 다룰 수 있게 해주는 인터페이스
- HTML 문서를 트리 구조의 객체로 표현한 것
- HTML 문서를 JavaScript로 조작할 수 있게 만든 객체 모델
- JavaScript가 웹페이지의 내용, 구조, 스타일을 읽고 변경할 수 있게 해줌
- 브라우저 메모리에 객체로 존재함, 실시간으로 조작
- 브라우저 개발자 도구 (F12) > Console
    ```
    console.log(document);       // DOM 전체 구조 확인
    console.log(document.body);  // body 요소 확인
    ```

1. HTML 파일 (디스크에 저장)
2. 브라우저가 읽음 (HTML 로드)
3. 브라우저 메모리에 DOM 객체 생성 (객체 트리)
4. JavaScript가 DOM 접근 가능 (브라우저 메모리에 있는 객체를 찾아서 변수에 저장)


```javascript
<!DOCTYPE html>
<html>
  <body>
    <h1>제목</h1>
    <p>내용</p>
  </body>
</html>
```

$$==$$

```
Document
  └─ html
      └─ body
          ├─ h1 ("제목")
          └─ p ("내용")
```