import { Message, Client, ApplicationCommandDataResolvable } from 'discord.js'
import { Reserve } from './command/reserve'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
})

const reserve = new Reserve()

const sample: ApplicationCommandDataResolvable = {
  name: 'reserve',
  description: '投稿を予約します',
  type: 'CHAT_INPUT'
};
const Commands = [sample];

client.once('ready', async () => {
  console.log('Ready!')
  console.log(client.user?.tag)

  await client.application?.commands.set(Commands, '983523686831235122');
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return
  if (reserve.IsRunTask()) {
    // 予約投稿のタスクが始まっていたらメッセージを受信
    reserve.RunReserveTask(message)
  }
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  if (interaction.commandName === 'reserve') {
    // /reserveを受信したら予約投稿開始
    await reserve.StartReserveTask(interaction)
  }
});

client.login(process.env.TOKEN)