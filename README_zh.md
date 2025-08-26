# <p align="center">✏️ AI 画图板 🚀✨</p>

<p align="center">AI画图板支持在线绘制各式各样的草图原型，并可通过AI生成mermaid图表并转为支持的草图格式。</p>

<p align="center"><a href="https://302.ai/product/detail/45" target="blank"><img src="https://file.302.ai/gpt/imgs/github/20250102/72a57c4263944b73bf521830878ae39a.png" /></a></p >

<p align="center"><a href="README_zh.md">中文</a> | <a href="README.md">English</a> | <a href="README_ja.md">日本語</a></p>

![](docs/302_Whiteboard.png)

来自[302.AI](https://302.ai)的[ AI 画图板 ](https://302.ai/product/detail/45)的开源版本。
你可以直接登录302.AI，零代码零配置使用在线版本。
或者对本项目根据自己的需求进行修改，传入302.AI的API KEY，自行部署。

## 界面预览
提供多种绘图功能，支持在线绘制各式各样的草图原型。
![](docs/302_ AI_Whiteboard_screenshot_01.png)          

可通过AI生成mermaid图表。
![](docs/302_ AI_Whiteboard_screenshot_02.png)              

可通过AI生成mermaid原型。
![](docs/302_ AI_Whiteboard_screenshot_03.png)

## 项目特性
### 🖌️ Excalidraw核心功能
   - 丰富的绘图工具：包括铅笔、形状、文本等
   - 协作编辑：支持多人实时协作
   - 导出/导入：支持多种格式的导出和导入

### 🤖 AI增强功能
   - AI生成图表：根据文本描述生成图表
   - AI生成原型：根据文本描述生成原型
   - 线框图至代码：为用户提供款选图表生成HTML代码

### 🎨 自定义样式
   - 丰富的颜色选择
   - 多种线条样式
   - 自定义字体

### 🌍 多语言支持
  - 中文界面
  - English Interface
  - 日本語インターフェース
  - 等多种国际语言

通过AI 画图板,我们能快速创建专业级的设计草图、流程图、原型图等,大大提升工作效率。AI不仅辅助绘图,还能激发创意,为设计提供新的思路和灵感。🎉💻 让我们一起探索AI驱动的创意新世界吧! 🌟🚀

## 🚩 未来更新计划
- [ ] 更新更多背景样式与模板
- [ ] 新增批量处理功能

## 技术栈
- react
- excalidraw

## 开发&部署
1. 克隆项目 `git clone https://github.com/302ai/302_whiteboard`
2. 安装依赖 `yarn install`
3. 配置302的API KEY 参考.env.example
4. 运行项目 `yarn run dev`
5. 打包部署 `docker build -t whiteboard . && docker run -p 3000:3000 whiteboard`


## ✨ 302.AI介绍 ✨
[302.AI](https://302.ai)是一个面向企业的AI应用平台，按需付费，开箱即用，开源生态。✨
1. 🧠 集合了最新最全的AI能力和品牌，包括但不限于语言模型、图像模型、声音模型、视频模型。
2. 🚀 在基础模型上进行深度应用开发，我们开发真正的AI产品，而不是简单的对话机器人
3. 💰 零月费，所有功能按需付费，全面开放，做到真正的门槛低，上限高。
4. 🛠 功能强大的管理后台，面向团队和中小企业，一人管理，多人使用。
5. 🔗 所有AI能力均提供API接入，所有工具开源可自行定制（进行中）。
6. 💡 强大的开发团队，每周推出2-3个新应用，产品每日更新。有兴趣加入的开发者也欢迎联系我们
