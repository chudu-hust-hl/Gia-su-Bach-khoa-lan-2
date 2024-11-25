import React from 'react';
import { Link, HistoryRouterProps } from 'react-router-dom';

interface TransitionLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  replace?: boolean; // Optional, to control history behavior
}

const TransitionLink: React.FC<TransitionLinkProps> = ({ to, className, children, replace }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    
    // You can add custom transition logic here if needed
    // For example, prevent default behavior for animations
    // event.preventDefault();

    // Perform the navigation with or without replacing the history entry
    {/*if (replace) {
      // If using React Router, you can use history.replace
      //history.replace(to); // Make sure to import useHistory from 'react-router-dom'
    } else {
      // Default behavior
      // history.push(to); // Make sure to import useHistory from 'react-router-dom'
    }*/}
  };

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default TransitionLink;