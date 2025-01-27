import { filteredProjectsData } from "data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ProjectFiltersProps } from "types";

interface PortfolioFiltersProps {
  currentFilter: string;
  filterHandler: (filter: string) => void;
}

const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  currentFilter,
  filterHandler,
}) => {
  const [tabs, setTabs] = useState<ProjectFiltersProps[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(
    currentFilter === "ALL" ? "ALL" : null
  );

  useEffect(() => {
    if (filteredProjectsData) {
      setTabs(filteredProjectsData);
    }
  }, [filteredProjectsData]);

  useEffect(() => {
    if (filteredProjectsData) {
      const allFilter: ProjectFiltersProps = {
        _id: "ALL",
        title: "ALL",
        value: "ALL",
      };
      setTabs([allFilter, ...filteredProjectsData]);
    }
  }, [filteredProjectsData]);

  useEffect(() => {
    if (activeTab === null) {
      setActiveTab(currentFilter);
    }
  }, [currentFilter, activeTab]);

  if (!tabs) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tabs.map(tab => (
        <button
          key={tab._id}
          className={`${
            activeTab === tab._id ? "" : "hover:text-blue-600"
          }relative min-w-fit max-w-fit rounded-full px-3 py-1.5 text-sm font-medium text-gray-900 outline-sky-400 transition focus-visible:outline-2 dark:text-white ${
            currentFilter === tab.value
              ? "before:invisible"
              : "btn-transparent text-blue-400 hover:text-gray-900 dark:hover:text-white"
          }`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
          onClick={() => {
            setActiveTab(tab._id);
            filterHandler(tab._id);
          }}
        >
          {activeTab === tab._id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-gray-900 mix-blend-difference"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default PortfolioFilters;
