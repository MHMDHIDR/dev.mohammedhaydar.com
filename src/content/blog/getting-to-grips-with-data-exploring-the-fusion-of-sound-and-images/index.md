---
author: Mohammed Haydar
pubDatetime: 2023-10-22T19:45:04.866Z
title: Getting to Grips with Data | Exploring the Fusion of Sound and Images
slug: getting-to-grips-with-data-exploring-the-fusion-of-sound-and-images
featured: false
draft: false
tags:
  - Digital Media
description: Getting to Grips with Data | Exploring the Fusion of Sound and Images
---

## Table of contents

In the world of media, combining sounds and images has gone beyond the usual. It's opened new doors for creativity and learning. Our journey to understand media data and try new things has been a real eye-opener. We've not only figured out the technical stuff but also how different types of media are connected. So, let's jump into the world of playing with data and see how images and sounds mix.

## Intro to Sound and Image Editors

To start on this journey, we looked into the world of sound and image editors. For manipulating images, we harnessed the creative power of Photoshop. This versatile tool not only allows for creative image enhancements but also offers the ability to make corrective modifications with precision.

## Understanding Digital Image and Sound

Before diving into our experiments, we needed a basic understanding of digital images and sounds. Digital images consist of tiny points called pixels, each with a brightness value. For colored images, we typically have three values, representing the Red, Green, and Blue components, each using eight bits, totaling 24 bits. In grayscale images, we have just one value, generally represented by 8 bits.

Sound is our perception of rapidly changing air pressure. This auditory information is converted into electrical energy and sampled at high speeds, often 44,000 times per second (44 kHz) for high-quality audio, using 8, 16, or 24 bits for each sample. These measurements serve as the foundation for recreating the sounds we hear.

## File Structure: The Foundation of Data

The structure of data files plays a crucial role in our experimentation. Files are not just collections of samples; they also hold information on how these samples should be displayed or played. In some cases, sample data is compressed using mathematical techniques, and this information is stored in the file header.

## Stripping the Header and Working with Raw Data

To experiment with data, we explored working with raw data, and eliminating the file header. However, when dealing with images, we needed to provide essential information like height, width, and the number of colors (sample size). For audio, specifying the sample size and sampling rate was vital.

Our task "An Image With Echo!" exemplified this concept. We began with a bitmap image, converted it to grayscale, and recorded its dimensions. After saving it as "image.raw" without a file header, we ventured into Audition to open the "image.raw" file as unsigned 8-bit data. By adding an echo effect, we explored the fascinating overlap between visual and auditory media. Revisiting the file in Photoshop, with the height and width specified as recorded, we observed the visual representation of the echo.

---

1. First, we take out the image and change its mood to Grayscale

![First, we take out the image and change its mood to Grayscale](./1.png)

---

2. Record the height and width of the image using a notepad or a paper

![Record the height and width of the image using a notepad or a paper](./2.png)

---

3. Then save it as a bitmap image (.bmp)

![save it as a bitmap image](./3.png)

---

1. Save the image also as a raw file (image.raw) with no file header.

![save it as a bitmap image](./4.png)

---

5. Open Audition and open the (image.raw) file as unsigned 8 bit data (the sampling rate can be left as the default).

![Open Audition and open the (image.raw)](./5.png)

---

1. Use the transform menu to add an echo.

![Use the transform menu to add an echo](./6.png)

![Use the transform menu to add an echo](./7.png)

---

8. Save the file as silly-cat-face.pcm, we will be able to change it to .raw file, and then we’ll open it in Photoshop as 8-bit greyscale and put the height and width that we recorded in when requested.

![Use the transform menu to add an echo](./8.png)

![Use the transform menu to add an echo](./9.png)

---

1. Open the file in Photoshop program as 8-bit greyscale and put the height and width that we recorded in when requested, it's giving me the dimensions as 625x600 pixels, but I know that the image is 750x600 pixels because I recorded it, and it has 1 channel, and it's a grayscale image.

![Use the transform menu to add an echo](./10.png)

---

1.  Can we see the echo?

![Use the transform menu to add an echo](./11.png)

### Here are some other examples I have experimented with:

#### Airplane Image (Before and After)

1. Before adding the echo
   ![Use the transform menu to add an echo](./12.png)

2. After adding the echo
   ![Use the transform menu to add an echo](./13.png)

---

#### A Tiger Image (Before and After)

1. Before adding the echo
   ![Use the transform menu to add an echo](./14.png)

2. After adding the echo
   ![Use the transform menu to add an echo](./15.png)

## Reversing the Process

Interestingly, we also explored the reverse process, investigating how sound could be manipulated in an image editor. We are going to see what happens when sound is blurred or sharpened and how a simple image translates into a sound waveform. This exploration shed light on the fundamental operations of media editors.

## Conclusion

1. We have explored the fusion of sound and images data and how it connects these two media types, the quesion is, can we use this technique to create music from images? The answer is yes, we can see pattern in images, when we hear a note this means that the image has a pattern, and we can use this pattern to create music from images.

2. We can also use it in Marketing, for example, we can use it to create a music from a logo, and use it in the marketing campaign (Data fountains) as an example, for example when the fountain height changes this shows us a current value of the data, like the forex data. We can for example use the color of the fountain to show the trend of the forex data, if the color is red this means that the trend is going down, and if the color is green this means that the trend is going up, and if the color is blue this means that the trend is stable.

3. We have also learned how to manipulate images and sounds in different ways, and how to reverse the process, and how to work with raw data.

**References**

1. The noise of art: Pixelsynth can turn your images into music for free
   [Online] Available at: [https://www.musicradar.com/news/tech/the-noise-of-art-pixelsynth-can-turn-your-images-into-music-for-free-638423] (Date: [May.2016]).

2. Make glitch art by data bending an image as audio using Adobe Audition - A Simple Guide. [Online] Available at: [https://hani-amir.com/blog/2016/3/13/make-glitch-art-by-data-bending-an-image-as-audio-using-adobe-audition] (Date: [Mar.2016]).
