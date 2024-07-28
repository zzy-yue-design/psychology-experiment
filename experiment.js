// 引入 JsPsych 和插件
import jsPsych from 'jspsych';
import 'jspsych/css/jspsych.css'; // JsPsych 样式
import 'jspsych/plugins/jspsych-html-keyboard-response.js'; // 引入 html-keyboard-response 插件

// 实验阶段一：MTS 阶段
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

// 条件化阶段
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

// 泛化测试阶段
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
    timeline: mtsTrials.concat(conditioningTrials).concat(generalizationTrials), // 试验时间线
    on_finish: function() {
        jsPsych.data.displayData(); // 显示数据
    }
});
