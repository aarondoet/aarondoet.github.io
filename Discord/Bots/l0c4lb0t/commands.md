---
layout: default
published: true
title: Commands
description: Commands you can use with l0c4lb0t
---
# Commands
<!-- here should be the quickjump links -->
- [Administration](#administration)
  - [prefix](#prefix)
  - [language](#language)
  - [permissions](#permissions)

## Administration

### prefix
`=prefix <newPrefix>` changes the bot prefix to the given prefix. The max length of it is 10 characters and spaces are not allowed.<br>
Permissions: `changeBotPrefix` default: `Administrator`

### language
`=language list` lists all available languages<br>
`=language <newLanguage>` changes the language of the bot to the given language. NOTE: Polls and help pages get detected by language specific strings. When you change the language, those will no longer work.<br>
Permissions: `language` default: `Administrator`

### permissions
`=permissions list <action>` shows the whitelisted/blacklisted users/roles for the specific action or command<br>
`=permissions add <action> whitelist <@user>` whitelists a user to perform an action<br>
`=permissions add <action> blacklist <@user>` blacklists a user from permorming an action<br>
`=permissions add <action> whitelist <@role>` whitelists a role to perform an action<br>
`=permissions add <action> blacklist <@role>` blacklists a role from performing an action<br>
`=permissions remove <action> whitelist <@user>` removes a user from the whitelist of an action<br>
`=permissions remove <action> blacklist <@user>` removes a user from the blacklist of an action<br>
`=permissions remove <action> whitelist <@role>` removes a role from the whitelist of an action<br>
`=permissions remove <action> blacklist <@role>` removes a role from the blacklist of an action<br>
Permissions: `changePermissions` default: `Administrator`<br>
For more information about permissions, check out [the explanation](./permissionManagement.html)

