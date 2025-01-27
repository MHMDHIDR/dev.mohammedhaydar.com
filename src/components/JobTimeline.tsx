import { motion } from "framer-motion";
import { childrenAnimation } from "@utils/motion";
import TimelineItem from "./TimelineItem";
import { Briefcase } from "lucide-react";
import { jobExperienceData } from "data";
import type { WorkEducationProps } from "types";

const JobTimeline = () => {
  return (
    <div className="job-experience">
      <h4>
        <Briefcase className="inline-block mr-2 text-primary" />
        Working Experience
      </h4>
      {jobExperienceData?.map((timeline: WorkEducationProps, index: number) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="timeline-wrap"
          key={timeline.id}
        >
          <TimelineItem timeline={timeline} />
        </motion.div>
      ))}
    </div>
  );
};

export default JobTimeline;
