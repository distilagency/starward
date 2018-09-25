import React from 'react';
import './CheckoutProgressBar.scss';

export const CheckoutProgressBar = (props) => {
  const {
    stages,
    currentStageIndex
  } = props;
  return (
    <div className="checkout-progress-bar">
      {stages && stages.map((stage, index) => {
        let stateClass = '';
        if (index < currentStageIndex) stateClass = 'complete';
        if (index === currentStageIndex) stateClass = 'active';
        const isNotLast = index < stages.length - 1;
        return (
          <div
            key={stage.label}
            className={`progress-block ${stage.label}-stage ${stateClass}`}>
            { stage.link ? <a href={stage.link}>{stage.label}</a> : <span>{stage.label}</span> }
            { isNotLast && (
              <div className="after-triangle">
                <svg viewBox="0 0 141 446" xmlns="http://www.w3.org/2000/svg">
                  <path className="triangle" d="M139.5 223L1.5 442.5V3.5z" fillRule="nonzero" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
