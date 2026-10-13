# Pic Cut

사진을 묶고 비교해 원하는 만큼 남기는 Android 앱입니다.

**[웹사이트](https://jonghyunseo.github.io/pic-cut-releases/) · [APK 다운로드](https://github.com/jonghyunseo/pic-cut-releases/releases/latest)**

**[같은 순간, 다른 픽 — 사진 취향 맞춰보기](https://jonghyunseo.github.io/pic-cut-releases/play/)**

설치 없이 반려견 사진 세 쌍을 고르고 친구와 선택을 비교합니다. 결과의 공유 버튼에서 카카오톡(기기 공유창·링크 복사), X, 페이스북으로 도전 링크를 보낼 수 있습니다. 상대의 실제 선택과 비교하며 개인 사진 업로드·로그인·방문 분석은 사용하지 않습니다. 도전 주소는 선택을 담고 있으므로 다른 사람에게 전달될 수 있습니다.

## 설치

Android 10 이상에서 릴리즈의 APK를 받아 설치하세요. 최초 설치 시 Android가 요청하는 앱 설치 권한을 허용해야 할 수 있습니다. 기존 앱과 같은 패키지명과 서명을 사용하므로 앱을 삭제하지 않고 업데이트할 수 있습니다. 현재 배포 APK는 기존 설치와 호환되는 debug 서명 빌드입니다.

## Obtainium

Obtainium의 앱 추가 화면에 다음 주소를 입력하세요. 공개 저장소라 GitHub 접근 토큰은 필요하지 않습니다.

```
https://github.com/jonghyunseo/pic-cut-releases
```

웹사이트의 ‘Obtainium으로 추가’ 버튼도 사용할 수 있습니다. 이 저장소의 Releases에 APK가 게시되면 Obtainium이 업데이트를 확인할 수 있습니다. 기기에서의 Obtainium 등록 및 차기 버전 업데이트 검증은 별도 단계입니다.

## 주요 기능

- 공식 Material 3 앱바·탭·사진 추가 버튼과 비교·선택 플로팅 도구

- 추천 탭에서 최근 추가된 연속 촬영 사진을 찾아 묶음으로 가져오기
- 추천 카드에서 여러 장 선택·숨기기·되돌리기, 기존 묶음에 새 사진 추가
- 갤러리에서 공유 → Pic Cut으로 새 묶음 시작
- 촬영 간격을 바탕으로 주변 사진 찾기, 가운데 범위로 시작, 여러 장 한 번에 추가
- 나눠보기·반반보기와 확대 연동으로 비교
- 모두 남김으로 시작, 필요한 사진만 제외·복원, 넘어가기와 반복 비교
- 원하는 만큼 남겨 갤러리 PicCut 폴더에 사본 저장·공유
- 픽 탭에는 실제 저장한 사진만 보관
- 제외한 원본의 이동·삭제는 별도로 실행

## 이 저장소

이곳은 설치파일과 웹사이트를 제공하는 공개 배포 저장소입니다. 앱 소스는 포함하지 않습니다. 릴리즈에는 APK, SHA256SUMS.txt, 변경 내용과 검증 결과가 함께 제공됩니다. 웹사이트의 예시 사진은 AI로 생성한 설명용 이미지입니다.

## 웹사이트 관리

정적 HTML/CSS/JavaScript이며 빌드 도구가 필요하지 않습니다. GitHub Pages는 `main` 브랜치 루트에서 제공합니다. 새 버전 공개 시 `release.json`과 `index.html`의 기본 다운로드 링크·버전·크기도 함께 갱신합니다. Obtainium은 이 파일이 아닌 GitHub Releases를 조회합니다. 앱 서명 유지와 versionCode 증가가 필수입니다.

글꼴: [Pretendard](https://github.com/orioncactus/pretendard), SIL Open Font License. 라이선스는 `assets/OFL.txt`에 포함되어 있습니다.
