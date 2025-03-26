// 导入 SillyTavern 的扩展工具函数
import { renderExtensionTemplateAsync } from '../../../extensions.js';
// 虽然这个简单示例不用上下文，但通常会导入
// import { getContext } from '../../../../script.js';

// 定义每条消息上按钮的 HTML
const claudeButtonHtml = '<div class="mes_button simple_claude_button" title="点击这个">cluade</div>';

// 使用 jQuery 的 DOM Ready 函数确保页面加载完毕
jQuery(async () => {
    // 定义你实际的插件文件夹名称 (根据控制台日志是 'test1.0')
    const pluginFolderName = 'test1.0'; // <--- 修改这里！

    // 1. 在“扩展”页面添加 "gemini" 显示
    try {
        // 加载 gemini_display.html 的内容
        // 注意：第一个参数是 'third-party/你的文件夹名'
        //       第二个参数是文件名，***不带 .html 后缀***
        const geminiHtml = await renderExtensionTemplateAsync(`third-party/${pluginFolderName}`, 'gemini_display'); // <--- 修改这里！
        $('#translation_container').append(geminiHtml);
        console.log("简略插件：已添加 'gemini' 到扩展页面。");
    } catch (error) {
        console.error(`简略插件：加载 gemini_display.html (路径: third-party/${pluginFolderName}) 失败:`, error);
    }

    // 2. 在聊天输入栏右侧添加 "openai" 按钮
    try {
        // 加载 openai_button.html 的内容
        // ***不带 .html 后缀***
        const openaiButton = await renderExtensionTemplateAsync(`third-party/${pluginFolderName}`, 'openai_button'); // <--- 修改这里！
        $('#data_bank_wand_container').append(openaiButton);
        console.log("简略插件：已添加 'openai' 按钮到输入栏旁。");

        // 为 "openai" 按钮绑定点击事件
        $('#simple_openai_button').on('click', () => {
            alert('chatgpt!');
        });
    } catch (error) {
        console.error(`简略插件：加载 openai_button.html (路径: third-party/${pluginFolderName}) 失败:`, error);
    }


    // 3. 在每条消息上添加 "cluade" 按钮
    try {
        // 将按钮 HTML 追加到所有现有的消息附加按钮容器中
        $('.extraMesButtons').append(claudeButtonHtml);
        console.log("简略插件：已添加 'cluade' 按钮到现有消息。");

        // 使用事件委托为动态添加的 "cluade" 按钮绑定点击事件
        $(document).on('click', '.simple_claude_button', function() {
            alert('grok!');
        });
    } catch (error) {
        console.error("简略插件：添加 'cluade' 按钮或绑定事件失败:", error);
    }

});
