---
layout: default
published: true
title: Permission Management
description: How the permissions for l0c4lb0t work
---
# Permission Management
I think it is very important to control the permissions users have. Maybe you have a patreon role and only they should be able to perform an action.<br>
This bot has some options for you to control the permissions the users have.<br>
If you are too lazy to set the permissions up there are the default permissions. When a user has the default Discord permission *Manage Messages* or *Manage Roles* he can perform some actions by default.<br>
To make sure you can precisely adjust the permissions I gave you the opportunity to do so. You can put users AND roles on a whitelist or blacklist.

## Rules

* As long as there is no user and no role in the whitelist, the default permissions apply. The user is blocked from the action if he or one of his roles is in the blacklist.
* As soon as you add a role or user to the whitelist, the default permissions are not used anymore.
* The user whitelist/blacklist is more important than the list for roles. When a user has a whitelisted role but he is blacklisted, he can't perform the action.
* The blacklist has higher priority than the whitelist. If a user has a blacklisted and a whitelisted role, he can't perform the action.
* Users with the permission *Administrator* have all permissions by default, but they can still get blacklisted.
* The server owner always has all permissions

## Change permissions
* List permissions for a specific action: `=permissions list <action>`

* Add user to the whitelist: `=permission add <action> whitelist <@user>`
* Add user to the blacklist: `=permission add <action> blacklist <@user>`
* Add role to the whitelist: `=permission add <action> whitelist <@role>`
* Add role to the blacklist: `=permission add <action> blacklist <@role>`

* Remove user to the whitelist: `=permission remove <action> whitelist <@user>`
* Remove user to the blacklist: `=permission remove <action> blacklist <@user>`
* Remove role to the whitelist: `=permission remove <action> whitelist <@role>`
* Remove role to the blacklist: `=permission remove <action> blacklist <@role>`

Adding a user or role to on whitelist or blacklist will automatically remove it from the other list.

## Default permissions
The actions in the table are related to a command (like *customCommand*, even if the actual command is only *=command*, or it has a self-explaining name like *vote* and is for a non-command-action). They are the same name as the ones you have to use in the *permissions* command.

| Action                   | Default Permission |
|--------------------------|--------------------|
| changeBotPrefix          | Administrator      |
| language                 | Administrator      |
| changePermissions        | Administrator      |
| customCommand            | Manage Server      |
| reactionRole (command)   | Manage Roles       |
| joinRole                 | Manage Roles       |
| joinMessage              | Manage Messages    |
| leaveMessage             | Manage Messages    |
| sendEmbed                | Manage Messages    |
| deleteCommands           | Manage Messages    |
| ignoreBots               | Manage Messages    |
| unknownCommandMessage    | Manage Messages    |
| allowMentionCommands     | Manage Messages    |
| blockChannel             | Manage Channels    |
| dynamicVoiceChannel      | Manage Channels    |
| publicChannel            | Manage Channels    |
| resetNicknames           | Manage Nicknames   |
| reactionRoles (get role) | Everyone           |
| userLimit (only for DVC) | Everyone           |
| remind                   | Everyone           |
| randomNumber             | Everyone           |
| choose                   | Everyone           |
| createPoll               | Everyone           |
| vote                     | Everyone           |
| multiVote                | Noone              |
| voteWhenEnded            | Noone              |

If you have questions about the permissions, ask me [here](https://l0c4lh057.github.io/discord.html)