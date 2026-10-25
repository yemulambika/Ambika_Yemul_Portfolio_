import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Instagram, Globe } from 'lucide-react';
import { SOCIAL_LINKS } from '../../utils/constants';

const Footer = ({ socialLinks }) => {
  const currentYear = new Date().getFullYear();

  const links = [
    { icon: Github, label: 'GitHub', url: socialLinks?.github || '#' },
    { icon: Linkedin, label: 'LinkedIn', url: socialLinks?.linkedin || '#' },
    { icon: Twitter, label: 'Twitter', url: socialLinks?.twitter || '#' },
    { icon: Mail, label: 'Email', url: `mailto:${socialLinks?.email || 'hello@example.com'}` },
  ];

  return (
    <footer className="border-t border-fg/10 bg-dark/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:flex md:items-center md:justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4 group">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-fg font-bold">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Ambika Yemul</span>
            </div>
            <p className="text-fg/60 text-sm max-w-md mx-auto md:mx-0">
              Building modern web applications with clean code and great user experiences.
            </p>
          </div>

          <div className="mt-8 md:mt-0 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-fg font-semibold mb-4">Connect</h4>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-fg/60 text-sm hover:text-fg transition-colors mb-2"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
            </div>

            <div>
              <h4 className="text-fg font-semibold mb-4">Navigate</h4>
              <div className="flex flex-col gap-2">
                {['Home', 'About', 'Projects', 'Contact'].map((name) => (
                  <Link
                    key={name}
                    to={name.toLowerCase() === 'home' ? '/' : `/${name.toLowerCase()}`}
                    style={{ display: 'block', marginBottom: '8px' }}
                    className="text-fg/60 text-sm hover:text-fg transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-fg/10 mt-12 pt-8 text-center">
          <p className="text-fg/50 text-sm">
            © {currentYear} Ambika Yemul. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;