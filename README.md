# 으능정이 우송 - 김밥 주문 앱 데모

우송대학교 근처 '으능정이꼬마김밥 우송대점'을 위한 데모 웹앱입니다.

## 📱 데모 소개

이 데모는 사장님께 앱 컨셉을 소개하기 위한 프로토타입입니다.
5종류의 김밥 메뉴로 심플하게 구성되어 있으며, 핵심 기능들의 UI/UX를 체험할 수 있습니다.

### 🎯 주요 기능
- **멤버십 시스템**: 학생 전용 할인 혜택
- **스마트 주문**: 즉시픽업/예약주문/배달
- **실시간 알림**: 주문 상태 추적
- **관리자 대시보드**: 실시간 주문 관리
- **다국어 지원**: 유학생 친화적 UI
- **학생 지원 기금**: 수익 일부 환원

## 🛠 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Firestore, Authentication, Cloud Messaging)
- **Hosting**: GitHub Pages (무료)
- **Design**: 반응형 웹디자인 (모바일 최적화)

## 📁 파일 구조

```
gimbap-demo/
├── index.html          # 메인 로그인/회원가입 화면
├── menu.html           # 메뉴 화면
├── order.html          # 주문 화면
├── admin.html          # 관리자 대시보드
├── style.css           # 통합 스타일시트
├── app.js              # 메인 JavaScript
├── firebase-config.js  # Firebase 설정 (사용자가 설정)
└── README.md           # 이 파일
```

## 🚀 설치 및 실행 방법

### 1. 파일 다운로드
모든 파일을 로컬 디렉토리에 다운로드합니다.

### 2. Firebase 프로젝트 설정 (선택사항)
실제 데이터베이스 연동을 원하는 경우:

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Authentication, Firestore Database, Cloud Messaging 활성화
3. Web 앱 추가 후 설정 정보를 `firebase-config.js`에 입력

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### 3. 로컬 서버 실행
```bash
# Python 3 사용 시
python -m http.server 3000

# Python 2 사용 시  
python -m SimpleHTTPServer 3000

# Node.js 사용 시
npx serve .
```

### 4. 브라우저에서 접속
`http://localhost:3000`에서 데모를 확인할 수 있습니다.

## 🌐 GitHub Pages 배포

### 1. GitHub 저장소 생성
새 저장소를 생성하고 모든 파일을 업로드합니다.

### 2. GitHub Pages 활성화
- 저장소 Settings > Pages
- Source: "Deploy from a branch"
- Branch: "main" 선택
- Save 클릭

### 3. 배포 URL 확인
약 5-10분 후 `https://your-username.github.io/repository-name`에서 접속 가능합니다.

## 📱 사용 방법

### 사용자 앱 체험

1. **첫 방문**: 스플래시 화면 → 웰컴 화면
2. **회원가입**: 학생 정보 입력 → 멤버십 혜택 확인
3. **메뉴 탐색**: 인기메뉴 → 카테고리별 메뉴 → 이벤트 확인
4. **주문하기**: 장바구니 담기 → 주문방식 선택 → 결제 진행
5. **주문 추적**: 실시간 상태 확인 → 픽업 완료

### 관리자 대시보드 체험

`admin.html`에 직접 접속하여 관리자 기능을 체험할 수 있습니다:

- 실시간 주문 현황
- 주문 상태 업데이트
- 메뉴 관리
- 이벤트 생성
- 매출 통계
- 학생 지원 기금 현황

## 🎨 디자인 컨셉

### 브랜드 컬러
- **주황색** (#FF8A3D): 따뜻함, 맛있는 김밥
- **초록색** (#4CAF50): 신선함, 건강한 재료
- **베이지** (#F5E6D3): 편안함, 집밥 느낌

### UX 철학
- **학생 중심**: 바쁜 학생들의 편의성 최우선
- **직관적**: 복잡한 설명 없이도 쉽게 사용
- **감성적**: 단순한 주문을 넘어선 따뜻한 경험
- **포용적**: 유학생도 쉽게 사용할 수 있는 인터페이스

## 🧪 데모 기능 상세

### 작동하는 기능 ✅
- 회원가입/로그인 UI
- 메뉴 탐색 및 장바구니
- 주문 프로세스 (UI/UX 흐름)
- 관리자 대시보드 (정적 데이터)
- 반응형 디자인

### 시뮬레이션 기능 ⚠️
- 실제 결제 (데모 메시지만 표시)
- 실시간 알림 (로컬 토스트만)
- Firebase 연동 (설정 시에만 작동)

### 준비 중인 기능 🚧
- 실제 SMS/푸시 알림
- 결제 게이트웨이 연동
- 위치 기반 배달 서비스
- 고급 분석 대시보드

## 📊 확장 계획

### Phase 1: MVP (4-6주)
현재 데모를 기반으로 실제 작동하는 앱 개발

### Phase 2: 고급 기능 (2-3개월)
- 예약 주문 시스템
- 다국어 완전 지원
- 개인화 추천
- 고급 분석

### Phase 3: 플랫폼화 (6개월)
- 다른 음식점 입점
- 캠퍼스 통합 서비스
- AI 기반 기능들

## 🔧 개발자 정보

### 커스터마이징 가이드

**색상 변경**:
```css
:root {
    --primary-color: #FF8A3D;    /* 메인 색상 */
    --secondary-color: #4CAF50;   /* 보조 색상 */
    --accent-color: #F5E6D3;     /* 강조 색상 */
}
```

**메뉴 데이터 수정**:
`app.js`의 `menuData` 객체에서 메뉴 정보 수정 가능

**브랜드명 변경**:
HTML 파일들에서 "으능정이 우송" 텍스트 일괄 변경

## 📞 문의사항

이 데모에 대한 문의나 실제 개발 의뢰는 개발자에게 연락바랍니다.

### 주요 특징
- ✨ **설득력 있는 UI/UX**: 실제 앱과 동일한 느낌
- 🚀 **빠른 체험**: 복잡한 설치 없이 바로 체험
- 💰 **비용 효율적**: 무료 호스팅으로 데모 운영
- 📱 **모바일 최적화**: 실제 앱 사용감과 동일
- 🎯 **컨셉 완성도**: 80% 이상의 기능 구성

---

**데모 버전**: v1.0.0  
**최종 업데이트**: 2024년 12월  
**호환성**: 모든 모던 브라우저, 모바일 최적화