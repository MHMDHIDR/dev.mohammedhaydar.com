import EducationTimeline from "./EducationTimeline";
import JobTimeline from "./JobTimeline";

const ResumeSection = () => {
  return (
    <div className="grid grid-cols-2 gap-10 xl:gap-7">
      <div className="col-span-2 xl:col-span-1">
        <EducationTimeline />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <JobTimeline />
      </div>
    </div>
  );
};

export default ResumeSection;
