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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const reserve_1 = require("./command/reserve");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});
const reserve = new reserve_1.Reserve();
const sample = {
    name: 'reserve',
    description: '投稿を予約します',
    type: 'CHAT_INPUT'
};
const Commands = [sample];
client.once('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('Ready!');
    console.log((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag);
    yield ((_b = client.application) === null || _b === void 0 ? void 0 : _b.commands.set(Commands, '983523686831235122'));
}));
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    if (reserve.IsRunTask()) {
        reserve.RunReserveTask(message);
    }
    if (message.content.startsWith('!ping')) {
        message.channel.send('Pong!');
    }
}));
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand()) {
        return;
    }
    if (interaction.commandName === 'reserve') {
        yield reserve.StartReserveTask(interaction);
    }
}));
client.login(process.env.TOKEN);
