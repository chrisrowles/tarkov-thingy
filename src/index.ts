import { Message } from 'discord.js'
import type { TextChannel } from 'discord.js'
import { prefix, channels, client } from './bootstrap'
import { getRaidTimes } from './tarkov/RaidTimer' 

client.on('ready', () => {
    console.log('ready')

    // Tarkov raid time loop, posts to #raid-timer every 5 minutes
    setInterval(async () => {
        const channel = <TextChannel>await client.channels.fetch(channels.raidTimer)

        channel.send({ embeds: [getRaidTimes({
            embed: true
        })] })
    }, 300000)
})
 
client.on('messageCreate', (message: Message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return
    }

    // Tarkov raid time (!time)
    if (message.content === `${prefix}time`) {
        message.channel.send({ embeds: [getRaidTimes({
            embed: true
        })] })
    }
})
 
client.login((process.env.TOKEN as string))