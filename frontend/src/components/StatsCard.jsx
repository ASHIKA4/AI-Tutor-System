import React from 'react';

const StatsCard = ({ title, value, subtitle, progress }) => {
  return (
    <div className="col-lg-3 col-md-6">
      <div className="card shadow-sm stats-card h-100"> {/* Ensures same height */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-3">{title}</h5>
          <h4 className="card-text mb-2">{value}</h4>
          {subtitle && <h6 className="card-subtitle text-muted mb-3">{subtitle}</h6>}
          {progress && (
            <div className="progress mt-auto">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
