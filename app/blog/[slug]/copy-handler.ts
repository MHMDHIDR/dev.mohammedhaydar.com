"use client"

import { useEffect } from "react"

export default function PreCopyHandler() {
  useEffect(() => {
    const preElements = document.querySelectorAll("pre")

    preElements.forEach(pre => {
      // Create a wrapper div for positioning the copy button
      const wrapper = document.createElement("div")
      wrapper.className = "relative"

      // Wrap the pre element
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      // Create container for the copy button
      const buttonContainer = document.createElement("div")
      buttonContainer.className = "absolute -top-2 -right-0.5"

      // Create and append the copy button
      const copyButton = document.createElement("div")
      copyButton.innerHTML = `
        <button class="bg-gray-200 rounded p-1 hover:bg-gray-300 transition text-xs">
          Copy
        </button>
      `

      copyButton.addEventListener("click", () => {
        const text = pre.textContent || ""
        navigator.clipboard.writeText(text).then(() => {
          const originalText = copyButton.querySelector("button")?.textContent
          if (originalText) {
            copyButton.querySelector("button")!.textContent = "✔ Copied!"
            setTimeout(() => {
              copyButton.querySelector("button")!.textContent = originalText
            }, 2000)
          }
        })
      })

      buttonContainer.appendChild(copyButton)
      wrapper.appendChild(buttonContainer)
    })
  }, [])

  return null
}
