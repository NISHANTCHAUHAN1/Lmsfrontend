import React from 'react';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <img 
        src="https://www.prestashop.com/sites/default/files/wysiwyg/404_not_found.png" 
        alt="Page not found" 
        // className="w-1/2 max-w-xs mb-4"
        width="800px"
        height="400px"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Page not found</h1>
      <p className="text-gray-600 text-lg">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;

