import { Link } from "react-router-dom";
import { Clock, BarChart2, Tag } from "lucide-react";
import Badge from "./Badge";
import ProgressBar from "./ProgressBar";

const LEVEL_VARIANT = { Beginner: "success", Intermediate: "warning", Advanced: "danger" };

export default function CourseCard({ course, progress, href, action }) {
  const { title, description, thumbnail, price, category, level, duration } = course;
  const isFree = !price || price === 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
      {/* Thumbnail */}
      <Link to={href} className="block shrink-0 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-44 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-indigo-300 select-none">
              {title?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          {category && (
            <Badge variant="default">
              <Tag className="w-3 h-3 inline mr-1" />{category}
            </Badge>
          )}
          {level && <Badge variant={LEVEL_VARIANT[level] || "default"}>{level}</Badge>}
        </div>

        {/* Title */}
        <Link to={href}>
          <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        )}

        {/* Progress (enrolled courses) */}
        {progress !== undefined && (
          <ProgressBar value={progress} size="sm" />
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />{duration}
              </span>
            )}
            <span className="font-semibold text-gray-700">
              {isFree ? (
                <span className="text-green-600">Free</span>
              ) : (
                `₹${price}`
              )}
            </span>
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
}
