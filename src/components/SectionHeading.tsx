import type React from "react";

interface SectionHeadingProps {
  children: React.ReactNode | string;
  watermark?: string;
  className?: string;
}

export default function SectionHeading({
  children,
  watermark,
  className,
}: SectionHeadingProps) {
  return (
    <div className="relative overflow-hidden text-center section-heading pb-14">
      <h2 className={`relative z-10 mb-2 uppercase ${className}`}>
        {children}
      </h2>
      <span className="relative z-10 inline-block h-1.5 w-32 overflow-hidden rounded-full bg-primary bg-opacity-20">
        <span className="absolute left-0 top-0 inline-block h-full w-1.5 animate-lefttoright rounded-full bg-primary"></span>
      </span>
      {watermark ? (
        <span className="absolute z-0 font-bold uppercase pointer-events-none -top-2 left-1/2 -translate-x-1/2 transform text-9xl opacity-5 dark:text-heading/50">
          {watermark}
        </span>
      ) : null}
    </div>
  );
}
