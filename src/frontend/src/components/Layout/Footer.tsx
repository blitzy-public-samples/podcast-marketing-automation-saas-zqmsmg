import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

// Define the FooterProps interface
interface FooterProps {
  className?: string;
}

// Define the FOOTER_LINKS constant
const FOOTER_LINKS = [
  { label: 'Terms of Service', url: '/terms' },
  { label: 'Privacy Policy', url: '/privacy' },
  { label: 'Contact Us', url: '/contact' },
];

// Get the current year for the copyright notice
const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-800 text-white py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <p className="text-sm">&copy; {CURRENT_YEAR} Podcast Marketing Automation. All rights reserved.</p>
          </div>
          <nav className="w-full md:w-1/3 mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center">
              {FOOTER_LINKS.map((link) => (
                <li key={link.url} className="mx-2">
                  <Link to={link.url} className="text-sm hover:text-gray-300 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <Button variant="secondary" size="small" onClick={() => window.scrollTo(0, 0)}>
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Human tasks:
// TODO: Review and finalize the footer design with the UX/UI team
// TODO: Confirm the list of important links to be included in the footer
// TODO: Decide on the inclusion of social media icons and obtain the necessary assets
// TODO: Implement unit tests for the Footer component
// TODO: Ensure the Footer component is responsive and looks good on all device sizes