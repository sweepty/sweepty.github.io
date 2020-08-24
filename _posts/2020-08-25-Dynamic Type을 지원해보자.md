---
title:  "Flutter에서도 Dynamic Type을 지원해보자!"
last_modified_at: 2020-08-24T15:53:56-09:00
---

Flutter에서 Dynamic Type(Large font)를 지원해본 후기

### ❓Dynamic Type

Dynamic Type이란 사용자가 선택한 글씨 크기에 따라 앱에서도 그 크기에 맞게 UI를 보여주는 것을 말한다.

글자 크기 조절은 설정 > 디스플레이 및 밝기 > 텍스트 크기 에서도 할 수 있고 

더 큰 글씨를 사용하고 싶다면 설정 > 손쉬운 사용 > 디스플레이 및 밝기 > 더 큰 텍스트 에서도 설정할 수 있다.

<img src="https://user-images.githubusercontent.com/29784606/90987396-c4b90800-e5c5-11ea-958e-4b22d1cd5141.PNG" alt="손쉬운 사용에서 더 큰 텍스트를 설정하는 스크린샷" style="zoom:40%;" />





### 🤯 fixed size가 아니었다니!

사실 이 프로젝트에서 Dynamic Type을 지원할 예정은 없었다. 그런데 글자 크기를 크게하면 글자가 깨진다는 버그 리포트를 받았다. 당연히 폰트 사이즈를 지정해놓았기 때문에 고정된 값으로 보여질 것이라고 생각했는데 아니었던 것이다. 

아래 스크린샷은 손쉬운 사용 > 큰 텍스트 사용에서 4번째로 큰 크기로 설정했을 때의 모습이다.

<img src="https://user-images.githubusercontent.com/29784606/91066052-2b90fc80-e66c-11ea-8833-75355bbde41e.PNG" alt="before - home" style="zoom:25%;"/> <img src="https://user-images.githubusercontent.com/29784606/90982472-4303b300-e5a2-11ea-9cca-18c18ebcbe7a.PNG" alt="before supporting dynamic type - broof" style="zoom: 25%;" />

   <img src="https://user-images.githubusercontent.com/29784606/90981894-89571300-e59e-11ea-823f-f3807a74f974.PNG" alt="before supporting dynamic type - jeju detail" style="zoom:25%;" /> <img src="https://user-images.githubusercontent.com/29784606/91066233-714dc500-e66c-11ea-867f-dd3d8d050d6d.PNG" alt="before - setting" style="zoom:25%;" />


- 약관 리스트 부분에 Trailing 쪽 layout이 제대로 처리되지 않고 overflow되고 있음.
- 하단 확인/삭제 버튼 글자 잘림.
- 방문증 번호 글자 잘림.

iOS(Swift)의 경우에는 Dynamic Type을 지원하는 것이 옵셔널이었지만 [Flutter 공식문서 - accessibility](https://flutter.dev/docs/development/accessibility-and-localization/accessibility#large-fonts)에 따르면 Flutter는 친절하게도 Large font를 기본으로 지원한다고한다. 따라서 Flutter로 개발하는 앱들은 모두 글자 크기가 커졌을 때의 상황도 고려하여 앱을 구현해야 할 것이다.

### 🤓 그럼 본격적으로 Dynamic Type을 지원해보자!

사실 급한대로 그냥 textScaleFactor를 고정값으로 줘서 처리할까라는 생각도 해봤지만 이 프로젝트는 금융 앱 이자 제주도 코로나 방역 QR인증 앱 역할을 하고 있기 때문에 누구나 사용하는데 문제가 없어야한다는 생각이 더 컸다. 그래서 디자인 피드백을 받은 부분을 수정하는 김에 Dynamic Type 지원 작업을 같이 진행했다.  ~~그리고 사실 얼른 적용하고 싶은 마음이 굴뚝 같았음.~~ 

다음은 Refactoring을 진행하면서 보았던 케이스들이다.

  **1. 부모 위젯의 height가 고정 값이어서 글자 크기가 커지면 글자가 잘리는 경우**

코드를 살펴보니 과거의 내가 제플린에 있는대로 만드는 것에 급급했는지 height를 고정 값으로 준 곳이 많았는데 그런 곳들은 모두 Padding을 주는 것으로 변경했다. Padding을 주면 유동적인 content 값 + padding 값으로 계산이 되기 때문에 height 값을 유동적으로 줄 수 있었다.

  **2. ScrollView(SingleChildScrollView)가 필요했던 경우**

사실 이건 ICONex를 개발할 때 사수님이 짜신 코드를 보고 스크롤뷰를 넣어서 처리할 수 있다는 것을 알았었는데 이번에는 이 포인트를 놓쳐버렸다.. 그래서 필요한 부분들에 추가를 해주었다.

또 Alert에도 Dynamic Type을 지원하고 싶었는데 처리가 잘 안되어서 어떡하지라고 고민하고 있었는데 익명의 누군가님이 스크롤을 넣어야한다고 알려주신 덕분에 빠르게 해결할 수 있었다.

결론 ScrollView 최고 👍

  **3. Layout 구성이 올바르지 않았던 경우** 

글자 크기를 크게 한 상태에서 Column이나 Row에서 children 위젯들의 레이아웃을 잡을 때 생각처럼 잘 잡히지 않는 부분들이 있어서 테스트를 해보면서 이상적인 레이아웃으로 리팩토링했다. 

이 프로젝트는 뷰가 많은 편이 아니어서 금방할 줄 알았는데 레이아웃을 다시 짜야하는 곳도 있었고 내 머릿속에서 시뮬레이션한 결과와 다르게 보여지는 곳도 있어서 생각보다 시간이 더 걸린 것 같다. 그래도 Flutter로 개발해서 나름 빨리 적용할 수 있었다. ~~이런 장점은 인정해준다...~~

그 결과물!

<img src="https://user-images.githubusercontent.com/29784606/91065433-69d9ec00-e66b-11ea-9b50-bbd18f3ae538.PNG" alt="Support dynamic type - home" style="zoom:25%;" /> <img src="https://user-images.githubusercontent.com/29784606/91065405-5fb7ed80-e66b-11ea-9908-cef2902c7dc7.PNG" alt="Support dynamic type - tos" style="zoom:25%;" />

<img src="https://user-images.githubusercontent.com/29784606/91065652-b9b8b300-e66b-11ea-8807-6dd60eab6a87.PNG" alt="Support dynamic type - jeju" style="zoom:25%;" /><img src="https://user-images.githubusercontent.com/29784606/91065660-bae9e000-e66b-11ea-9ae8-208834f75542.PNG" alt="Support dynamic type - settings" style="zoom:25%;" />

아직 앱스토어에는 올라가지 않았고 아마 다음 배포에 포함이 되지 않을까 싶다. 얼른 배포하고 싶다!

### 🤠 아직 갈 길이 멀었다

Dynamic Type에 대해서 더 알아보다가 WWDC 2020 세션 비디오를 발견했다.

https://developer.apple.com/videos/play/wwdc2020/10020

<img src="https://user-images.githubusercontent.com/29784606/90982601-1b611a80-e5a3-11ea-9c71-300ef597e9e9.png" alt="wwdc2020 - Make your app visually accessible - Large Text" style="zoom:50%;" />



- [x] 큰 텍스트를 염두해두고 디자인하라.
- [x] label을 자르는 대신에 줄바꿈하라.
- [x] symbol과 glyphs는 text와 같이 조절되어야 한다.

앞으로 위 3가지를 염두해두고 개발하려고 한다!

쯩 앱에서는 아직 truncate로 처리하거나 textScaleFactor 1.0 이하로 고정 값을 줘서 처리한 곳들이 많다. 디자인요소를 해치지 않으면서 UI도 망가뜨리지 않고  구현하려다보니 고치기 어려워서 이렇게 처리한 것이긴 하다.. 그래도 찾아보면 방법이 더 있지 않을까 싶다!

예전부터 관심은 있었지만 못해보았던 접근성 지원을 Flutter에서 default로 지원하는 바람에 지원해보게 되었는데 정말 좋은 경험이었다. 앞으로도 레이아웃을 구성할 때 글자 크기가 클 때를 염두해두고 개발할 수 있을 것 같다. 그래도 아직 어렵긴 하다ㅎㅎ 다음에는 개인프로젝트에서도 Dynamic Type을 지원해보아야겠다.



다이나믹했던 dynamic type 적용기 끝!

