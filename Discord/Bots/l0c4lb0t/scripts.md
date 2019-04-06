---
layout: default
published: true
title: Scripts
description: Functions that you can use in bot scripts
---
# How to use
Every command has to be in his own line. They cannot use more than one line. To use line breaks in arguments, please use `\n` instead of the line break.


# Events

- `onMessage` - fires when the bot receives a message
- `onJoin` - fires when a user joins the server
- `onLeave` - fires when a user leaves the server (or gets kicked)
- `onPin` - fires when a message gets pinned
- `onUnpin` - fires when a message gets unpinned
- `onBan` - fires when a user gets banned from the server
- `onPardon` - fires when the ban of a user gets removed
- `onNick` - fires when the nickname of a user changes
- `onVoiceJoin` - fires when a user joins a voice channel
- `onVoiceLeave` - fires when a user leaves a voice channel
- `onVoiceMove` - fires when a user moves between two voice channels
- `onReaction` - fires when a reaction is added to a message
- `onReactionRemoved` - fires when a reaction gets removed
- `onRoleAdded` - fires when a role is given to a user
- `onRoleRemoved` - fires when a role is taken from a user
- `onChannelCreated` - fires when a channel gets created
- `onChannelDeleted` - fires when a channel gets deleted
- `onCategoryCreated` - fires when a category gets created
- `onCategoryDeleted` - fires when a category gets deleted
- `onVoiceChannelCreated` - fires when a voice channel gets created
- `onVoiceChannelDeleted` - fires when a voice channel gets deleted
- `onRoleCreated` - fires when a role gets created
- `onRoleDeleted` - fires when a role gets deleted

# Functions

## General
#### sendMessage
##### Usage
```
sendMessage("channelId", "message")
```
##### Parameters
- `channelId` - the id of the channel the message should get send in
- `message` - the message (plain text) or a [JSON representation of the message](#json-messages) (embed)

#### giveRole
##### Usage
```
giveRole("userId", "roleId")
```
##### Parameters
- `userId` - the id of the user you want to add the role to
- `roleId` - the id of the role you want to add to the user

#### removeRole
##### Usage
```
removeRole("userId", "roleId")
```
##### Parameters
- `userId` - the id of the user you want to remove the role from
- `roleId` - the id of the role you want to remove from the user

#### setNickname
##### Usage
```
setNickname("userId", "nickname")
```
##### Parameters
- `userId` - the id of the user you want to change the nickname of
- `nickname` - the nickname you want the user to have (gets truncated to 32 characters)

#### resetNickname
##### Usage
```
resetNickname("userId")
```
##### Parameters
- `userId` - the id of the user you want to reset the nickname of

#### kickUser
##### Usage
```
kickUser("userId")
kickUser("userId", "reason")
```
##### Parameters
- `userId` - the id of the user you want to kick
- `reason` (optional) - the reason why you want to kick the user

#### banUser
##### Usage
```
banUser("userId")
banUser("userId", "reason")
```
##### Parameters
- `userId` - the id of the user you want to ban
- `reason` (optional) - the reason why you want to ban the user

#### clearReactions
##### Usage
```
clearReactions("messageId")
```
##### Parameters
- `messageId` - the id of the message you want to remove all reactions from

### Logic

There are some functions that stop script execution and give you the possibility to only do something if a condition is true.<br>
They are called `continueIf<...>` and `breakIf<...>`. The `continueIf` function will continue script execution if the condition is true and stop it if the condition is false. `breakIf` on the other hand does the exact opposite of that. If the condition is true it will stop script execution and if the condition is false it continues.<br>
If you need something like a `if this then ..., otherwise ...` you need to use two scripts. One needs to have a `continueIf` and the other one a `breakIf` with the exact same arguments.

#### IfEqual
##### Usage
```
continueIfEqual("argument1", "argument2")
breakIfEqual("argument1", "argument2")
```
##### Returns
- `true` if both arguments are the same

#### IfStartsWith
##### Usage
```
continueIfStartsWith("toCheck", "startsWith")
breakIfStartsWith("toCheck", "startsWith")
```
##### Parameters
- `toCheck` - the value you want to check
- `startsWith` - the value `toCheck` has to start with
##### Returns
- `true` if `toCheck` starts with `startsWith`

#### IfEndsWith
##### Usage
```
continueIfEndsWith("toCheck", "endsWith")
breakIfEndsWith("toCheck", "endsWith")
```
##### Parameters
- `toCheck` - the value you want to check
- `endsWith` - the value `toCheck` has to end with
##### Returns
- `true` if `toCheck` ends with `endsWith`

#### IfContains
##### Usage
```
continueIfContains("toCheck", "contains")
breakIfContains("toCheck", "contains")
```
##### Parameters
- `toCheck` - the value you want to check
- `contains` - the value `toCheck` has to contain
##### Returns
- `true` if `toCheck` contains `contains`

## Event specific

### Logic

#### IfMentioned
##### Usage
```
continueIfMentioned("messageId", "channelId")
breakIfMentioned("messageId", "channelId")
continueIfMentioned("messageId", "userId")
breakIfMentioned("messageId", "userId")
continueIfMentioned("messageId", "roleId")
breakIfMentioned("messageId", "roleId")
```
##### Parameters
- `messageId` - the id of the message you want to check
- `channelId` - the id of the channel you want to check for
- `userId` - the id of the user you want to check for
- `roleId` - the id of the role you want to check for (to check for `@everyone` use `everyone`, for `@here` use `here` as parameter)
##### Returns
- `true` if the message mentions the role/user/channel AND the user has the permission to mention it
##### Supported events
- onMessage

#### IfUserHasRole
##### Usage
```
continueIfUserHasRole("userId", "roleId")
breakIfUserHasRole("userId", "roleId")
```
##### Parameters
- `userId` - the user you want to check
- `roleId` - the role you want to check the user for
##### Returns
- `true` if the user has the role

# Variables

| Variable | Description | Functions supporting the variable |
| - | - | - |
| `%guildid%` | The id of the guild | all |
| `%guildname%` | The name of the guild | all |
| `%guildicon%` | The icon of the guild | all |
| `%userid%` | The id of the user triggering the event | onMessage |
| `%username%` | The name of the user | onMessage |
| `%usernick%` | The nickname of the user (or username if not nicked) | onMessage |
| `%userpfp%` | The profile picture of the user | onMessage |
| `%userdiscriminator%` | The discriminator of the user | onMessage |
| `%usermention%` | The mention of the user | onMessage |
| `%channelid%` | The id of the channel | onMessage |
| `%channelname%` | The name of the channel | onMessage |
| `%channeltopic%` | The topic of the channel | onMessage |
| `%channelmention%` | The mention of the channel | onMessage |
| `%messageid%` | The id of the message | onMessage |
| `%messageurl%` | The direct URL to the message | onMessage |
| `%content%` | The content of the message | onMessage |
| `%formattedcontent%` | The content of the message with human-readable mentions | onMessage |

# JSON Messages
If you want to use embeds in messages you need to use the bot's syntax for them. Because every command can only take one line of code, the JSON has to be in a non-readable form.<br>
I recommend using the readable form and a JSON validator to make sure everything is correct and then removing all line breaks.<br>
I recommend using single quotes (`'`) for the JSON, because double quotes can cause trouble with function parsing, causing arguments to be interpreted wrong and the function to not work, even though JSON standards require double quotes and I try my best to avoid the problem.

### Keys
- `content` - the content of the message (plain text, no inside the embed)
- `title` - the title of the embed
- `description` - the description of the embed
- `color` - the color of the embed (as integer!)
- `author` - the author name of the embed
- `authorIcon` - the author icon URL of the embed
- `authorUrl` - the author URL of the embed
- `footer` - the footer text of the embed
- `footerIcon` - the footer icon URL of the embed
- `image` - the image URL of the embed
- `thumbnail` - the thumbnail URL of the embed
- `url` - the URL of the embed title (requires `title`)
- `fields` - the array of [fields](#fields) in the embed

## Fields
### Keys
- `title` - the title of the field
- `content` - the content of the field
- `inline` - wether the field should be inline or not (`false` if not set)

## Example
#### Human-readable form
```json
{
    "content": "This is the content of the message that is not inside the embed",
    "title": "The title of the embed. it can be up to 256 characters long",
    "description": "This is the embed description. it can be up to 2048 characters long\n\nbe careful: the embed cannot exceed 6000 characters!",
    "color": 1234567,
    "url": "https://example.com/",
    "fields": [
        {
            "title": "This is field 1",
            "content": "field one"
        },
        {
            "title": "field 2",
            "content": "not inline"
        },
        {
            "title": "field 3",
            "content": "still not inline",
            "inline": false
        },
        {
            "title": "field 4",
            "content": "this is inline",
            "inline": true
        },
        {
            "title": "field 5",
            "content": "also inline",
            "inline": true
        },
        {
            "title": "field 6",
            "content": "you can have up to 25 fields in an embed",
            "inline": true
        },
        {
            "title": "field titles can be up to 256 characters long",
            "content": "field content can be up to 1024 characters long"
        }
    ],
    "footer": "the footer text, up to 2048 characters long",
    "author": "the auuthor's name, up to 256 characters long"
}
```

#### One-line form to use it in the bot
```json
{"content":"This is the content of the message that is not inside the embed","title":"The title of the embed. it can be up to 256 characters long","description":"This is the embed description. it can be up to 2048 characters long\n\nbe careful: the embed cannot exceed 6000 characters!","color":1234567,"url":"https://example.com/","fields":[{"title":"This is field 1","content":"field one"},{"title":"field 2","content":"not inline"},{"title":"field 3","content":"still not inline","inline":false},{"title":"field 4","content":"this is inline","inline":true},{"title":"field 5","content":"also inline","inline":true},{"title":"field 6","content":"you can have up to 25 fields in an embed","inline":true},{"title":"field titles can be up to 256 characters long","content":"field content can be up to 1024 characters long"}],"footer":"the footer text, up to 2048 characters long","author":"the auuthor's name, up to 256 characters long"}
```
#### Preview
![Preview of the message](./assets/jsonmessageexample.jpg "How this message will look like")

# Example scripts
## onMessage
Delete messages that mention everyone and ban the user who wrote the message
```
continueIfMentions("%messageid%", "everyone")
banUser("%userid%", "Mentioned @everyone")
deleteMessage("%messageid%")
```
Give the user a role if he writes `-verify` in the verify channel (`1234567890` is the id of the role the user should get)
```
continueIfEqual("%content%", "-verify")
continueIfEqual("%channelname%", "verify")
giveRole("%userid%", "1234567890")
```

## onJoin
Add `New - ` to the name of a joining user and give a role (`1234567890` is the id of the role the user should get)
```
setNickname("%userid%", "New - %username%")
giveRole("%userid%", "1234567890")
```
Kick your friend when he joins
```
continueIfEqual("%userid%", "1234567890")
kickUser("%userid%", "This is fun!")
```
Have a nice welcome message for your users
```
sendMessage("1234567890", "{"color":1234567, "title":"A new fighter", "description":"Hey everyone!\n%username% joined this server. Be nice to him!", "author":"%username%#%userdiscriminator%", "authorIcon":"%userpfp%"}")
```