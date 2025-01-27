---
author: Mohammed Haydar
pubDatetime: 2023-11-18T20:00:04.866Z
title: Sampling Theory and Compression
slug: sampling-theory-and-compression
featured: false
draft: false
tags:
  - Compression
description: Sampling Theory and Compression
---

## Table of contents

We'll explore the basics of sampling theory and compression. These are fundamental concepts in the world of digital media that help us understand how data is captured and managed.

## Sampling Theory: What It Means

Imagine the real world around us. It's continuous and can vary from incredibly tiny to extremely large. Now, our digital devices, like computers, deal with this real-world information using something called "digital numbers."

These digital numbers could represent many things: colors in an image, sound loudness, or even instructions for a computer. But there's a limitation. While we can have a whole number like 7, we can't have numbers like 7.5.

## Types of Data in Digital Media

When we work with digital media, we encounter different types of information. For instance:

1. **Images** represent information over space. The more pixels an image has, the more detail it can capture.
2. **Audio** captures information over time. A sound is made up of many tiny pieces of information that come together when we listen to it.

This information is called "sample data."

## Sampling Theory in Action

Imagine a sound, like a piece of music. When we record this music, we don't record it continuously (that would take too much space!). Instead, we take little "samples" or snapshots of the sound at regular intervals.

Each of these samples is a number that represents the loudness of the music at that specific moment. If we take enough samples, we can recreate the original music. But if we don't take enough samples, it's like trying to understand a fast-moving car by looking at it through a blurry window. We might not see everything correctly!

## Compression: What's That?

Now, let's talk about compression. Imagine you have a big file on your computer. It takes up lots of space. Compression is like squeezing this file into a smaller size, so it doesn't take up as much room.

## Why Do We Need Compression?

Large files can be a problem. They take up space on your computer, and if you want to send them over the Internet, it can take a long time. Compression helps to make files smaller, making them easier to handle.

## Different Types of Compression

There are various ways to compress data, and different methods are used for different types of media. For instance, when we compress an image, it might lose a tiny bit of quality, but it still looks good to our eyes. It's like squeezing a big balloon into a smaller one – it still looks like a balloon.

When we compress sound, we sometimes lose a little bit of detail in the music. It's like making a picture with fewer colors; it might not look as vibrant. However, our ears might not even notice these small changes.

#### Here is an example of how compression works:

1. **Original Image**: A beautiful picture of a Super Car.
   ![Original Image](./1.png)

2. So going to Gimp and exporting the image with the lowest quality settings, just to see how it looks like, from the File menu, then Export As:

![Export Image](./8.png)

Then it asks us about choosing the quality settings, I am goint to go with the as low as 1% and then saving the file.

![Export Image](./9.png)

---

3. As you can see the impact of compression on the image quality is quite noticeable, the image is now very pixelated and the colors are not as vibrant as the original image.

![Export Image](./10.png)

---

#### Another example of an image "I like peanuts", I am going to try peanuts images that has been compressed, we can see the original image and the compressed image side by side.

![Export Image](./11.png)

#### One more example of an image that has been compressed, we can see the original image and the compressed image side by side.

![Export Image](./12.png)

#### The Impact on Glitch Art

Artifacts introduced by compression can be a creative playground. Glitch art often benifits from these visual aberrations, turning what might be considered imperfections into intentional and expressive elements. The blockiness and artifacts become part of the artistic language, adding a unique dimension to the visual story.

#### Blockiness: The Pixel Puzzle

One noticeable effect of compression is the emergence of blockiness in images. Imagine an image as a mosaic of tiny squares, each representing a pixel. Compression, especially with lossy algorithms, tends to group pixels together into blocks. While this significantly reduces file size, it may result in a loss of fine details and a visible grid-like pattern on the image surface.

---

#### Compression of a sound file, firstly I opened the original sound file in Adobe Audition and I Normalized it to make it louder.

2. **Original Sound**: A piece of sound file.
   ![Original Sound](./2.png)

The original sound file is as follows:

<audio style="width: 100%;" controls>
  <source src="/blogs/sampling-theory-and-compression/1.mp3" type="audio/mp3">
  Your browser does not support the audio element.
</audio>

The sound file after I applied Normalization is as follows:

<audio style="width: 100%;" controls>
  <source src="/blogs/sampling-theory-and-compression/2.wav" type="audio/wav">
  Your browser does not support the audio element.
</audio>

---

#### Checking out the file details, the size of the normalized sound file is small, we can see it's about 800 KB.

![Normalized Sound](./3.png)

We can open the file in Adobe Audition so that we can compress it. We can do this by going to the File menu, then Save As, and then selecting the format we want to save the file in, and selecting the highest quality settings.

![Compressed Sound](./4.png)

Then we need to accept the warning that it might lose some quality, and then we can save the file.

![Compressed Sound 2](./5.png)

---

#### So going back again and saving the file as much lower quality.

![Compressed Sound 3](./6.png)

This is the file details of the compressed sound file with the lowest quality settings, we can see that the file size is much smaller, it's around 12 KB which significantly smaller compared to the original file which was around 800

![Compressed Sound 3](./7.png)

So this is how the sound file with the heighest quality settings sounds like:

<audio style="width: 100%;" controls>
  <source src="/blogs/sampling-theory-and-compression/audio-high.mp3" type="audio/mp3">
  Your browser does not support the audio element.
</audio>

And this is how the sound file with the lowest quality settings sounds like:

<audio style="width: 100%;" controls>
  <source src="/blogs/sampling-theory-and-compression/audio-low.mp3" type="audio/mp3">
  Your browser does not support the audio element.
</audio>

**Conclusion**

Understanding sampling theory and compression is like unlocking the secrets of digital media. It helps us manage large files, make the most of our digital devices.

Understanding the impact of compression on image quality involves recognizing its potential side effects, such as blockiness and artifacts. And this allows you to navigate the digital landscape with informed creativity.

**References:**

1. Universe Size Comparison | Cosmic Eye (Original HD) [Online] Available at: [https://www.youtube.com/watch?v=8Are9dDbW24] (Date: [May.2018]).

2. Images, Pixels and RGB
   [Online] Available at: [https://www.youtube.com/watch?v=15aqFQQVBWU] (Date: [Mar.2015]).

3. Digital Compression explained by Aloe Blacc
   [Online] Available at: [https://www.youtube.com/watch?v=By30SCp-Tsw] (Date: [Sep.2015]).
