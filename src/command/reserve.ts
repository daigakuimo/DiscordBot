import { Message, CommandInteraction } from 'discord.js'

export enum ReserveTask {
  None = 1,
  Title,
  Content,
  Channel,
  Time,
  Repeat
}

// 予約投稿のデータ保持用連想入れつ
interface ReservePostData {
  index: number,
  name: string,
  title: string,
  content: string,
  channel: string,
  time: Date,
  repeat: string,
}

export class Reserve {
  task: ReserveTask
  postData: ReservePostData;

  constructor() {
    this.task = ReserveTask.None
    this.postData = {
      index: 1,
      name: "",
      title: "",
      content: "",
      channel: "",
      time: new Date('2008-5-1 2:00:00'),
      repeat: "",
    }
  }

  public async StartReserveTask(interaction: CommandInteraction) {
    this.postData = {
      index: 1,
      name: "",
      title: "",
      content: "",
      channel: "",
      time: new Date('2008-5-1 2:00:00'),
      repeat: "",
    }

    const message =
      `タイトルを入力してね
    例：社交辞令`

    await interaction.reply(message)

    this.ChangeNextTask()
  }

  public async RunReserveTask(message: Message) {
    switch (this.task) {
      case ReserveTask.Title:
        this.RunTitleTask(message)
        break
      case ReserveTask.Content:
        this.RunContentTask(message)
        break
      case ReserveTask.Channel:
        this.RunChannelTask(message)
        break
      case ReserveTask.Time:
        this.RunTimeTask(message)
        break
      case ReserveTask.Repeat:
        this.RunRepeatTask(message)
        break
      default:
        console.log('default')
        break
    }
  }

  private async RunTitleTask(message: Message) {
    this.SetTitle(message.content)

    const content =
      `メッセージを入力してください
    例：ごきげんよう
    ご飯いきましょう`

    await message.channel.send(content)

    this.ChangeNextTask()
  }

  private async RunContentTask(message: Message) {
    this.SetContent(message.content)

    const content =
      `送信するチャンネルを入力してください
    例：#general`

    await message.channel.send(content)

    this.ChangeNextTask()
  }

  private async RunChannelTask(message: Message) {
    this.SetChannel(message.content)

    const content =
      `送信時間を指定してください
    例： 2022/6/22 19:00`

    await message.channel.send(content)

    this.ChangeNextTask()
  }

  private async RunTimeTask(message: Message) {
    this.SetTime(new Date(message.content))

    const content =
      `定期的に投稿しますか?
    例： 2022/6/22 19:00`

    await message.channel.send(content)

    this.ChangeNextTask()
  }

  private async RunRepeatTask(message: Message) {
    this.SetRepeat(message.content)

    const content =
      `予約しました`

    await message.channel.send(content)

    this.FinishReserveTask()
  }


  private SetTitle(title: string) {
    this.postData["title"] = title
  }

  private SetContent(content: string) {
    this.postData["content"] = content
  }

  private SetChannel(channel: string) {
    this.postData["channel"] = channel
  }

  private SetTime(time: Date) {
    this.postData["time"] = time
  }

  private SetRepeat(repeat: string) {
    this.postData["repeat"] = repeat
  }

  public IsRunTask() {
    return this.task !== ReserveTask.None
  }

  private ChangeNextTask() {
    this.task++
  }

  private FinishReserveTask() {
    this.task = ReserveTask.None
    console.log(this.postData)
  }
}
