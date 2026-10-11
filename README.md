# Pic Cut

사진을 묶고 비교해 원하는 만큼 남기는 Android 앱입니다.

**[웹사이트](https://jonghyunseo.github.io/pic-cut-releases/) · [APK 다운로드](https://github.com/jonghyunseo/pic-cut-releases/releases/latest)**

## 설치

Android 10 이상에서 릴리즈의 APK를 받아 설치하세요. 최초 설치 시 Android가 요청하는 앱 설치 권한을 허용해야 할 수 있습니다. 기존 앱과 같은 패키지명과 서명을 사용하므로 앱을 삭제하지 않고 업데이트할 수 있습니다. 현재 배포 APK는 기존 설치와 호환되는 debug 서명 빌드입니다.

## Obtainium

Obtainium의 앱 추가 화면에 다음 주소를 입력하세요. 공개 저장소라 GitHub 접근 토큰은 필요하지 않습니다.

```
https://github.com/jonghyunseo/pic-cut-releases
```

웹사이트의 ‘Obtainium으로 추가’ 버튼도 사용할 수 있습니다. 이 저장소의 Releases에 APK가 게시되면 Obtainium이 업데이트를 확인할 수 있습니다. 기기에서의 Obtainium 등록 및 차기 버전 업데이트 검증은 별도 단계입니다.

## 주요 기능

- 갤러리에서 공유 → Pic Cut으로 새 묶음 시작
- 촬영 간격을 바탕으로 주변 사진 찾기, 여러 장 한 번에 추가
- 나눠보기·반반보기와 확대 연동으로 비교
- 남김·제외 선택 전환, 되돌리기와 반복 비교
- 원하는 만큼 남겨 갤러리 PicCut 폴더에 사본 저장·공유
- 제외한 원본의 이동·삭제는 별도로 실행

## 이 저장소

이곳은 설치파일과 웹사이트를 제공하는 공개 배포 저장소입니다. 앱 소스는 포함하지 않습니다. 릴리즈에는 APK, SHA256SUMS.txt, 변경 내용과 검증 결과가 함께 제공됩니다. 웹사이트의 예시 사진은 AI로 생성한 설명용 이미지입니다.

## 웹사이트 관리

정적 HTML/CSS/JavaScript이며 빌드 도구가 필요하지 않습니다. GitHub Pages는 `main` 브랜치 루트에서 제공합니다. 새 버전 공개 시 `release.json`과 `index.html`의 기본 다운로드 링크·버전·크기도 함께 갱신합니다. Obtainium은 이 파일이 아닌 GitHub Releases를 조회합니다. 앱 서명 유지와 versionCode 증가가 필수입니다.

글꼴: [Pretendard](https://github.com/orioncactus/pretendard), SIL Open Font License. 라이선스는 `assets/OFL.txt`에 포함되어 있습니다.
