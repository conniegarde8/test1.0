// 导入 SillyTavern 的扩展工具函数
import { renderExtensionTemplateAsync } from '../../../extensions.js';
// 虽然这个简单示例不用上下文，但通常会导入
// import { getContext } from '../../../../script.js';

// 定义每条消息上按钮的 HTML
const claudeButtonHtml = '<div class="mes_button simple_claude_button" title="点击这个">cluade</div>';

// 使用 jQuery 的 DOM Ready 函数确保页面加载完毕
jQuery(async () => {
    // 1. 在“扩展”页面添加 "gemini" 显示
    try {
        // 加载 gemini_display.html 的内容
        // 注意：'simple-example-plugin' 应该替换为你实际放置插件的文件夹名
        const geminiHtml = await renderExtensionTemplateAsync('third-party/simple-example-plugin', 'gemini_display.html');
        // 将加载的 HTML 追加到 SillyTavern 的扩展设置区域
        // 使用 #extensions_settings 或者 #translation_container (根据你的SillyTavern版本和布局)
        // 这里我们用 #translation_container 来匹配你提供的原始插件
        $('#translation_container').append(geminiHtml);
        console.log("简略插件：已添加 'gemini' 到扩展页面。");
    } catch (error) {
        console.error("简略插件：加载 gemini_display.html 失败:", error);
    }

    // 2. 在聊天输入栏右侧添加 "openai" 按钮
    try {
        // 加载 openai_button.html 的内容
        const openaiButton = await renderExtensionTemplateAsync('third-party/simple-example-plugin', 'openai_button.html');
        // 将加载的 HTML 追加到输入栏右侧的按钮容器
        $('#data_bank_wand_container').append(openaiButton);
        console.log("简略插件：已添加 'openai' 按钮到输入栏旁。");

        // 为 "openai" 按钮绑定点击事件
        $('#simple_openai_button').on('click', () => {
            alert('chatgpt!');
        });
    } catch (error) {
        console.error("简略插件：加载 openai_button.html 失败:", error);
    }


    // 3. 在每条消息上添加 "cluade" 按钮
    try {
        // 将按钮 HTML 追加到所有现有的消息附加按钮容器中
        $('.extraMesButtons').append(claudeButtonHtml);
        console.log("简略插件：已添加 'cluade' 按钮到现有消息。");

        // 使用事件委托为动态添加的 "cluade" 按钮绑定点击事件
        // 监听整个文档上的点击事件，但只处理来自 .simple_claude_button 的点击
        $(document).on('click', '.simple_claude_button', function() {
            // 'this' 在这里指向被点击的 .simple_claude_button 元素
            // 如果需要，可以获取消息ID: const messageId = $(this).closest('.mes').attr('mesid');
            alert('grok!');
        });
    } catch (error) {
        console.error("简略插件：添加 'cluade' 按钮或绑定事件失败:", error);
    }

});
