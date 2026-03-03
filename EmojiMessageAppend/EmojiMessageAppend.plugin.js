/**
 * @name EmojiMessageAppend
 * @author razoshi
 * @description Appends message with emojis
 * @version 1.0.1
 */

module.exports = class EmojiMessageAppend {
    constructor() {
        this.settings = {
            emojiCount: 3,
            emojiList: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"]
        };
    }

    start() {
        this.settings = BdApi.Data.load("EmojiMessageAppend", "settings") || this.settings;

        const MessageActions = BdApi.Webpack.getModule(m => m.sendMessage && m.editMessage);

        BdApi.Patcher.before("EmojiMessageAppend", MessageActions, "sendMessage", (instance, args) => {
            let message = args[1];

            if (message && message.content && !message.content.startsWith("/")) {
                const count = Math.floor(Math.random() * this.settings.emojiCount) + 1;
                let emojisToAdd = "";

                for (let i = 0; i < count; i++) {
                    const randomEmoji = this.settings.emojiList[Math.floor(Math.random() * this.settings.emojiList.length)];
                    emojisToAdd += " " + randomEmoji;
                }

                message.content += emojisToAdd;
            }
        });
    }

    stop() {
        BdApi.Patcher.unpatchAll("EmojiMessageAppend");
    }

    getSettingsPanel() {
        const panel = document.createElement("div");
        panel.style.padding = "15px";

        const settingItem = document.createElement("div");
        settingItem.style.display = "flex";
        settingItem.style.justifyContent = "space-between";
        settingItem.style.alignItems = "center";
        settingItem.style.marginBottom = "20px";

        const label = document.createElement("span");
        label.textContent = "Emoji Count";
        label.style.color = "var(--header-primary)";
        label.style.fontSize = "16px";
        label.style.fontWeight = "500";

        const controlWrapper = document.createElement("div");
        controlWrapper.style.display = "flex";
        controlWrapper.style.alignItems = "center";
        controlWrapper.style.gap = "15px";

        const input = document.createElement("input");
        input.type = "range";
        input.min = "1";
        input.max = "8";
        input.value = this.settings.emojiCount;
        input.style.cursor = "pointer";

        const valueDisplay = document.createElement("span");
        valueDisplay.textContent = this.settings.emojiCount;
        valueDisplay.style.color = "var(--text-normal)";
        valueDisplay.style.minWidth = "20px";
        valueDisplay.style.fontSize = "14px";
        valueDisplay.style.fontFamily = "var(--font-code)";

        input.addEventListener("input", (e) => {
            const val = parseInt(e.target.value);
            this.settings.emojiCount = val;
            valueDisplay.textContent = val;
            BdApi.Data.save("EmojiMessageAppend", "settings", this.settings);
        });

        controlWrapper.append(input, valueDisplay);
        settingItem.append(label, controlWrapper);
        panel.append(settingItem);

        return panel;
    }
};