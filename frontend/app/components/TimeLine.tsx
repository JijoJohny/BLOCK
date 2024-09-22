import React from 'react';
import DepositCard from './DepositCard';

const Timeline = (props: any) => {
  const steps = [
    {
      id: 1,
      title: 'Deposit',
      description: 'Depositing X USD worth of ERC20',
    },
    {
      id: 2,
      title: 'Swap',
      description: 'Swapping ERC20 to Stable coin(s) on Panora Swap',
    },
    {
      id: 3,
      title: 'Stake Liquidity',
      description: 'Staking liquidity on the chain',
    },
    {
      id: 4,
      title: 'WithDraw',
      description: 'WithDraw X USDC successfully',
    },
    {
      id: 5,
      title: 'Investments',
      description: '0 USD worth of ERC20 deposited successfully',
    },
  ];

  return (
    <>
        {steps.map((step, index) => (
        <div key={step.id} className="timeline-item">
          <div className={`timeline-number ${index <= props.in ? 'active' : ''}`}>
            {step.id}
          </div>
          <div className="timeline-content">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </div>
       
      ))}
         </>
      
      
  );
};

export default Timeline;
