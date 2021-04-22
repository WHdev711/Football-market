import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faFutbol } from '@fortawesome/free-regular-svg-icons';

const Footer = () => (
  <footer>
    <div className="inner-div">
      <p>
        <FontAwesomeIcon icon={faCopyright} />
        {' '}
        Sp
        <FontAwesomeIcon icon={faFutbol} />
        ns
        <FontAwesomeIcon icon={faFutbol} />
        rshipeXperts
      </p>
      <div className="footer-right">
        <p>React.JS Solo Project by</p>
        <ul>
          <a href="https://github.com/topfreeworker123" target="_blank" rel="noopener noreferrer">
            <li>
              <FontAwesomeIcon icon={faGithub} />
            </li>
          </a>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
