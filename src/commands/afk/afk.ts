import { Message } from 'discord.js';
import {
  SubCommandPluginCommand,
  SubCommandPluginCommandOptions,
} from '@sapphire/plugin-subcommands';
import { ApplyOptions } from '@sapphire/decorators';
import { reply } from '@sapphire/plugin-editable-commands';
import { Args } from '@sapphire/framework';
import Time from '../../util/Time';
import Bot from '../../bot';

@ApplyOptions<SubCommandPluginCommandOptions>({
  aliases: ['inactive'],
  description: 'Modify your afk state',
  subCommands: [{ input: 'start', default: true }, { input: 'stop' }],
})
export default class AfkCommand extends SubCommandPluginCommand {
  public async start(message: Message, args: Args) {
    const bot = Bot.getBot();
    const arg = await args.rest('string');
    const date = new Date(arg);

    await bot.usersController.setAfk(message.author.id, date);

    return reply(message, `Registered you afk till ${Time.toReadable(date)}`);
  }

  // TODO
  public static async stop(message: Message) {
    return message.channel.send('Unimplemented');
  }
}
