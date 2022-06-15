API 설명
=========================

### 필요한 모듈
axios, querystring

npm install axios
npm install querystring


### translate
: { query }
-> { translatedText }

한국어 -> 영어 -> 한국어 순으로 번역합니다.

input, output type은 모두 string 입니다.

ex) translateKor('비긴 어게인') -> return value: '다시 시작하다'


### translateKor
: { query }
-> { translatedText }

한국어를 입력으로 받아 영어로 번역합니다.

ex) translateKor('비긴 어게인') -> return value: 'Begin Again'


### translateEn
: { query }
-> { translatedText }

영어어를 입력으로 받아 한국어로 번역합니다.

ex) translateEn('Begin Again') -> return value: '다시 시작하다'