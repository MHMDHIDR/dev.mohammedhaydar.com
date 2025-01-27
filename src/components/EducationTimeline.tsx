import { motion } from "framer-motion";
import { childrenAnimation } from "@utils/motion";
import { Book } from "lucide-react";
import { workEducationData } from "data";
import TimelineItem from "./TimelineItem";
import type { WorkEducationProps } from "types";

const EducationTimeline = () => {
  return (
    <div className="education-timeline">
      <h4>
        <Book className="mr-2 inline-block text-primary" />
        Educational Qualification
      </h4>
      {workEducationData?.map((timeline: WorkEducationProps, index: number) => (
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

export default EducationTimeline;
