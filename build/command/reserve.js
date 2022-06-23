"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserve = exports.ReserveTask = void 0;
var ReserveTask;
(function (ReserveTask) {
    ReserveTask[ReserveTask["None"] = 1] = "None";
    ReserveTask[ReserveTask["Title"] = 2] = "Title";
    ReserveTask[ReserveTask["Content"] = 3] = "Content";
    ReserveTask[ReserveTask["Channel"] = 4] = "Channel";
    ReserveTask[ReserveTask["Time"] = 5] = "Time";
    ReserveTask[ReserveTask["Repeat"] = 6] = "Repeat";
})(ReserveTask = exports.ReserveTask || (exports.ReserveTask = {}));
class Reserve {
    constructor() {
        this.task = ReserveTask.None;
        this.postData = {
            index: 1,
            name: "",
            title: "",
            content: "",
            channel: "",
            time: new Date('2008-5-1 2:00:00'),
            repeat: "",
        };
    }
    StartReserveTask(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ChangeNextTask();
            console.log(this.task);
            const message = `タイトルを入力してね
    例：社交辞令`;
            yield interaction.reply(message);
        });
    }
    RunReserveTask(message) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.task) {
                case ReserveTask.Title:
                    this.RunTitleTask(message);
                    break;
                case ReserveTask.Content:
                    this.RunContentTask(message);
                    break;
                case ReserveTask.Channel:
                    this.RunChannelTask(message);
                    break;
                case ReserveTask.Time:
                    this.RunTimeTask(message);
                    break;
                case ReserveTask.Repeat:
                    this.RunRepeatTask(message);
                    break;
                default:
                    console.log('default');
                    break;
            }
        });
    }
    RunTitleTask(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.SetTitle(message.content);
            const content = `メッセージを入力してください
    例：ごきげんよう
    ご飯いきましょう`;
            yield message.channel.send(content);
            this.ChangeNextTask();
        });
    }
    RunContentTask(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.SetContent(message.content);
            const content = `送信するチャンネルを入力してください
    例：#general`;
            yield message.channel.send(content);
            this.ChangeNextTask();
        });
    }
    RunChannelTask(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.SetChannel(message.content);
            const content = `送信時間を指定してください
    例： 2022/6/22 19:00`;
            yield message.channel.send(content);
            this.ChangeNextTask();
        });
    }
    RunTimeTask(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.SetTime(new Date(message.content));
            const content = `定期的に投稿しますか?
    例： 2022/6/22 19:00`;
            yield message.channel.send(content);
            this.ChangeNextTask();
        });
    }
    RunRepeatTask(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.SetRepeat(message.content);
            const content = `予約しました`;
            yield message.channel.send(content);
            this.FinishReserveTask();
        });
    }
    SetTitle(title) {
        this.postData["title"] = title;
    }
    SetContent(content) {
        this.postData["content"] = content;
    }
    SetChannel(channel) {
        this.postData["channel"] = channel;
    }
    SetTime(time) {
        this.postData["time"] = time;
    }
    SetRepeat(repeat) {
        this.postData["repeat"] = repeat;
    }
    IsRunTask() {
        return this.task !== ReserveTask.None;
    }
    ChangeNextTask() {
        this.task++;
    }
    FinishReserveTask() {
        this.task = ReserveTask.None;
        console.log(this.postData);
    }
}
exports.Reserve = Reserve;
