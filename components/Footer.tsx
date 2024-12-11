export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full mt-16">
      <hr className="border-t my-4" />
      <div className="flex flex-col items-center justify-between py-6 sm:flex-row-reverse sm:py-4">
        <div className="flex space-x-4 mb-4 sm:mb-0">Social links can be added here</div>
        <div className="flex items-center space-x-2">
          <span>Copyright © {currentYear}</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
