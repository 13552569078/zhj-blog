## 背景
在进行大模型的开发项目中，有很多会涉及到语音的识别及语音的播放，现按照 `Web Speech api`原生支持的是，实现实现此功能，此demo仅仅在科学上网的情况下，览器默认调用的语音识别服务有网络限制

文章后会放源码 对接科大讯飞的

## 实现语音的识别

```js
<template>
  <div>
    <button @click="startRecognition" :disabled="isListening">开始录音</button>
    <button @click="stopRecognition" :disabled="!isListening">停止</button>
    <p>识别结果: {{ recognitionText }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const isListening = ref(false);
const recognitionText = ref('');
let recognition;


const startRecognition = () => {
  // 检查浏览器是否支持
  if (!('webkitSpeechRecognition' in window)) {
    alert('您的浏览器不支持语音识别');
    return;
  }

  recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'zh-CN'; // 设置为中文

  recognition.onstart = () => {
    isListening.value = true;
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    recognitionText.value = finalTranscript || interimTranscript;
  };

  recognition.onerror = (event) => {
    console.error('语音识别错误:', event.error);
    isListening.value = false;
  };

  recognition.onend = () => {
    isListening.value = false;
  };

  recognition.start();
};

const stopRecognition = () => {
  if (recognition) {
    recognition.stop();
  }
};

</script>
```

## 语音的识别及播放

```js

<template>
  <div>
    <button @click="startRecognition">开始语音识别</button>
    <button @click="stopRecognition">停止语音识别</button>
    <button @click="speakText">播放文字语音</button>
    <textarea v-model="recognizedText" rows="4" cols="50" placeholder="识别结果将显示在这里"></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const recognizedText = ref('');
const recognition = ref(null);
const synth = ref(window.speechSynthesis);

// 初始化语音识别
const initRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition.value = new SpeechRecognition();
  recognition.value.lang = 'zh-CN';

  recognition.value.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    recognizedText.value = transcript;
  };

  recognition.value.onerror = (event) => {
    console.error('语音识别出错:', event.error);
  };
};

// 开始语音识别
const startRecognition = () => {
  if (!recognition.value) {
    initRecognition();
  }
  recognition.value.start();
};

// 停止语音识别
const stopRecognition = () => {
  if (recognition.value) {
    recognition.value.stop();
  }
};

// 播放文字语音
const speakText = () => {
  if (recognizedText.value) {
    const utterance = new SpeechSynthesisUtterance(recognizedText.value);
    utterance.lang = 'zh-CN';
    synth.value.speak(utterance);
  }
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
```

## 缺点
语音的识别需要 科学上网才可以，否则无法识别， 语音的播放是都可以的

## 对接第三方
国内访问可以对接百度，星火，阿里云的语音服务，我这里对的是科大讯飞的，感兴趣的可以注册一下科大讯飞的语音服务，我得demo 地址是[地址 ](https://github.com/13552569078/kdxf-voice)
