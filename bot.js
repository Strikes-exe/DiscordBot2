require("dotenv").config();

const { Client, WebhookClient } = require('discord.js');

const client = new Client({
  partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN,
);

const PREFIX = "-";

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
  client.user.setActivity("Node.js")
  client.user.setUsername("Strikes' Ban Bot")
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    
    
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    
    
   
      


      
      
      if (CMD_NAME === 'kick') {
      
      
        if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command');
      
      
      
        if (args.length === 0)
        return message.reply('Please provide a User ID');
      const member = message.guild.members.cache.get(args[0]);
      
      
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => message.channel.send('I cannot kick that user :('));
      } else {
        message.channel.send('That member was not found');
      }
    } 
    
    else if (CMD_NAME === 'ban') {
      
      
      if (!message.member.hasPermission('BAN_MEMBERS'))
        
      
      return message.reply("You do not have permissions to use that command");
      
      if (args.length === 0) return message.reply("Please provide a User ID");
      
      try {
      
        const user = await message.guild.members.ban(args[0]);
      
        message.channel.send('User was banned successfully');
      
      
      
      
      } catch (err) {
      
        console.log(err);
      
        message.channel.send('An error occured. Either I do not have permissions or the user was not found');
      }
    } else if (CMD_NAME === 'announce') {
      
      console.log(args);
      
      const msg = args.join(' ');
      console.log(msg);
      
      webhookClient.send(msg);
    }
  }
});

//=================================================================================================

const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "This mutes a member",
    execute(message, args) {
        const target = message.mentions.users.first();
        if (target) {
 
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
 
            let memberTarget = message.guild.members.cache.get(target.id);
 
            if (!args[1]) {
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                return
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
        } else {
            message.channel.send('Cant find that member!');
        }
    }
}
 
//--------------- Unmute File ---------------
 
module.exports = {
    name: 'unmute',
    description: "This unmutes a member",
    execute(message, args){
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
 
            let memberTarget= message.guild.members.cache.get(target.id);
 
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
        } else{
            message.channel.send('Cant find that member!');
        }
    }
}

 //                     this is copy ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====================================================================================================


// const ms = require('ms');
// module.exports = {
//     name: 'mute',
//     description: "This mutes a member",
//     execute(message, args) {
//       const target = message.mentions.users.first();
//         if (target) {
 
//             let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
//             let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
 
//             let memberTarget = message.guild.members.cache.get(target.id);
 
//             if (!args[1]) {
//                 memberTarget.roles.remove(mainRole.id);
//                 memberTarget.roles.add(muteRole.id);
//                 message.channel.send(`<@${memberTarget.user.id}> has been muted`);
//                 return
//             }
//             memberTarget.roles.remove(mainRole.id);
//             memberTarget.roles.add(muteRole.id);
//             message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
 
//             setTimeout(function () {
//                 memberTarget.roles.remove(muteRole.id);
//                 memberTarget.roles.add(mainRole.id);
//             }, ms(args[1]));
//         } else {
//           message.channel.send('Cant find that member!');
//         }
//     }
// }
 

 
// module.exports = {
//     name: 'unmute',
//     description: "This unmutes a member",
//     execute(message, args){
//         const target = message.mentions.users.first();
//         if(target){
//           let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
//             let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
 
//             let memberTarget= message.guild.members.cache.get(target.id);
 
//             memberTarget.roles.remove(muteRole.id);
//             memberTarget.roles.add(mainRole.id);
//             message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
//         } else{
//             message.channel.send('Cant find that member!');
//         }
//     }
//   }
  


  
  
  client.login(process.env.DISCORDJS_BOT_TOKEN);