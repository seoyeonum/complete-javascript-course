# Pig Game

![프로젝트 캡처](./assets/3.while_game.JPG)

## 🎲 프로젝트 소개
- JavaScript 를 기반으로 하는 클라이언트 사이드 웹 어플리케이션
- 번갈아 주사위를 굴려 먼저 100점을 획득하는 플레이어가 승리하는 간단한 게임

### 개발 목표
1. JavaScript 에 대한 기초 학습을 기반으로 DOM 요소와 Events 요소를 활용한 프로젝트를 진행해보자.
2. 별도의 서버를 구축하지 않아도 실행 가능한 클라이언트 사이드 웹 어플리케이션을 구현해보자.
3. 간단한 게임을 진행하는 동안 CSS 속성을 적극적으로 활용 및 변경해보자.

### 개발 기간
- 2025.08.18. ~ 2025.08.19. (2 days)

### 개발 인원
- 1명 (본인)

## 📁 파일 구조
```
07-Pig-Game/
 ├ final/
 └ starter/
   ├ script.js
   ├ index.html
   ├ style.css
   ├ README.md
   └ ...
```
## 📚 사용 기술
### Frontend
- JavaScript, HTML, CSS : 웹 페이지의 기본 구조와 스타일 구성 및 사용자와 상호작용하는 동적 기능 구현
### Tool
- Git : 버전 관리와 코드 변경 이력 추적
- GitHub : 원격 저장소를 활용한 코드 작업 접근성 향상
- Visual Studio Code : JavaScript 기반 프로젝트의 코드 작성·실행·디버깅 지원

## ✨ 주요 기능
- 주사위 굴리기
- 주사위 멈추기 (플레이 턴 변경)
- 게임 승자 표시 (게임 종료)
- 게임 초기화

## 🚀 실행 방법
```
git clone https://github.com/seoyeonum/complete-javascript-course.git
cd complete-javascript-course/07-Pig-Game/starter
index.html (브라우저에서 직접 실행)
```

## 💭 회고
- 이전에는 깊게 다루지 못했던 JavaScript(ES6)를 **변수 타입부터 꼼꼼하게 학습**했다.
- 예제를 보았을 때는 구현하기 어려운 부분이라고 생각했던 기능들도 시간을 두고 고민하면 충분히 **현재의 내가 스스로 구현할 수 있다**는 것을 깨닫고 자신감을 많이 채웠다.

- 첫 프로젝트를 Oracle 기반의 DB를 두고 진행했기에 서버를 별도로 두지 않는 **클라이언트 사이드 웹 어플리케이션**의 개념이 조금은 낯설었다.
- 그러나 별도의 File 시스템이나 DB 없이도 주사위 게임과 같은 간단한 프로그램은 브라우저 환경만으로도 구현되고 운영될 수 있다는 점이 새로웠다.