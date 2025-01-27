import { useState } from "react";
import FsLightbox from "fslightbox-react";
import { ExternalLink, Github, BookImage, FileVideo } from "lucide-react";
import { Portal } from "react-portal";
import type { Project } from "types";

const Portfolio = ({
  portfolio: {
    title,
    subtitle,
    coverimage,
    imagegallery,
    videogallery,
    url,
    github,
  },
}: {
  portfolio: Project;
}) => {
  const [videoGalleryOpen, setVideoGalleryOpen] = useState(false);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);

  return (
    <div className="portfolio card hovercard group p-4 md:p-5">
      <div className="portfolio-top relative overflow-hidden">
        <div className="portfolio-image fiximage mx-auto flex h-72 w-72 items-center blur-0 filter transition-all duration-500 group-hover:blur">
          <img
            src={`/assets/images/portfolios/${coverimage}`}
            height={384}
            width={550}
            alt={title}
            className="mx-auto h-auto w-full"
          />
        </div>
        <div className="portfolio-hovercontent absolute left-0 top-0 z-20 flex h-full w-full -translate-x-full transform items-center justify-center gap-4 overflow-hidden bg-grey bg-opacity-80 transition-all duration-500 group-hover:translate-x-0">
          {imagegallery && imagegallery.length > 0 && (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              aria-label="Image Link"
              onClick={() => setImageGalleryOpen(true)}
            >
              <BookImage />
            </button>
          )}
          {videogallery && videogallery.length > 0 && (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              aria-label="Video Link"
              onClick={() => setVideoGalleryOpen(true)}
            >
              <FileVideo />
            </button>
          )}
          {url?.length && url.length > 0 && (
            <a
              href={url}
              target="_blank"
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              aria-label="External Link"
            >
              <ExternalLink />
            </a>
          )}
          {github?.length && github.length > 0 && (
            <a
              href={github}
              target="_blank"
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              aria-label="Github Link"
            >
              <Github />
            </a>
          )}
        </div>
      </div>
      <div className="portfolio-content mt-4 text-center">
        <h4 className="mb-0">{title}</h4>
        <p>{subtitle}</p>
      </div>
      {imagegallery && (
        <Portal>
          <FsLightbox
            toggler={imageGalleryOpen}
            sources={imagegallery.map(
              image => `/assets/images/portfolios/${image}`
            )}
          />
        </Portal>
      )}
      {videogallery && (
        <Portal>
          <FsLightbox toggler={videoGalleryOpen} sources={videogallery} />
        </Portal>
      )}
    </div>
  );
};

export default Portfolio;
