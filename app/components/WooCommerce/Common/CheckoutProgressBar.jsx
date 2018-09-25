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
        return (
          <div
            key={stage.label}
            className={`progress-block ${stage.label}-stage ${stateClass}`}>
            { stage.link ? <a href={stage.link}>{stage.label}</a> : <span>{stage.label}</span> }
            <svg className="after-triangle" viewBox="0 0 139 440" xmlns="http://www.w3.org/2000/svg">
              <path d="M138.5 220L.5 439.5V.5z" fillRule="nonzero" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};
