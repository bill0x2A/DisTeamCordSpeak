require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.fetch('766823683376676888')
    .then(channel => {
      channel.join();
    })
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  if (oldState.channel !== newState.channel) {
    if (oldState.channel && oldState.channel.name === 'Home') {
      play(oldState.channel, './sounds/disconnected.wav');
    }

    if (newState.channel && newState.channel.name === 'Home') {
      const havingAGoodTime = Math.random() <= 0.01;
      const file = havingAGoodTime ? './sounds/connected-but-its-loud-af.mp3' : './sounds/connected.wav';
      play(newState.channel, file);
    }
  }

})

client.login(process.env.DISCORD_BOT_TOKEN);

async function play(channel, file)
{
  const connection = await channel.join();

  connection.play(file);
}