# 使用 JsPsych 设计一个心理学实验：人工概念的恐惧泛化实验

## 介绍

本教程将指导您如何使用 JsPsych 设计和实现一个心理学实验，包括如何进行实验设计、如何编写代码，以及如何实现响应式布局。我们将涵盖实验的三个主要阶段：MTS 任务、条件化阶段和泛化测试阶段。即使您对心理学不熟悉，也能按照这个教程完成实验设计。

## 实验设计概述
理论概述：恐惧泛化，顾名思义，是一种后学习效应，即个体在对中性刺激和厌恶刺激形成联想后，对与中性刺激相关的刺激（如外观相似的刺激）表现出相似的恐惧反应。临床上，引起恐惧反应的物体表现出明显的个体差异。过去的恐惧泛化研究虽然侧重于探索影响恐惧泛化的共同因素，却忽略了研究导致个体差异的因素。个体在条件反射之前形成的概念结构可能会影响随后的恐惧泛化。影响这种先前结构的一个重要方法是通过反复接触和学习（Collins & Quillian，1969） 。在本研究中，我们使用 MTS（匹配样本）任务来建立三个人造词和一个中心词之间不同强度的关联，然后使用中心词作为条件刺激，其他三个词作为泛化刺激。该研究探讨了与中心刺激具有不同关联强度的泛化刺激是否会在恐惧预期评级中表现出差异。我们预计，参与者对泛化刺激的恐惧预期将受到词汇关联强度的影响，与条件刺激的关联较弱相比，关联越强，泛化刺激的恐惧预期就越高。

实验假设：对泛化刺激的恐惧预期将受到词汇关联强度的影响，关联越强，泛化刺激的恐惧预期就越高。

# JsPsych 实验设计教程

## 实验概述

本实验的刺激材料由 12 个无意义的单词组成，包括 `Berp`、`Hirg`、`Fein`、`Daic` 以及其他 8 个无意义单词。实验分为三个阶段：MTS 阶段、条件化阶段和泛化测试阶段。

## 实验阶段

### 实验阶段一：MTS阶段

在 MTS 任务中：

1. 屏幕中央会出现一个持续时间为500毫秒的注视点，注视点为红色的“+”号，屏幕背景为黑色。
2. 随后，黑色屏幕中央会显示一个示例词，屏幕底部左边和右边会出现两个比较词。示例词和比较词均为 Times New Roman 格式，字号为四号，颜色为白色，显示时间为8000毫秒。
3. 参与者需要在8000毫秒内决定哪个比较词与示例词相关。如果参与者回答后，与示例无关的单词会立即消失，正确答案会在屏幕上停留，直到时间到之后消失；如果没有做出回答，则示例词与两个比较词会一直呈现，直到时间到之后消失。
4. 随后，会出现一个持续400毫秒的试验间隔 (ITI) 屏幕，屏幕为纯黑色。

#### 试验细节

- **高相关词**：“Berp”和“Hirg”呈现6个trial，其中“Berp”作为示例词，“Hirg”作为其中一个比较词，另一个比较词从剩余8个无意义词中随机选择。
- **中相关词**：“Berp -Fein”，被试在 MTS 阶段有4次学习机会，“Berp”作为示例词，“Fein”作为比较词，另一个比较词从剩余8个无意义词中随机选择。
- **低相关词**：“Berp-Daic”，被试在 MTS 期间只有2次学习机会，“Berp”作为示例词，“Daic”作为比较词，另一个比较词从剩余8个无意义词中随机选择。

采用伪随机方法平衡不同相关度词的出现顺序，保证每个相关度词对连续出现不超过两次。通过完全随机化平衡MTS任务中正确答案的位置（左或右）。

### 实验阶段二：条件化阶段

在条件化阶段：

1. 条件刺激为 “Berp” 和安全刺激 “Teey”，随机呈现六个恐惧图像作为非条件刺激。
2. 屏幕中央会出现一个持续时间为500毫秒的注视点，注视点为红色的“+”号，屏幕背景为黑色。
3. 随后，黑色屏幕中央会显示一个词，词均为 Times New Roman 格式，字号为四号，颜色为白色，显示时间为8000毫秒。
4. 在2500毫秒的时间窗口内，参与者必须根据9点李克特量表评估在单词后出现厌恶图像的可能性，评分范围从1（恐惧图像后不太可能出现）到9（恐惧图像后肯定会出现）。
5. 参与者评分后，界面立即转换。如果单词是“Berp”，则从恐惧图像库中随机呈现一张图像500毫秒。如果单词是“Teey”，该单词会在屏幕上停留额外的500毫秒。
6. 每次试验都有400毫秒的 ITI。共有12次条件化试验，“Berp”和“Teey”各6次。使用伪随机方法平衡“Berp”和“Teey”试验的顺序，确保同一试验的连续发生不超过两次。

### 实验阶段三：泛化测试阶段

在泛化测试阶段：

1. 屏幕中央会出现一个持续时间为500毫秒的注视点，注视点为红色的“+”号，屏幕背景为黑色。
2. 随后，黑色屏幕中央会显示一个词，词均为 Times New Roman 格式，字号为四号，颜色为白色，显示时间为8000毫秒。
3. 在2500毫秒的时间窗口内，参与者必须根据9点李克特量表评估在单词后出现厌恶图像的可能性，评分范围从1（恐惧图像后不太可能出现）到9（恐惧图像后肯定会出现）。
4. 参与者评分后，界面立即转换。如果单词是“Berp”，则从恐惧图像库中随机呈现一张图像500毫秒。如果单词不是“Berp”，该单词会在屏幕上停留额外的500毫秒。
5. 泛化测试阶段包括15次试验，每次试验都有400毫秒的 ITI。在泛化测试中，Berp、Hirg、Fein、Daic、Teey各呈现3次。

## 实验代码

### `styles.css`

```css
/* styles.css */

/* 基本页面样式 */
body {
    font-family: Arial, sans-serif;
    background-color: black;
    color: white;
    margin: 0;
    padding: 0;
}

/* 注视点样式 */
.fixation-point {
    font-size: 48px;
    color: red;
    text-align: center;
    margin-top: 20%;
}

/* MTS 阶段样式 */
.mts-example-word, .mts-choice-word {
    font-family: 'Times New Roman', serif;
    font-size: 24px;
    color: white;
    text-align: center;
}

/* 条件化阶段样式 */
.conditioning-word {
    font-family: 'Times New Roman', serif;
    font-size: 24px;
    color: white;
    text-align: center;
}

/* 泛化测试阶段样式 */
.generalization-word {
    font-family: 'Times New Roman', serif;
    font-size: 24px;
    color: white;
    text-align: center;
}

/* 试验间隔 ITI 样式 */
.iti-screen {
    background-color: black;
    width: 100vw;
    height: 100vh;
}

## 实现实验的代码

下面是实现上述实验的完整JsPsych代码。请按照代码段的说明，逐步理解每个部分的功能。

### JsPsych 代码

```javascript
// MTS阶段的代码
const mtsTrials = [];

// 列出所有刺激材料
const words = ['Berp', 'Hirg', 'Fein', 'Daic', 'Word1', 'Word2', 'Word3', 'Word4', 'Word5', 'Word6', 'Word7', 'Word8'];

// 高相关词试验
for (let i = 0; i < 6; i++) {
    mtsTrials.push({
        type: 'html-keyboard-response',
        stimulus: '<p style="font-family: Times New Roman; font-size: 16px; color: white;">Berp</p>',
        choices: ['F', 'J'],  // 允许的响应键
        trial_duration: 8000, // 试验持续时间
        on_start: function(trial) {
            // 从剩余的无意义词中随机选择一个词作为对照词
            const otherWord = jsPsych.randomization.sampleWithoutReplacement(words.filter(w => w !== 'Berp' && w !== 'Hirg'), 1)[0];
            trial.stimulus = `<div style="text-align: center; font-family: Times New Roman; font-size: 16px; color: white;">
                                <p>Berp</p>
                                <div style="display: flex; justify-content: space-between; width: 100%;">
                                    <p>${otherWord}</p>
                                    <p>Hirg</p>
                                </div>
                            </div>`;
        }
    });
}

// 中相关词试验
for (let i = 0; i < 4; i++) {
    mtsTrials.push({
        type: 'html-keyboard-response',
        stimulus: '<p style="font-family: Times New Roman; font-size: 16px; color: white;">Berp</p>',
        choices: ['F', 'J'],  // 允许的响应键
        trial_duration: 8000, // 试验持续时间
        on_start: function(trial) {
            // 从剩余的无意义词中随机选择一个词作为对照词
            const otherWord = jsPsych.randomization.sampleWithoutReplacement(words.filter(w => w !== 'Berp' && w !== 'Fein'), 1)[0];
            trial.stimulus = `<div style="text-align: center; font-family: Times New Roman; font-size: 16px; color: white;">
                                <p>Berp</p>
                                <div style="display: flex; justify-content: space-between; width: 100%;">
                                    <p>${otherWord}</p>
                                    <p>Fein</p>
                                </div>
                            </div>`;
        }
    });
}

// 低相关词试验
for (let i = 0; i < 2; i++) {
    mtsTrials.push({
        type: 'html-keyboard-response',
        stimulus: '<p style="font-family: Times New Roman; font-size: 16px; color: white;">Berp</p>',
        choices: ['F', 'J'],  // 允许的响应键
        trial_duration: 8000, // 试验持续时间
        on_start: function(trial) {
            // 从剩余的无意义词中随机选择一个词作为对照词
            const otherWord = jsPsych.randomization.sampleWithoutReplacement(words.filter(w => w !== 'Berp' && w !== 'Daic'), 1)[0];
            trial.stimulus = `<div style="text-align: center; font-family: Times New Roman; font-size: 16px; color: white;">
                                <p>Berp</p>
                                <div style="display: flex; justify-content: space-between; width: 100%;">
                                    <p>${otherWord}</p>
                                    <p>Daic</p>
                                </div>
                            </div>`;
        }
    });
}

// 随机化试验顺序
jsPsych.init({
    timeline: mtsTrials, // 试验时间线
    on_finish: function() {
        jsPsych.data.displayData(); // 显示数据
    }
});

// 条件化阶段的代码
const conditioningTrials = [];

// 恐惧图像列表
const fearImages = ['fear1.jpg', 'fear2.jpg', 'fear3.jpg', 'fear4.jpg', 'fear5.jpg', 'fear6.jpg'];

// 条件化试验
for (let i = 0; i < 6; i++) {
    conditioningTrials.push({
        type: 'html-keyboard-response',
        stimulus: '<p style="font-family: Times New Roman; font-size: 16px; color: white;">Berp</p>',
        choices: jsPsych.NO_KEYS, // 不允许响应
        trial_duration: 8000, // 试验持续时间
        on_start: function(trial) {
            // 从恐惧图像库中随机选择一张图像
            const image = jsPsych.randomization.sampleWithoutReplacement(fearImages, 1)[0];
            trial.on_finish = function() {
                jsPsych.pluginAPI.setTimeout(function() {
                    jsPsych.data.write({stimulus: 'fear', image: image});
                    jsPsych.getCurrentTrial().stimulus = `<img src="${image}" style="width: 50%; height: 50%;">`;
                }, 500);
            };
        }
    });

    conditioningTrials.push({
        type: 'html-keyboard-response',
        stimulus: '<p style="font-family: Times New Roman; font-size: 16px; color: white;">Teey</p>',
        choices: jsPsych.NO_KEYS, // 不允许响应
        trial_duration: 8000, // 试验持续时间
        on_finish: function() {
            jsPsych.data.write({stimulus: 'safe'});
        }
    });
}

// 随机化试验顺序
jsPsych.init({
    timeline: conditioningTrials, // 试验时间线
    on_finish: function() {
        jsPsych.data.displayData(); // 显示数据
    }
});

// 泛化测试阶段的代码
const generalizationTrials = [];

// 泛化试验列表
const testWords = ['Berp', 'Hirg', 'Fein', 'Daic', 'Teey'];

// 泛化试验
for (let i = 0; i < 3; i++) {
    testWords.forEach(word => {
        generalizationTrials.push({
            type: 'html-keyboard-response',
            stimulus: `<p style="font-family: Times New Roman; font-size: 16px; color: white;">${word}</p>`,
            choices: jsPsych.NO_KEYS, // 不允许响应
            trial_duration: 8000, // 试验持续时间
            on_start: function(trial) {
                // 如果词是 'Berp'，则呈现恐惧图像
                if (word === 'Berp') {
                    const image = jsPsych.randomization.sampleWithoutReplacement(fearImages, 1)[0];
                    trial.on_finish = function() {
                        jsPsych.pluginAPI.setTimeout(function() {
                            jsPsych.data.write({stimulus: 'fear', image: image});
                            jsPsych.getCurrentTrial().stimulus = `<img src="${image}" style="width: 50%; height: 50%;">`;
                        }, 500);
                    };
                } else {
                    jsPsych.data.write({stimulus: 'safe'});
                }
            }
        });
    });
}

// 随机化试验顺序
jsPsych.init({
    timeline: generalizationTrials, // 试验时间线
    on_finish: function() {
        jsPsych.data.displayData(); // 显示数据
    }
});

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>心理学实验</title>
    <link rel="stylesheet" href="styles.css"> <!-- 引入 CSS 文件 -->
    <script src="https://cdn.jsdelivr.net/npm/jspsych@6.3.1/jspsych.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jspsych@6.3.1/plugins/jspsych-html-keyboard-response.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jspsych@6.3.1/plugins/jspsych-html-button-response.js"></script>
    <script src="experiment.js" defer></script> <!-- 引入 JavaScript 文件 -->
</head>
<body>
    <div id="jspsych-target"></div> <!-- JsPsych 实验内容的容器 -->
</body>
</html>

上述 Markdown 格式的教程包含了详细的步骤和 JsPsych 代码示例，并为每段代码添加了注释，以便没有接触过 JsPsych 的读者可以理解并设计实验。