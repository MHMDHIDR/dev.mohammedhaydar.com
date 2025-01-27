import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import PortfolioFilters from "./PortfolioFilters";
import { projectsData } from "data";
import Portfolio from "./Portfolio";
import type { Project, ProjectFiltersProps } from "types";

const PortfoliosSection = () => {
  const [visibleProjects, setVisibleProjects] = useState<Project[] | null>(
    null
  );
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const [pageNumber, setPageNumber] = useState(1);
  const [allProjectsLoaded, setAllProjectsLoaded] = useState(false); // New state variable

  useEffect(() => {
    if (projectsData) {
      const slicedProjects = projectsData.slice(0, pageNumber * 6);
      setVisibleProjects(slicedProjects);
      setAllProjectsLoaded(slicedProjects.length === projectsData.length);
    }
  }, [projectsData, pageNumber]);

  const handleFilter = useCallback((_id: ProjectFiltersProps["_id"]) => {
    setCurrentFilter(_id);
    setPageNumber(1);
    setAllProjectsLoaded(false); // Reset allProjectsLoaded when a new filter is selected
  }, []);

  if (projectsData && projectsData.length === 0) return null;

  return (
    <>
      <PortfolioFilters
        currentFilter={currentFilter}
        filterHandler={handleFilter}
      />
      <motion.div layout className="mt-12 grid grid-cols-6 gap-7">
        {visibleProjects?.map(project => {
          if (!project) {
            return null;
          }

          if (
            currentFilter !== "ALL" &&
            !project.filter.some(filter => filter._ref === currentFilter)
          ) {
            return null;
          }

          return (
            <motion.div
              layout
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="col-span-6 sm:col-span-3 lg:col-span-2"
              key={project._id}
            >
              <Portfolio portfolio={project} />
            </motion.div>
          );
        })}
      </motion.div>
      {visibleProjects && !allProjectsLoaded && (
        <div className="mt-12 text-center">
          <button
            className="text-white btn btn-small hover:text-blue-900"
            onClick={() => setPageNumber(prevNumber => prevNumber + 1)}
          >
            <span>Load More</span>
          </button>
        </div>
      )}
    </>
  );
};

export default PortfoliosSection;
