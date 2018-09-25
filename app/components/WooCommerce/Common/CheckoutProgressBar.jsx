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
          </div>
        );
      })}
    </div>
  );
};
