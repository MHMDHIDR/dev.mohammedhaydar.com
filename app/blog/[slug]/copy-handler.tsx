"use client"

import { useEffect } from "react"

export default function PreCopyHandler() {
  useEffect(() => {
    const preElements = document.querySelectorAll("pre")

    preElements.forEach(pre => {
      // Create a wrapper div for positioning the copy button
      const wrapper = document.createElement("div")
      wrapper.className = "relative group"
      wrapper.style.marginBottom = "1rem"

      // Wrap the pre element
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      // Create container for the copy button
      const buttonContainer = document.createElement("div")
      buttonContainer.className =
        "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"

      // Create and append the copy button
      const copyButton = document.createElement("button")
      copyButton.className =
        "bg-gray-700 hover:bg-gray-600 text-white rounded px-2 py-1 text-xs font-mono transition-colors"
      copyButton.textContent = "Copy"

      copyButton.addEventListener("click", () => {
        const code = pre.querySelector("code")
        const text = code?.textContent || ""
        navigator.clipboard.writeText(text).then(() => {
          copyButton.textContent = "Copied!"
          setTimeout(() => {
            copyButton.textContent = "Copy"
          }, 2000)
        })
      })

      buttonContainer.appendChild(copyButton)
      wrapper.appendChild(buttonContainer)
    })
  }, [])

  return null
}
