---
external: false
draft: true
title: "Extended markdown style guide"
description: "In addition to supporting all basic Markdoc syntax, this template also supports extended markdown syntax to render custom components."
date: 2022-11-01
---

This blog's markdown is powered by [Markdoc](https://markdoc.dev/). In addition to supporting all basic markdown syntax, this blog also supports extended syntax to render custom components that are not conventionally available via basic markdown. This post is an example to showcase all available extended markdown syntax.

## YouTube Video

You can embed YouTube videos in your blog posts.

xxxxxxxxxx import React, { useState } from 'react';​const EmojiList = () => {  const emojis = ['❶ ', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '⓿', '🏛️', '🚧', '⚠️', '⛔', '📕', '🌟', '✔️', '✅', '❌', '🎖️', '🔖', '📌', '📆'];  const [copiedEmoji, setCopiedEmoji] = useState('');​  const copyEmoji = (emoji) => {    navigator.clipboard.writeText(emoji);    setCopiedEmoji(emoji);  };​  // Calculate the midpoint index to split emojis into two columns  const midpoint = Math.ceil(emojis.length / 2);​  return (    <div>      <h1>Emoji List</h1>      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>        <div>          {emojis.slice(0, midpoint).map((emoji, index) => (            <div key={index}>              <span>{emoji}</span>              <button onClick={() => copyEmoji(emoji)}>Copy</button>            </div>          ))}        </div>        <div>          {emojis.slice(midpoint).map((emoji, index) => (            <div key={index}>              <span>{emoji}</span>              <button onClick={() => copyEmoji(emoji)}>Copy</button>            </div>          ))}        </div>      </div>      {copiedEmoji && <p>Copied: {copiedEmoji}</p>}    </div>  );};​export default EmojiList;​jsx

## Tweet

You can embed tweets in your blog posts.

{% tweet url="https://twitter.com/flexdinesh/status/1605685194312122370" /%}

## CodePen

You can embed codepens in your blog posts.

{% codepen url="https://codepen.io/ruphaa/pen/eYJqjgq" title="Ecosystem - Pen in CSS by Ruphaa" /%}

## GitHub Gist

You can embed GitHub gists in your blog posts.

{% githubgist id="d96064c9c4ef2e8ef71c90a10ffcf3b2" /%}

## Lesser Known HTML Elements

### abbr

{% abbr title="Graphics Interchange Format" %}GIF{% /abbr %} is a bitmap image format.

### sub

H{% sub %}2{% /sub %}O

### sup

X{% sup %}n{% /sup %} + Y{% sup %}n{% /sup %} = Z{% sup %}n{% /sup %}

### kbd

Press {% kbd %}{% kbd %}CTRL{% /kbd %}+{% kbd %}ALT{% /kbd %}+{% kbd %}Delete{% /kbd %}{% /kbd %} to end the session.

### mark

Most {% mark %}salamanders{% /mark %} are nocturnal, and hunt for insects, worms, and other small creatures.
